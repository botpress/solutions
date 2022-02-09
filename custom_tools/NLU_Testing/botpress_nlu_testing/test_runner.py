from botpress_nlu_testing.typings import NluResult
from typing import List
from pathlib import Path
from botpress_nlu_testing.api import BotpressApi
from botpress_nlu_testing.typings import Test
from concurrent.futures import ThreadPoolExecutor, as_completed, Future
import pandas
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
        test_data: pandas.DataFrame = pandas.read_csv(test_file, delimiter=None, header=0, usecols=["Utterance", "Expected"]) #type: ignore[misc]

        for _index, values in test_data.iterrows() : # type: List[str]
            tests.append(Test(utterance=str(values[0]).strip(), expected=str(values[1]).strip()))

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
        [results.append(future.result()) for future in as_completed(threads)] #type: ignore[Future[NluResult]]
    
    return results
