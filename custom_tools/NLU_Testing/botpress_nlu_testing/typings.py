from typing import List, Dict, Union
from typing_extensions import TypedDict, Literal


class Test(TypedDict):
    utterance: str
    expected: str


class Result(Test):
    confidence: float
    predicted: str
    time: float


class Slot(TypedDict):
    name: str
    entities: List[str]


class Intent(TypedDict):
    name: str
    contexts: List[str]
    utterances: List[str]
    slots: List[Slot]


class RawSlot(TypedDict):
    name: str
    entities: List[str]
    id: str
    color: int


class RawIntent(TypedDict):
    name: str
    contexts: List[str]
    entities: List[str]
    utterances: Dict[str, List[str]]
    slots: List[RawSlot]


class ListItem(TypedDict):
    name: str
    synonyms: List[str]


class RawEntity(TypedDict):
    id: str
    name: str
    type: Literal["pattern", "list"]
    occurences: List[ListItem]
    fuzzy: float
    examples: List[str]
    pattern: str
    sensitive: bool
    case_sensitive: bool


class ListEntity(TypedDict):
    name: str
    type: Literal["list"]
    values: List[ListItem]
    fuzzy: float
    sensitive: bool


class PatternEntity(TypedDict):
    name: str
    type: Literal["pattern"]
    regex: str
    case_sensitive: bool
    examples: List[str]
    sensitive: bool


Entity = Union[ListEntity, PatternEntity]


class Bot(TypedDict):
    name: str
    bot_lang: str
    intents: List[Intent]
    contexts: List[str]
    entities: List[Entity]


class NluResult(TypedDict):
    confidence: float
    predicted: str


class NluServerIntents(TypedDict):
    extractor: str
    name: str
    confidence: float
    slots: List[RawSlot]


class NluServerContexts(TypedDict):
    name: str
    confidence: float
    oos: float
    intents: List[NluServerIntents]


class NluServerPredictions(TypedDict):
    entities: List[RawEntity]
    contexts: List[NluServerContexts]
    spellchecked: str
    detectedLanguage: str
