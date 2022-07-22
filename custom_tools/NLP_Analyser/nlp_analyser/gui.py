import streamlit as st
import streamlit.components.v1 as components
from typing import Optional
from streamlit.uploaded_file_manager import UploadedFile, UploadedFileRec
from tempfile import NamedTemporaryFile
from pathlib import Path
from nlp_analyser.converter import convert_csv_to_txt_files
from nlp_analyser.analyser import corpus_to_datas, get_topics_analysis
from streamlit.elements.progress import ProgressMixin

st.set_page_config(  # type: ignore[misc]
    page_title="Botpress Analysis",
    page_icon=None,
    layout="wide",
    initial_sidebar_state="auto",
    menu_items=None,
)

#####################
# Side bar elements #
#####################

nb_topics: int = st.sidebar.slider(
    label="Number of topics (1 for auto)",
    min_value=1,
    max_value=50,
    value=1,
    step=1,
    key="nb_topics",
    help="The number of topics. Use 1 to find them automatically. Specifying the number of topics will reduce the initial number of topics to the value specified.",
    on_change=None,
    args=None,
    kwargs=None,
    disabled=False,
)

# min_nb_words_topics: bool = st.sidebar.slider(
#     label="Minimum number of word per topic",
#     min_value=1,
#     max_value=50,
#     value=10,
#     step=1,
#     key="min_nb_words_topics",
#     help="The minimum number of words per topic. Increasing this value will lead to a lower number of clusters/topics.",
#     on_change=None,
#     args=None,
#     kwargs=None,
#     disabled=False,
# )


def reset_files():
    st.session_state.data = None
    st.session_state.text_file = None
    st.session_state.was_analysed = False


corpus_file: Optional[UploadedFile] = st.sidebar.file_uploader(
    "Corpus path (csv,txt)",
    type=["txt", "csv"],
    accept_multiple_files=False,
    key="corpus_file",
    help="The path to your csv or txt file. ",
    on_change=lambda: reset_files(),
    args=None,
    kwargs=None,
    disabled=False,
)

colum_idx = 0
colum_idx_str: str = st.sidebar.text_input(
    "Column idx (for csv files only, starting at 0)",
    value="0",
    max_chars=2,
    key="column_idx",
    type="default",
    help="Column index of the text data in the csv file. Starting at 0.",
    placeholder="0",
    autocomplete=None,
    on_change=None,
    args=None,
    kwargs=None,
    disabled=False,
)

delimiter: str = st.sidebar.text_input(
    "Delimiter for the csv",
    value=",",
    max_chars=2,
    key="delimiter",
    type="default",
    help="Delimiter in the csv file. Often , or ;",
    placeholder=",",
    autocomplete=None,
    on_change=None,
    args=None,
    kwargs=None,
    disabled=False,
)


no_headers: bool = st.sidebar.checkbox(
    label="Remove headers in the csv file",
    value=True,
    key="no_headers",
    help="Remove the first line in the csv file as it's headers.",
    on_change=None,
    args=None,
    kwargs=None,
    disabled=False,
)


########
# Main #
########
try:
    colum_idx = int(colum_idx_str)
except ValueError:
    st.error("The column index must be an integer.")

if corpus_file and corpus_file.__dict__["type"] not in ["text/plain", "text/csv"]:
    st.error("The corpus file is not a txt or a csv file !")

if corpus_file and corpus_file.__dict__["type"] == "text/plain":
    st.session_state.text_file = corpus_file

if (
    corpus_file
    and corpus_file.__dict__["type"] == "text/csv"
    and st.session_state.get("text_file") is None
):
    csv_temp_file = NamedTemporaryFile()
    text_temp_file = NamedTemporaryFile()
    with st.spinner(text="Converting csv to txt..."):
        csv_temp_file.write(corpus_file.read())
        try:
            convert_csv_to_txt_files(
                Path(csv_temp_file.name),
                Path(text_temp_file.name),
                delimiter,
                colum_idx,
                no_headers,
            )

            st.session_state.csv_was_converted_successfully = True
            st.session_state.text_file = UploadedFile(
                UploadedFileRec(
                    id=0,
                    name=corpus_file.name.replace(".csv", ".txt"),
                    type="text/plain",
                    data=text_temp_file.read(),
                )
            )

            st.success(
                "Csv file was converted to a text one." + " Headers were removed"
                if no_headers
                else ""
            )
            csv_temp_file.seek(0)
            header, line, *_ = csv_temp_file.read().decode("utf-8").split("\n")
            if no_headers:
                st.info(f"Header : {header}")
            st.info(f"First line : {line}")

        except IndexError:
            header, line, *_ = csv_temp_file.read().decode("utf-8").split("\n")
            st.error("The column index is not correct.")
            csv_temp_file.seek(0)
            header, line, *_ = csv_temp_file.read().decode("utf-8").split("\n")
            st.error(f"Header : {header}")
            st.error(f"First line : {line}")

    csv_temp_file.close()
    text_temp_file.close()


