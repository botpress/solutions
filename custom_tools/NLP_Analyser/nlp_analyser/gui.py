import streamlit as st
import streamlit.components.v1 as components
from typing import Optional
from streamlit.uploaded_file_manager import UploadedFile, UploadedFileRec
from tempfile import NamedTemporaryFile
from pathlib import Path
from nlp_analyser.converter import convert_csv_to_txt_files
from nlp_analyser.analyser import corpus_to_datas, get_figures
from bertopic import BERTopic
from streamlit.elements.progress import ProgressMixin
from typing import List

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
corpus_file: Optional[UploadedFile] = st.sidebar.file_uploader(
    "Corpus path (csv,txt)",
    type=["txt", "csv"],
    accept_multiple_files=False,
    key="corpus_file",
    help="The path to your csv or txt file. ",
    on_change=None,
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

st.session_state.csv_was_converted_successfully = False
st.session_state.was_analysed = False

if corpus_file and corpus_file.__dict__["type"] not in ["text/plain", "text/csv"]:
    st.error("The corpus file is not a txt or a csv file !")

if (
    corpus_file
    and corpus_file.__dict__["type"] == "text/csv"
    and st.session_state.get("data") is None
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

            corpus_file = UploadedFile(
                UploadedFileRec(
                    id=0,
                    name=corpus_file.name.replace(".csv", ".txt"),
                    type="text/plain",
                    data=text_temp_file.read(),
                )
            )

            st.success("Csv file was converted to a text one.")
            csv_temp_file.seek(0)
            header, line, *_ = csv_temp_file.read().decode("utf-8").split("\n")
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
    st.session_state.csv_was_converted_successfully
    or (corpus_file and corpus_file.__dict__["type"] == "text/plain")
    and st.session_state.get("data") is None
):
    text_data: List[str] = []
    if corpus_file and corpus_file.__dict__["type"] == "text/plain":
        text_data = [l.decode("utf-8") for l in corpus_file.readlines()]

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


if corpus_file:
    analysis_clicked: bool = st.button(
        "Run Topic Analysis",
        key="test",
        help="Test the bot",
        kwargs=None,
        disabled=False,
    )
    if analysis_clicked:
        topic_model = BERTopic(
            embedding_model="all-MiniLM-L6-v2",
            top_n_words=10,
            calculate_probabilities=False,
            n_gram_range=(1, 3),
            nr_topics=5,
            min_topic_size=3,
            verbose=True,
        )
        with st.spinner("Creating topics... Can be long, check terminal for updates"):
            _, _ = topic_model.fit_transform(st.session_state.data["lemmas"].tolist())  # type: ignore

        (
            topics_fig,
            topics_hierarchy_fig,
            barchart_fig_html,
            heatmap_fig,
            term_rank_fig,
            topic_exemples,
        ) = get_figures(topic_model)

        st.session_state.topics_fig = topics_fig
        st.session_state.topics_hierarchy_fig = topics_hierarchy_fig
        st.session_state.barchart_fig_html = barchart_fig_html
        st.session_state.heatmap_fig = heatmap_fig
        st.session_state.term_rank_fig = term_rank_fig
        st.session_state.topic_exemples = topic_exemples
        st.session_state.was_analysed = True

if st.session_state.was_analysed:

    st.write("Note that the topics are generated automatically.")
    st.write(
        "The number of topics is found automatically that means that they might be too much or not enough topics."
    )
    st.write(
        "That means that the first topics might contain the best knowledge and other topics might be less relevant containing only gibberish keywords like `hey/hello/hi/greetings`"
    )
    st.write("\n\n\n\n\n")

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
        data="\n".join(
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
        ),
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

if corpus_file and st.session_state.csv_was_converted_successfully:
    st.sidebar.download_button(
        label="Export txt file",
        data=corpus_file.read(),
        file_name=f"corpus.txt",
        mime="text/txt",
    )
