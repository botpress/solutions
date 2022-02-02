from time import sleep
import requests

from pathlib import Path
import re
from botpress_nlu_testing.bot_utils import load_tgz_bot

from botpress_nlu_testing.typings import NluResult, NluServerPredictions
from typing import Optional


class BotpressApi:
    def __init__(self, endpoint: str, bot_id: str):
        self.endpoint = endpoint
        self.bot_id = bot_id
        self.model_id = ""

    def is_up(self) -> None:
        response = requests.get(
            f"{self.endpoint}/v1/info",
        )
        if response.status_code != 200:
            raise ConnectionError(f"Language server is not running on {self.endpoint}")

    def get_model_for_bot(self) -> Optional[str]:
        self.is_up()

        response = requests.get(
            f"{self.endpoint}/v1/models/", params={"appId": self.bot_id}
        )

        if not response.json()["success"]:
            raise ConnectionError(f"Problem getting model:\n{response.text}")

        models = response.json()["models"]
        if models:
            self.model_id = models[0]
            return models[0]
        else:
            return None

    def clean(self) -> None:
        self.is_up()

        response = requests.post(
            "http://localhost:3200/v1/models/prune", json={"appId": self.bot_id}
        )

        if not response.json()["success"]:
            raise ConnectionError(f"Problem removing models:\n{response.text}")

    def train(self, bot_path: Path) -> None:
        """Run prediction on an utterance

        Parameters
        ----------
        bot tgz or folder : Path
            The phrase to be run in the NLP in boptress

        Raises
        ------
        ConnectionError
            Error when Training
        """
        self.is_up()
        self.clean()

        bot_data = load_tgz_bot(bot_path)
        response = requests.post(
            f"{self.endpoint}/v1/train",
            json={
                "language": bot_data["bot_lang"],
                "intents": bot_data["intents"],
                "contexts": bot_data["contexts"],
                "entities": bot_data["entities"],
                "appId": self.bot_id,
            },
        )

        if not response.json()["success"]:
            raise ConnectionError(f"Cannot train:\n {response.text}")

        self.model_id = response.json()["modelId"]
        sleep(2)

        try:
            response = requests.get(
                f"{self.endpoint}/v1/train/{self.model_id}",
                params={"appId": self.bot_id},
            )
            tries = 0

            while not response.json()["session"]["status"] == "done":
                sleep(2)
                response = requests.get(
                    f"{self.endpoint}/v1/train/{self.model_id}",
                    params={"appId": self.bot_id},
                )

                tries += 1
                if tries > 50:
                    raise RuntimeError(
                        "Tried 50 times to get status done when training..."
                    )

        except KeyError as err:
            raise ConnectionError(f"Cannot train:\n KeyError {err}")

    def predict(self, utterance: str) -> NluResult:
        """Run prediction on an utterance

        Parameters
        ----------
        utterance : str
            The phrase to be run in the NLP in boptress

        Returns
        -------
        Tuple[str, float]
            The intent name and it's confidence

        Raises
        ------
        ConnectionError
            When getting error when predicting
        """
        self.is_up()

        if not self.model_id:
            model = self.get_model_for_bot()
            if not model:
                raise AssertionError(f"No models were train for {self.bot_id}")

        response = requests.post(
            f"{self.endpoint}/v1/predict/{self.model_id}",
            json={"utterances": [utterance], "appId": self.bot_id},
        )

        if not response.json()["success"]:
            raise ConnectionError(f"Cannot predict:\n {response.text}")

        try:
            predictions: NluServerPredictions = response.json()["predictions"][0]
            detected_lang = predictions["detectedLanguage"]  # type: ignore[misc]
            entities = predictions["entities"]  # type: ignore[misc]
            context = predictions["contexts"][0]

            best_intent = NluResult(predicted="None", confidence=0.0)
            for intent in context["intents"]:
                if intent["confidence"] > best_intent["confidence"]:
                    best_intent = NluResult(
                        predicted=re.sub(r"__qna__[a-z0-9\d]+_", "", intent["name"]),
                        confidence=intent["confidence"],
                    )

            return best_intent

        except KeyError as err:
            raise ConnectionError(f"Cannot predict:\n Key Error {err}")
