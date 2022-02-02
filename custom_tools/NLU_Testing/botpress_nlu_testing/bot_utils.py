from pathlib import Path
from botpress_nlu_testing.typings import (
    Bot,
    Intent,
    Entity,
    ListEntity,
    PatternEntity,
    RawIntent,
    Slot,
    RawEntity,
)

import tarfile
from tempfile import TemporaryDirectory
from typing import List

import json


def load_folder_bot(bot_path: Path) -> Bot:
    intents: List[Intent] = []
    entities: List[Entity] = []

    with open(bot_path.joinpath("bot.config.json"), "r") as config_file:
        config = json.load(config_file)
        bot_lang: str = config["defaultLanguage"]
        bot_name: str = config["name"]

    for intent_file_path in bot_path.glob("intents/*.json"):
        with open(intent_file_path, "r") as intent_file:
            raw_intent_data: RawIntent = json.load(intent_file)
            slots: List[Slot] = []
            for raw_slot in raw_intent_data["slots"]:
                slots.append(Slot(name=raw_slot["name"], entities=raw_slot["entities"]))

            intent_data = Intent(
                utterances=raw_intent_data["utterances"][bot_lang],
                contexts=raw_intent_data["contexts"],
                name=raw_intent_data["name"],
                slots=slots,
            )
            intents.append(intent_data)

    for entity_file_path in bot_path.glob("entities/*.json"):
        with open(entity_file_path, "r") as entity_file:
            raw_entity_data: RawEntity = json.load(entity_file)

            if raw_entity_data["type"] == "pattern":
                entity = PatternEntity(
                    name=raw_entity_data["name"],
                    type="pattern",
                    regex=raw_entity_data["pattern"],
                    examples=raw_entity_data["examples"],
                    sensitive=raw_entity_data["sensitive"],
                    case_sensitive=raw_entity_data["case_sensitive"],
                )
            else:
                entity = ListEntity(
                    name=raw_entity_data["name"],
                    type="list",
                    values=raw_entity_data["occurences"],
                    fuzzy=raw_entity_data["fuzzy"],
                    sensitive=raw_entity_data["sensitive"],
                )

            entities.append(entity)

    return Bot(
        intents=intents,
        bot_lang=bot_lang,
        contexts=["global"],
        entities=entities,
        name=bot_name,
    )


def load_tgz_bot(bot_path: Path) -> Bot:
    if not tarfile.is_tarfile(bot_path):
        raise AssertionError(f"{bot_path} is not a tarfile")

    with tarfile.open(bot_path) as tgz_file, TemporaryDirectory() as tmp_dir:
        tgz_file.extractall(tmp_dir)
        data = load_folder_bot(Path(tmp_dir))
    return data
