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
from typing import List, Optional

import json


def load_folder_bot(bot_path: Path, override_bot_lang: Optional[str]) -> Bot:
    """Load a bot from a folder containing subfolders with the bot configuration, the intents, the qnas etc...
        Note that this will load a bot in a single language !
    Parameters
    ----------
    bot_path : Path
        The root path of the folder containing the bot
    override_bot_lang : Optional[str]
        To override the default language of the bot.

    Returns
    -------
    Bot
        A python datastructure containing all the bot information

        Note the datastructure is for one language only
    """
    intents: List[Intent] = []
    entities: List[Entity] = []

    with open(bot_path.joinpath("bot.config.json"), "r") as config_file:
        config = json.load(config_file)
        bot_lang: str = override_bot_lang or config["defaultLanguage"]
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
                name=raw_intent_data["name"].lower().replace("-", "_"),
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
                    case_sensitive=raw_entity_data["sensitive"],
                )
            else:
                entity = ListEntity(
                    name=raw_entity_data["name"],
                    type="list",
                    values=raw_entity_data["occurrences"],
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


def load_tgz_bot(bot_path: Path, bot_lang: Optional[str]) -> Bot:
    """Load a botpress bot from a file in the tgz format

    Parameters
    ----------
    bot_path : Path
        The path of the tgz file containing the bot
    bot_lang : Optional[str]
        If you want to override the bot default language

    Returns
    -------
    Bot
        A python datastructure containing all the bot information

        Note the datastructure is for one language only

    Raises
    ------
    AssertionError
        If the file is not an extractable tarfile
    """
    if not tarfile.is_tarfile(bot_path):
        raise AssertionError(f"{bot_path} is not a tarfile")

    with tarfile.open(bot_path) as tgz_file, TemporaryDirectory() as tmp_dir:
        tgz_file.extractall(tmp_dir)
        data = load_folder_bot(Path(tmp_dir), bot_lang)

    return data
