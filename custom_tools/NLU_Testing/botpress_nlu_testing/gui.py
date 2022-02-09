from io import BytesIO
from tempfile import NamedTemporaryFile
import streamlit as st
from botpress_nlu_testing.test_runner import run_tests
from botpress_nlu_testing.api import BotpressApi
from pathlib import Path
from dynaconf import settings
import pandas as pd
import matplotlib.pyplot as plt 
from sklearn.metrics import precision_score, f1_score, recall_score, ConfusionMatrixDisplay
import numpy as np
from typing import Tuple, List, Optional

st.set_page_config(  # type: ignore[misc]
    page_title="Botpress Testing",
    page_icon=None,
    layout="wide",
    initial_sidebar_state="auto",
    menu_items=None,
)
def show_matrix(data_frame: pd.DataFrame):
    y_true: List[str] = data_frame["expected"].tolist()
    y_pred: List[str] = data_frame["predicted"].tolist()
    labels: List[str] = data_frame["expected"].unique().tolist()

    fig, ax = plt.subplots(figsize=(20,15))

    _cmp:ConfusionMatrixDisplay = ConfusionMatrixDisplay.from_predictions(y_true, y_pred, labels=labels, normalize='true', xticks_rotation='vertical', ax=ax)
    
    st.pyplot(fig)

def compute_scores(data_frame: pd.DataFrame) -> Tuple[float, float, float]:
    y_true: List[str] = data_frame["expected"].tolist()
    y_pred: List[str] = data_frame["predicted"].tolist()
    labels: List[str] = data_frame["expected"].unique().tolist()

    f1 = np.around(
        f1_score(
            y_true=y_true,
            y_pred=y_pred,
            labels=labels,
            average="macro",
            zero_division=0,
        ),
        4,
    )

    precision = np.around(
        precision_score(
            y_true=y_true,
            y_pred=y_pred,
            labels=labels,
            average="macro",
            zero_division=0,
        ),
        4,
    )

    recall = np.around(
        recall_score(
            y_true=y_true,
            y_pred=y_pred,
            labels=labels,
            average="macro",
            zero_division=0,
        ),
        4,
    )
    return f1, precision, recall


def check_result(row: "pd.Series[str]") -> str:
    if row["predicted"] == row["expected"]:
        return "✅"
    else:
        return "❌"


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

            temp_df: pd.DataFrame = pd.DataFrame(test_results)
            df2: pd.Series= temp_df['entities'].loc[temp_df['entities'].map(lambda d: len(d)) > 0] # type: ignore[str]
            templist= []
            
            for index, item in df2.iteritems(): # type: ignore[str]
                df1 = pd.json_normalize(item) # type: ignore[str]
                df1["index_col"] = index
                df1.dropna(inplace=True)
                templist.append(df1)
            df3: pd.DataFrame = pd.concat(templist).loc(axis=1)['index_col','entity.name', 'entity.value'] # type: ignore[str]
            arr = []
            for i in df3['index_col'].unique():
                slots_df: pd.DataFrame = pd.DataFrame()
                if df3.loc[df3['index_col'] == i].shape == (1,3):
                    slots_df: pd.DataFrame = pd.DataFrame(data={
                        'entity1.name':df3["entity.name"].loc[df3['index_col'] == i].iat[0],
                        'entity1.value':df3["entity.value"].loc[df3['index_col'] == i].iat[0]},
                         index=[i], columns=['entity1.name', 'entity1.value'])
                elif df3.loc[df3['index_col'] == i].shape == (2,3):
                        slots_df: pd.DataFrame = pd.DataFrame(data={
                            'entity1.name':df3["entity.name"].loc[df3['index_col'] == i].iat[0],
                            'entity1.value':df3["entity.value"].loc[df3['index_col'] == i].iat[0],
                            'entity2.name':df3["entity.name"].loc[df3['index_col'] == i].iat[1],
                            'entity2.value':df3["entity.value"].loc[df3['index_col'] == i].iat[1]},
                            index=[i], columns=['entity1.name', 'entity1.value','entity2.name', 'entity2.value'])
                elif df3.loc[df3['index_col'] == i].shape == (3,3):
                        slots_df: pd.DataFrame = pd.DataFrame(data={
                            'entity1.name':df3["entity.name"].loc[df3['index_col'] == i].iat[0],
                            'entity1.value':df3["entity.value"].loc[df3['index_col'] == i].iat[0],
                            'entity2.name':df3["entity.name"].loc[df3['index_col'] == i].iat[1],
                            'entity2.value':df3["entity.value"].loc[df3['index_col'] == i].iat[1],
                            'entity3.name':df3["entity.name"].loc[df3['index_col'] == i].iat[2],
                            'entity3.value':df3["entity.value"].loc[df3['index_col'] == i].iat[2]},
                            index=[i], columns=['entity1.name', 'entity1.value','entity2.name', 'entity2.value','entity3.name', 'entity3.value'])

                arr.append(slots_df)

            slots_df2 = pd.concat(arr)

            results:pd.DataFrame = temp_df.loc(axis=1)['utterance', 'expected', 'predicted', 'confidence']
            results["passed"] = results.apply(check_result, axis=1)
            results = results.merge(right=slots_df2, right_index=True, left_index=True, how='left')
            print(results.head(10))

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
            api.train(Path(temp_file.name))
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
    if api.get_model_for_bot():
        st.header(f"Bot `{api.bot_id}` is already trained")
        st.text(f"( model {api.model_id} )")
    else:
        st.header(f"Bot: `{api.bot_id}` is not trained !")
        st.text("Select a bot file in the side bar on the left to train it")

if test_file:
    test_clicked: bool = st.button(
        "Test",
        key="test",
        help="Test the bot",
        kwargs=None,
        disabled=False,
    )
    if test_clicked:
        try:
            results = launch_tests(test_file, api)

            if results is not None:
                f1, precision, recall = compute_scores(results)
                show_matrix(results)
                st.write(f"F1        : {f1}")
                st.write(f"Precision : {precision}")
                st.write(f"Recall    : {recall}")
                with st.expander("Detailed results"):
                    st.table(results)
                st.download_button(
                    label="Export CSV", 
                    data=results.to_csv().encode('utf-8'),
                    file_name=f"{api.bot_id}-NluResults.csv",
                    mime="text/csv"
                    )

        except AssertionError as err:
            st.error(err)


else:
    st.header("Tests")
    st.text(
        "Select a test file in the side bar on the left to be able to test your bot"
    )
