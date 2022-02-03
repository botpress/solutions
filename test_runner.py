from botpress_nlu_testing.typings import NluResult
from typing import List
from pathlib import Path
from botpress_nlu_testing.api import BotpressApi
from botpress_nlu_testing.typings import Test
from concurrent.futures import ThreadPoolExecutor, as_completed, Future
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


def run_tests(test_path: Path, api: BotpressApi) -> List[NluResult]:
    results: List[NluResult] = []
    threads = []
    tests: List[Test] = load_tests(test_path)
    with ThreadPoolExecutor(max_workers=10) as executor:
        for test in tests:
              f:Future[NluResult] = executor.submit(api.predict, test["utterance"], test["expected"])
              threads.append(f)
        [results.append(future.result()) for future in as_completed(threads)]
    
    return results