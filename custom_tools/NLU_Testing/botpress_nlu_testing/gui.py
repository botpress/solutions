from io import BytesIO

from tempfile import NamedTemporaryFile
import streamlit as st
from botpress_nlu_testing.tests import run_tests
from botpress_nlu_testing.api import BotpressApi
from botpress_nlu_testing.metrics import (
    confusion_matrix_plot,
    compute_scores,
    check_result,
    filter_results,
    annotate_entities,
    filter_entities,
)
from pathlib import Path
from dynaconf import settings
import pandas as pd
from requests.exceptions import ConnectionError as RequestsConnectionError

from typing import Literal, Optional

st.set_page_config(  # type: ignore[misc]
    page_title="Botpress Testing",
    page_icon=None,
    layout="wide",
    initial_sidebar_state="auto",
    menu_items=None,
)


def launch_tests(test_path: BytesIO, api: BotpressApi) -> Optional[pd.DataFrame]:
    try:
        with st.spinner(text="Running tests"):
            temp_file = NamedTemporaryFile(
                "w+", suffix="." + test_path.name.split(".")[1]
            )
            test_datas = test_path.getvalue().decode("utf-8")

            with open(temp_file.name, "w") as file:
                file.write(test_datas)

            test_results = run_tests(Path(temp_file.name), api)
            temp_file.close()

            results = pd.DataFrame(test_results)
            results["passed"] = results.apply(check_result, axis=1)

            st.session_state.results = results

            return results

    except AssertionError as err:
        st.error(err)
        return None


def push_bot(bot_path: BytesIO, api: BotpressApi):
    if bot_path.__dict__["type"] != "application/gzip":
        st.error("The bot file is not a gzip !")

    try:
        with st.spinner(text="Training"):
            temp_file = NamedTemporaryFile()
            temp_file.write(bot_path.read())
            st.session_state.results = None
            api.train(Path(temp_file.name), bot_lang)
            temp_file.close()
            st.success("Bot was uploaded and trained")

    except ConnectionError as err:
        st.error(err)


#####################
# Side bar elements #
#####################
bot_file: BytesIO = st.sidebar.file_uploader(
    "Bot path (tgz)",
    type=["tgz"],
    accept_multiple_files=False,
    key="bot_file",
    help="The path to your bot",
    on_change=None,
    args=None,
    kwargs=None,
    disabled=False,
)

bot_lang: str = st.sidebar.text_input(
    "Bot Language",
    value="en",
    max_chars=2,
    key="bot_file",
    type="default",
    help="The language of your bot",
    placeholder="Place the lang of your bot here",
    autocomplete=None,
    on_change=None,
    args=None,
    kwargs=None,
    disabled=False,
)

test_file: BytesIO = st.sidebar.file_uploader(
    "test path (tsv, csv, json)",
    type=["tsv", "csv", "json"],
    accept_multiple_files=False,
    key="test_file",
    help="The path to your tests",
    on_change=None,
    args=None,
    kwargs=None,
    disabled=False,
)

endpoint: str = st.sidebar.text_input(
    "Endpoint",
    value=settings.get("ENDPOINT", "http://localhost:3200"),  # type: ignore[misc]
    max_chars=None,
    key="endpoint",
    type="default",
    help="The botpress server endpoint",
    autocomplete=None,
    on_change=None,
    args=None,
    kwargs=None,
    placeholder="Place the url of the botpress server here",
    disabled=False,
)

bot_name: str = st.sidebar.text_input(
    "Bot Name",
    value=settings.get("BOT_ID", "my_super_bot"),  # type: ignore[misc]
    max_chars=None,
    key="bot_name",
    type="default",
    help="The Bot Name",
    autocomplete=None,
    on_change=None,
    args=None,
    kwargs=None,
    placeholder="Place the bot name here",
    disabled=False,
)


######################
# Main page elements #
######################
st.title("Botpress testing")

api = BotpressApi(endpoint=endpoint, bot_id=bot_name)

# Bot Training
if bot_file:
    st.button(
        "Upload & Train",
        key="train",
        help="Upload and Train a new bot",
        on_click=push_bot,
        args=(bot_file, api),
        kwargs=None,
        disabled=False,
    )
else:
    try:
        if api.get_model_for_bot():
            model_lang = api.model_id.split(".")[-1]

            st.header(f"Bot `{api.bot_id}` for `{model_lang}` is already trained")

            st.text(f"( model {api.model_id} )")
            st.text(f"Be sure that your tests are in `{model_lang}` ")

        else:
            st.header(f"Bot: `{api.bot_id}` is not trained !")

            st.text("Select a bot file in the side bar on the left to train it")

    except (ConnectionError, ConnectionRefusedError, RequestsConnectionError):
        st.error(
            f"The Botpress Nlu server at {endpoint} is not reachable...\n Please start it and refresh the page"
        )

st.write("\n\n\n\n\n")
# Tests running and results
if test_file:
    test_clicked: bool = st.button(
        "Run Tests",
        key="test",
        help="Test the bot",
        kwargs=None,
        disabled=False,
    )
    if test_clicked:
        try:
            results = launch_tests(test_file, api)
        except AssertionError as err:
            st.error(err)
else:
    st.header("Tests")
    st.text(
        "Select a test file in the side bar on the left to be able to test your bot"
    )

# Test Results
if st.session_state.get("results", None) is not None:
    f1, precision, recall = compute_scores(st.session_state.results)

    st.plotly_chart(
        confusion_matrix_plot(st.session_state.results),
        use_container_width=True,
        height=900,
    )

    st.write(f"F1        : {f1}")
    st.write(f"Precision : {precision}")
    st.write(f"Recall    : {recall}")

    with st.expander("Detailed results"):
        filter_type: Literal["good", "bad", "all"] = st.radio(
            "Result filter",
            options=("bad", "good", "all"),
            help="Filter results",
        )

        st.table(
            filter_results(
                st.session_state.results.drop(["entities"], axis=1), filter_type
            )
        )

    with st.expander("Detailed entities results"):
        filter_entity_type: Literal["all", "annotated", "empty"] = st.radio(
            "Entities filter",
            options=("empty", "annotated", "all"),
            help="Filter results",
        )

        for entity in filter_entities(
            annotate_entities(st.session_state.results), filter_entity_type
        ):
            st.markdown(
                entity,
                unsafe_allow_html=True,
            )

    st.download_button(
        label="Export CSV",
        data=st.session_state.results.to_csv().encode("utf-8"),
        file_name=f"{api.bot_id}-NluResults.csv",
        mime="text/csv",
    )
