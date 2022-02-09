from pathlib import Path
from typing import List, Union
from typing_extensions import TypedDict, Literal
from numpy import float32


from torch import cuda
from transformers.modeling_utils import PreTrainedModel
from transformers.models.auto.modeling_auto import AutoModelForTokenClassification
from transformers.models.auto.tokenization_auto import AutoTokenizer
from transformers.pipelines.token_classification import TokenClassificationPipeline

from transformers.tokenization_utils import PreTrainedTokenizer


class IdeaOutput(TypedDict):
    start: int
    stop: int
    confidence: float
    text: str
    label: Literal["I", "D", "E", "A", "O"]


class IdeaPipelineAggregatedOutput(TypedDict):
    # From https://github.com/huggingface/transformers/blob/05fa1a7ac17bb7aa07b9e0c1e138ecb31a28bbfe/src/transformers/pipelines/token_classification.py#L173

    # The token/word classified.
    word: str

    # The corresponding probability for `entity`.
    score: float32

    # The entity predicted for that token/word (it is named *entity_group* when *aggregation_strategy* is not `"none"`.
    entity_group: Literal["I", "D", "E", "A", "O"]

    # The index of the start of the corresponding entity in the sentence. Only exists if the offsets are available within the tokenizer
    start: int

    # The index of the end of the corresponding entity in the sentence. Only exists if the offsets are available within the tokenizer
    end: int


class IdeaPipelineOutput(TypedDict):
    # From https://github.com/huggingface/transformers/blob/05fa1a7ac17bb7aa07b9e0c1e138ecb31a28bbfe/src/transformers/pipelines/token_classification.py#L173

    # The token/word classified.
    word: str

    # The corresponding probability for `entity`.
    score: float32

    # The entity predicted for that token/word (it is named *entity_group* when *aggregation_strategy* is not `"none"`.
    entity: Literal["I", "D", "E", "A", "O"]

    # only present when `aggregation_strategy="none"` - The index of the corresponding token in the sentence.
    index: int

    # The index of the start of the corresponding entity in the sentence. Only exists if the offsets are available within the tokenizer
    start: int

    # The index of the end of the corresponding entity in the sentence. Only exists if the offsets are available within the tokenizer
    end: int


class IdeaInference:
    def __init__(
        self,
        model_dir_path: Union[str, Path],
    ) -> None:

        model: PreTrainedModel = AutoModelForTokenClassification.from_pretrained(
            model_dir_path
        )
        tokenizer: PreTrainedTokenizer = AutoTokenizer.from_pretrained(model_dir_path)
        self.pipe = TokenClassificationPipeline(
            model=model,
            tokenizer=tokenizer,
            device=0 if cuda.is_available() else -1,
            aggregation_strategy="simple",
        )

    def tag(self, sentence: str) -> List[IdeaOutput]:
        aggregated_predictions: List[IdeaPipelineAggregatedOutput] = self.pipe(sentence)

        return [
            IdeaOutput(
                start=pred["start"],
                stop=pred["end"],
                confidence=pred["score"].item(),
                text=pred["word"],
                label=pred["entity_group"],
            )
            for pred in aggregated_predictions
        ]
