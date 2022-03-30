from pathlib import Path
import pickle
from typing import List, Tuple, Dict, Any, Generator

import pandas as pd
from pandas_profiling import ProfileReport

from rich.progress import track

from nlp_analyser.utils import load_spacy_model
from bertopic import BERTopic

from LanguageIdentifier import predict as lang_id_predict

# from multiprocessing import cpu_count
import os

os.environ["TOKENIZERS_PARALLELISM"] = "false"


def profiling_report(datas: pd.DataFrame) -> str:
    profile: ProfileReport = ProfileReport(
        datas,
        title="Pandas Profiling Report",
        n_freq_table_max=25,
        explorative=True,
        dark_mode=True,
        minimal=True,
        variables={
            "descriptions": {
                "text": "The raw text",
                "lemmas": "In vocabulary words, without stop words(the/a/...) and lemmatized",
                "pos": "The part of speech tag (Noun, verb etc...)",
                "ner": "Entities (Location, Person etc..)",
                "in_voc_words": "Only in vocabulary words of the raw text",
                "words_without_stop": "Raw text without stop words (the/a/I etc..)",
            }
        },
        vars={
            "cat": {
                "length": True,
                "characters": True,
                "words": True,
                "n_obs": 5,
            },
        },
        html={"style": {"theme": "flatly"}},
    )

    report_html: str = profile.to_html()
    return report_html


def get_figures(topic_model: BERTopic) -> Tuple[str, str, str, str, str, str]:

    topics_fig: str = topic_model.visualize_topics().to_html(
        full_html=False, include_plotlyjs="cdn"
    )
    topics_hierarchy_fig: str = topic_model.visualize_hierarchy(width=1200).to_html(
        full_html=False, include_plotlyjs="cdn"
    )
    barchart_fig: Any = topic_model.visualize_barchart(
        top_n_topics=50, n_words=10, height=500
    )
    barchart_fig.update_layout(margin=dict(l=400))
    barchart_fig_html: str = barchart_fig.to_html(
        full_html=False, include_plotlyjs="cdn"
    )
    heatmap_fig: str = topic_model.visualize_heatmap().to_html(
        full_html=False, include_plotlyjs="cdn"
    )
    term_rank_fig: str = topic_model.visualize_term_rank().to_html(
        full_html=False, include_plotlyjs="cdn"
    )

    topics_exemples = ""
    docs: Dict[int, List[str]] = topic_model.get_representative_docs()  # type: ignore

    for topic_nb, exemples in docs.items():
        topics_exemples += f"<h4>Topic {topic_nb}</h4>\n"
        topics_exemples += "<ul>\n"
        for ex in exemples[:10]:
            topics_exemples += f"<li>{ex}</li>\n"
        topics_exemples += "</ul>\n"

    return (
        topics_fig,
        topics_hierarchy_fig,
        barchart_fig_html,
        heatmap_fig,
        term_rank_fig,
        topics_exemples,
    )


def possible_topics(datas: pd.DataFrame, output: Path):
    if not output.joinpath("BertTopic.pkl").exists():
        topic_model = BERTopic(
            embedding_model="all-MiniLM-L6-v2",
            top_n_words=10,
            calculate_probabilities=False,
            n_gram_range=(1, 3),
            nr_topics="auto",
            min_topic_size=10,
            verbose=True,
        )

        _, _ = topic_model.fit_transform(datas["lemmas"].tolist())  # type: ignore
        with open(output.joinpath("BertTopic.pkl"), "wb") as f:
            pickle.dump(topic_model, f)

    else:
        with open(output.joinpath("BertTopic.pkl"), "rb") as f:
            topic_model = pickle.load(f)

    (
        topics_fig,
        topics_hierarchy_fig,
        barchart_fig_html,
        heatmap_fig,
        term_rank_fig,
        topic_exemples,
    ) = get_figures(topic_model)

    topics_html = "<html>\n"
    topics_html += topics_fig + "\n"
    topics_html += topics_hierarchy_fig + "\n"
    topics_html += barchart_fig_html + "\n"
    topics_html += topic_exemples + "\n"
    topics_html += "<div>\n"

    topics_html += heatmap_fig + "\n"
    topics_html += "<div>Each topic is represented by a set of words. These words, however, do not all equally represent the topic. This visualization shows how many words are needed to represent a topic and at which point the beneficial effect of adding words starts to decline.</div>\n"
    topics_html += term_rank_fig + "\n"
    topics_html += "</html>\n"

    return topics_html


def corpus_to_datas(corpus: List[str]) -> Generator[pd.DataFrame, None, None]:
    df = pd.DataFrame(
        columns=[
            "text",
            "lemmas",
            "pos",
            "ner",
            "in_voc_words",
            "words_no_stop",
        ]
    )

    nlp = load_spacy_model("en", ["tok2vec", "parser", "textcat"])

    for doc in track(
        # nlp.pipe(corpus, n_process=int(cpu_count() * 0.75), batch_size=3000),
        nlp.pipe(corpus, batch_size=3000),
        total=len(corpus),
        description="Processing corpus...",
    ):
        lemmas: List[str] = []
        pos: List[str] = []
        ner: List[str] = []
        in_voc_words: List[str] = []

        words_no_stop: List[str] = []

        if lang_id_predict(doc.text) != "en":
            continue

        for token in doc:
            if not token.is_alpha:
                continue

            if not token.is_stop:
                words_no_stop.append(token.text)

                if not token.is_oov:
                    lemmas.append(token.lemma_)
                    pos.append(token.pos_)
                    in_voc_words.append(token.text)

            if token.ent_iob_ != "O":
                ner.append(token.ent_type_)

        df = pd.concat(
            [
                df,
                pd.DataFrame.from_dict(
                    {
                        "text": [doc.text.strip().lower()],
                        "lemmas": [" ".join(lemmas).lower()],
                        "pos": [" ".join(pos).lower()],
                        "ner": [" ".join(ner).lower()],
                        "in_voc_words": [" ".join(in_voc_words).lower()],
                        "words_no_stop": [" ".join(words_no_stop).lower()],
                    }
                ),
            ],
            ignore_index=True,
        )
        yield df
    del nlp


def analyse_datas(datas: List[str], output: Path) -> Tuple[str, str]:
    output.mkdir(parents=True, exist_ok=True)

    dataframe_path = output.joinpath(f"dataframe.pkl")
    topics_path = output.joinpath(f"BertTopics.pkl")
    report_path = output.joinpath(f"report.html")

    if dataframe_path.exists():
        print(
            (
                "A dataframe already exists !\n"
                "skipping dataframe creation and loading existing one"
            )
        )
        df: pd.DataFrame = pd.read_pickle(dataframe_path)
    else:
        *_, df = corpus_to_datas(datas)
        pd.to_pickle(df, dataframe_path)

    if topics_path.exists():
        print(
            (
                "A Topic file already exists !\n"
                "skipping topic creation and loading existing one"
            )
        )
        topics_html: str = topics_path.read_text()
    else:
        topics_html = possible_topics(df, output)
        topics_path.write_text(topics_html)

    if report_path.exists():
        print(
            (
                "HTML repport already exists !\n"
                "skipping html report creation and loading existing one"
            )
        )
        report_html: str = report_path.read_text()
    else:
        report_html = profiling_report(df)
        report_path.write_text(report_html)

    return report_html, topics_html
