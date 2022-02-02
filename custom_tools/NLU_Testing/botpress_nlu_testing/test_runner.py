from botpress_nlu_testing.typings import Result

from typing import List
from pathlib import Path

from botpress_nlu_testing.api import BotpressApi
from botpress_nlu_testing.typings import Test, NluResult
from time import time
import csv
import json

# TODO: Make a class, yield result so we can have a progress bar
def load_json_tests(test_path: Path) -> List[Test]:
    tests: List[Test] = []

    with open(test_path) as test_file:
        data = json.load(test_file)

        for sample in data:
            tests.append(
                Test(utterance=sample["utterance"], expected=sample["expected"])
            )

    return tests


def load_xsv_tests(test_path: Path) -> List[Test]:
    tests: List[Test] = []

    with open(test_path, "r") as test_file:
        reader = csv.reader(
            test_file, delimiter="\t" if test_path.suffix == ".tsv" else ","
        )
        next(reader, None)  # Skip the headers

        for utterance, expected in reader:
            tests.append(Test(utterance=utterance.strip(), expected=expected.strip()))

    return tests


def load_tests(test_path: Path) -> List[Test]:
    if test_path.suffix == ".json":
        return load_json_tests(test_path)
    elif test_path.suffix in [".tsv", ".csv"]:
        return load_xsv_tests(test_path)
    else:
        raise AssertionError("The test file is neither a json nor a tsv/csv")


def run_tests(test_path: Path, api: BotpressApi) -> List[Result]:
    results: List[Result] = []
    for test in load_tests(test_path):
        start = time()
        res: NluResult = api.predict(test["utterance"])
        predicted_time = time() - start

        results.append(
            Result(
                utterance=test["utterance"],
                expected=test["expected"],
                confidence=res["confidence"],
                predicted=res["predicted"],
                time=predicted_time,
            )
        )

    return results
