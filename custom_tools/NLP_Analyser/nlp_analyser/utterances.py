from pathlib import Path
from typing import List, Tuple, Dict, Any

import pandas as pd
from pandas_profiling import ProfileReport

from rich.progress import track

from nlp_analyser.utils import load_spacy_model
from bertopic import BERTopic

from nlp_analyser.idea import IdeaInference
from LanguageIdentifier import predict as lang_id_predict


def idea_split(datas: List[str]) -> Dict[str, List[str]]:
    weight_path = Path(__file__).parent.joinpath("./weights")
    if not weight_path.joinpath("config.json").exists():
        raise FileNotFoundError("Please place idea model in ./weights folder from ")

    idea_model = IdeaInference(weight_path)

    speechacts: Dict[str, List[str]] = {}
    for utt in track(datas, description="Running IDEA"):
        for output in idea_model.tag(utt):
            label_list: List[str] = speechacts.get(output["label"], [])
            label_list.append(output["text"])
            speechacts[output["label"]] = label_list

    return speechacts


def profiling_report(datas: pd.DataFrame) -> str:
    profile: ProfileReport = ProfileReport(
        datas,
        title="Pandas Profiling Report",
        n_freq_table_max=25,
        explorative=True,
        dark_mode=True,
        variables={
            "descriptions": {
                "text": "The raw text",
                "lemmas": "In vocabulary words, without stop words(the/a/...) and lemmatize",
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


def possible_topics(datas: pd.DataFrame):
    topic_model = BERTopic(
        embedding_model="all-MiniLM-L6-v2",
        top_n_words=10,
        calculate_probabilities=True,
        n_gram_range=(1, 2),
        # nr_topics="auto",
        nr_topics=15,
        min_topic_size=15,
    )

    _, _ = topic_model.fit_transform(datas["lemmas"].tolist())

    topics_fig: str = topic_model.visualize_topics().to_html(
        full_html=False, include_plotlyjs="cdn"
    )
    topics_hierarchy_fig: str = topic_model.visualize_hierarchy(width=1200).to_html(
        full_html=False, include_plotlyjs="cdn"
    )
    barchart_fig: Any = topic_model.visualize_barchart(
        top_n_topics=16, n_words=10, height=500
    )
    barchart_fig.update_layout(margin=dict(l=400))
    barchart_fig_html: str = barchart_fig.to_html(
        full_html=False, include_plotlyjs="cdn"
    )
    heatmap_fig: str = topic_model.visualize_heatmap(n_clusters=15).to_html(
        full_html=False, include_plotlyjs="cdn"
    )
    term_rank_fig: str = topic_model.visualize_term_rank().to_html(
        full_html=False, include_plotlyjs="cdn"
    )

    topics_html = "<html>\n"
    topics_html += topics_fig + "\n"
    topics_html += topics_hierarchy_fig + "\n"
    topics_html += barchart_fig_html + "\n"
    topics_html += "<div>\n"

    topics_exemples: Dict[int, List[str]] = topic_model.get_representative_docs()
    for topic_nb, exemples in topics_exemples.items():
        topics_html += f"<h4>Topic {topic_nb}</h4>\n"
        topics_html += "<ul>\n"
        for ex in exemples[:10]:
            topics_html += f"<li>{ex}</li>\n"
        topics_html += "</ul>\n"

    topics_html += heatmap_fig + "\n"
    topics_html += "<div>Each topic is represented by a set of words. These words, however, do not all equally represent the topic. This visualization shows how many words are needed to represent a topic and at which point the beneficial effect of adding words starts to decline.</div>\n"
    topics_html += term_rank_fig + "\n"
    topics_html += "</html>\n"

    return topics_html


def analyse_datas(datas: List[str]) -> Tuple[str, str]:
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

    nlp = load_spacy_model("en", [])

    for line in track(datas):
        lemmas: List[str] = []
        pos: List[str] = []
        ner: List[str] = []
        in_voc_words: List[str] = []

        words_no_stop: List[str] = []

        if lang_id_predict(line) != "en":
            continue

        for token in nlp(line):
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
                        "text": [line.strip().lower()],
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

    topics_html = possible_topics(df)
    report_html = profiling_report(df)
    return report_html, topics_html
