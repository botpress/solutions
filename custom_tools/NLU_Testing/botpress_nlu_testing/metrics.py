from plotly.graph_objs._figurewidget import FigureWidget

from sklearn.metrics import confusion_matrix
import pandas as pd
from typing import Literal, cast, Tuple, List, Union
import numpy as np
from botpress_nlu_testing.typings import AnnotatedEntities
import plotly.figure_factory as ff

from annotated_text.util import get_annotated_html
from sklearn.metrics import (
    confusion_matrix,
    precision_score,
    f1_score,
    recall_score,
)


def check_result(row: "pd.Series[str]") -> str:
    if row["predicted"] == row["expected"]:
        return "✅"
    else:
        return "❌"


def filter_results(
    data_frame: pd.DataFrame, option: Literal["good", "bad", "all"]
) -> pd.DataFrame:
    if option == "all":
        return data_frame

    elif option == "good":
        return data_frame.loc[data_frame["expected"] == data_frame["predicted"]]

    elif option == "bad":
        return data_frame.loc[data_frame["expected"] != data_frame["predicted"]]


def filter_entities(
    annotations: List[str], option: Literal["empty", "annotated", "all"]
) -> List[str]:
    filtered_annotations: List[str] = []
    for annotation in annotations:
        is_annotated = "</span>" in annotation

        if option in ["all", "annotated"] and is_annotated:
            filtered_annotations.append(annotation)
        elif option in ["all", "empty"] and not is_annotated:
            filtered_annotations.append(annotation)

    return filtered_annotations


def confusion_matrix_plot(data_frame: pd.DataFrame) -> FigureWidget:
    names = list(
        set(
            data_frame["expected"].unique().tolist()
            + data_frame["predicted"].unique().tolist()
        )
    )
    fig = cast(
        FigureWidget,
        ff.create_annotated_heatmap(
            confusion_matrix(
                data_frame["expected"].tolist(), data_frame["predicted"].tolist()
            ),
            x=names,
            y=names,
        ),
    )
    fig.update_layout(height=900)
    return fig


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


def annotate_entities(data_frame: pd.DataFrame) -> List[str]:
    utterance: str
    annotated_entities: List[List[Union[str, Tuple[str, str]]]] = []
    for idx, (utterance, entities) in data_frame[["utterance", "entities"]].iterrows():

        utterance_entities: List[Union[str, Tuple[str, str]]] = [f"{idx}   "]

        entities = sorted(entities, key=lambda x: x.get("start", 0), reverse=True)
        current_pos = 0
        for ent in entities:
            if current_pos != ent["start"]:
                utterance_entities.append(utterance[: ent["start"]])

                utterance_entities.append(
                    (
                        utterance[ent["start"] : ent["end"]],
                        f'{ent["name"]}:{ent["value"]}',
                    )
                )
            current_pos = ent["end"]

        if current_pos != len(utterance):
            utterance_entities.append(utterance[current_pos:])

        annotated_entities.append(utterance_entities)

    return [get_annotated_html(*ent) for idx, ent in enumerate(annotated_entities)]
