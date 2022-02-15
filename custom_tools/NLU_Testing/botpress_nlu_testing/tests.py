from botpress_nlu_testing.typings import NluResult
from typing import List, cast, Tuple
from pathlib import Path
from botpress_nlu_testing.api import BotpressApi
from botpress_nlu_testing.typings import Test
from concurrent.futures import ThreadPoolExecutor, as_completed, Future
import pandas as pd
import json

# TODO: Make a class, yield result so we can have a progress bar
def load_json_tests(test_path: Path) -> List[Test]:
    """Load tests from a json file

    Parameters
    ----------
    test_path : Path
        The path of the file containing the tests.

        The Json format needs to be {'utterance': 'xxx', 'expected': 'xxx'}

    Returns
    -------
    List[Test]
        A list of all the parsed tests
    """
    tests: List[Test] = []

    with open(test_path) as test_file:
        data = json.load(test_file)

        for sample in data:
            tests.append(
                Test(utterance=sample["utterance"], expected=sample["expected"])
            )

    return tests


def load_xsv_tests(test_path: Path) -> List[Test]:
    """Load tests from a csv or tsv file

    Parameters
    ----------
    test_path : Path
        The path of the file containing the tests.

        A header with Utterance, Expected is required and the file need to follow the header format

    Returns
    -------
    List[Test]
        A list of all the parsed tests
    """
    tests: List[Test] = []

    with open(test_path, "r") as test_file:
        test_data = cast(
            pd.DataFrame,
            pd.read_csv(
                test_file, delimiter=None, header=0, usecols=["Utterance", "Expected"]
            ),
        )

        for _, values in test_data.iterrows():
            utterance, expected = cast(Tuple[str, str], values)
            tests.append(
                Test(
                    utterance=utterance.strip(),
                    expected=expected.strip().lower().replace("-", "_"),
                )
            )

    return tests


def load_tests(test_path: Path) -> List[Test]:
    """Load the test file to a list of know data structure

    Parameters
    ----------
    test_path : Path
        The path of the file containing the tests (tsv, csv, json)

    Returns
    -------
    List[Test]
        The list of all tests

    Raises
    ------
    AssertionError
        If the file format cannot be parsed or is not supported
    """
    if test_path.suffix == ".json":
        return load_json_tests(test_path)
    elif test_path.suffix in [".tsv", ".csv"]:
        return load_xsv_tests(test_path)
    else:
        raise AssertionError("The test file is neither a json nor a tsv/csv")


def run_tests(test_path: Path, api: BotpressApi) -> List[NluResult]:
    """Load tests from a path then query in parallel the API and returns predictions

    Parameters
    ----------
    test_path : Path
        The path of the tests
    api : BotpressApi
        A class dealing with the nlu server API

    Returns
    -------
    List[NluResult]
        All the results in the NluResult format ( utterance, expected, entities, confidence, predicted)
    """
    results: List[NluResult] = []
    threads = []
    tests: List[Test] = load_tests(test_path)
    with ThreadPoolExecutor(max_workers=10) as executor:
        for test in tests:
            f: Future[NluResult] = executor.submit(
                api.predict, test["utterance"], test["expected"]
            )
            threads.append(f)
        [results.append(future.result()) for future in as_completed(threads)]  # type: ignore[Future[NluResult]]

    return results
