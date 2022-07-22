from typing import Dict, List

import spacy
from thinc.util import prefer_gpu
from spacy.cli.download import download
from spacy.language import Language
from typing_extensions import Literal

SPACY_LANG_TO_MODEL: Dict[str, str] = {
    "fr": "fr_core_news_sm",
    "en": "en_core_web_md",
}

SPACY_COMPONENTS = Literal[
    "parser",
    "ner",
    "entity_linker",
    "entity_ruler",
    "text_cat",
    "textcat_multilabel",
    "senter",
    "sentencizer",
    "tok2vec",
    "transformer",
    "textcat",
]


def load_spacy_model(lang: str, exclude: List[SPACY_COMPONENTS]) -> Language:

    model = SPACY_LANG_TO_MODEL[lang]

    prefer_gpu()
    try:
        nlp = spacy.load(model, exclude=exclude or [])
    except Exception:
        download(model)
        nlp = spacy.load(model, exclude=exclude or [])

    nlp.Defaults.stop_words |= {
        "thank",
        "thanks",
        "hi",
        "yes",
        "okay",
        "ok",
        "hello",
        "hola",
        "hey",
        "de",
        "el",
        "great",
        "good",
        "lol",
        "im",
        "gracias",
        "la",
        "si",
        "que",
        "yo",
        "sure",
        "right",
        "yep",
        "asap",
        "like",
        "cool",
        "awesome",
        "fine",
        "y",
        "n",
        "k",
        "es",
    }

    return nlp