if (
    st.session_state.get("text_file") is not None
    and st.session_state.get("data") is None
):
    text_data = [l.decode("utf-8") for l in st.session_state.text_file.readlines()]

    progress_bar: ProgressMixin = st.progress(0)
    with st.spinner(
        text="Analysing corpus (can be long... check terminal for estimate)"
    ):
        for (
            idx,
            dataframe,
        ) in enumerate(corpus_to_datas(text_data)):
            progress_bar.progress(idx / len(text_data))
            st.session_state.data = dataframe

        st.success("Corpus was analysed.")
    progress_bar.empty()  # type: ignore[misc]


######################
# Main page elements #
######################
st.title("Botpress Analysis")
if not corpus_file:
    st.write("Please upload a corpus file (csv or txt) from the side bar.")
    st.write("Analysis will start as soon as you upload a file.")

st.write("\n\n\n\n\n")
# Tests running and results
if st.session_state.get("data") is not None:
    st.subheader(
        "Datas were imported and pre-processed. You can now choose topic number and run topic analysis."
    )

if st.session_state.get("text_file"):
    if st.button(
        "Run Topic Analysis",
        key="test",
        help="Test the bot",
        kwargs=None,
        disabled=False,
    ):
        with st.spinner("Creating topics... Can be long, check terminal for updates"):
            try:
                (
                    topics_fig,
                    topics_hierarchy_fig,
                    barchart_fig_html,
                    heatmap_fig,
                    term_rank_fig,
                    topic_exemples,
                ) = get_topics_analysis(st.session_state.data, nb_topics)

                st.session_state.topics_fig = topics_fig
                st.session_state.topics_hierarchy_fig = topics_hierarchy_fig
                st.session_state.barchart_fig_html = barchart_fig_html
                st.session_state.heatmap_fig = heatmap_fig
                st.session_state.term_rank_fig = term_rank_fig
                st.session_state.topic_exemples = topic_exemples
                st.session_state.was_analysed = True
            except RuntimeError:
                st.error("An error occurred during the analysis.")


if st.session_state.get("was_analysed"):
    st.write(
        "Note that the topics are generated automatically and will change at every run !"
    )
    st.write(
        "If the number of topics was found automatically (value of 1) that means that they might be too much or not enough topics."
    )
    st.write(
        "That means that the first topics might contain the best knowledge and other topics might be less relevant containing only gibberish keywords like `hey/hello/hi/greetings`"
    )
    st.write(
        "You can analyse the data and re-run the analysis with the number of topics you want."
    )
    st.write("\n\n\n\n\n")
    st.write("\n")
    st.write("\n")

    st.write("On the intertopics graph, circles correspond to the topics.")
    st.write(
        "Some might overlap but please remember that they're projected on a 2D space so close topics in 2D might not really be..."
    )
    st.write("Hover with the mouse to see topics words.")
    components.html(st.session_state.topics_fig, height=800)

    st.write("On the hierarchical graph, you can see how topics might be regrouped.")
    st.write(
        "From left to right, follow the forks to see where topic join and how they can be grouped."
    )
    components.html(st.session_state.topics_hierarchy_fig, height=800)

    st.write("The following chart gives you the most relevant words for each topic.")
    components.html(st.session_state.barchart_fig_html, height=1200)

    st.write(
        "On this matrix, you can see how much a topic is close to the others. The higher the score the closer the topics."
    )
    components.html(st.session_state.heatmap_fig, height=800)

    st.write(
        "This tell you how much word are needed for each topic. If you use too much words for a topic, then it will loose signification. Usually at more than 5 words, topic become too specific and will not be relevant."
    )
    components.html(st.session_state.term_rank_fig, height=800)

    st.write(
        "This are just exemple sentences for each topics, it dupplicate the information of the topic word score."
    )
    components.html(st.session_state.topic_exemples, height=800)

    st.sidebar.download_button(
        label="Export analysis as Html file",
        data="<html>"
        + "\n".join(
            [
                f"<div>{fig}</div>"
                for fig in [
                    st.session_state.topics_fig,
                    st.session_state.topics_hierarchy_fig,
                    st.session_state.barchart_fig_html,
                    st.session_state.heatmap_fig,
                    st.session_state.term_rank_fig,
                    st.session_state.topic_exemples,
                ]
            ]
        )
        + "</html>",
        file_name=f"analysis.html",
        mime="text/html",
    )


# Analysis
if st.session_state.get("analysis", None) is not None:
    components.html("")

    st.sidebar.download_button(
        label="Export Txt",
        data=st.session_state.analysis,
        file_name=f"analysis.csv",
        mime="text/csv",
    )

# Topics
# Test Results
if st.session_state.get("topics", None) is not None:
    components.html("")

    st.sidebar.download_button(
        label="Export Txt",
        data=st.session_state.analysis,
        file_name=f"topics.html",
        mime="text/csv",
    )

if (
    st.session_state.get("text_file")
    and st.session_state.csv_was_converted_successfully
):
    st.sidebar.download_button(
        label="Export txt file",
        data=st.session_state.text_file.read(),
        file_name=f"corpus.txt",
        mime="text/txt",
    )
