from pathlib import Path
from typing import Optional, List

import click

from nlp_analyser.analyser import analyse_datas
from nlp_analyser.converter import convert_csv_to_txt_files

import sys
from streamlit import cli as stcli
from pathlib import Path


@click.group()
def converter():
    """
    Group with some file converting commands. For more information about the commands, please refer to `nlp_analyser convert --help`
    """
    pass


@converter.command()
@click.option(
    "--file",
    "-f",
    type=click.Path(
        exists=True, file_okay=True, readable=True, path_type=Path, dir_okay=False
    ),
    required=True,
)
@click.option(
    "--delimiter",
    "-d",
    type=click.STRING,
    required=True,
)
@click.option(
    "--column-idx",
    "-c",
    type=click.INT,
    required=True,
)
@click.option(
    "--no-headers",
    "-h",
    is_flag=True,
)
def csv_to_text(file: Path, delimiter: str, column_idx: int, no_headers: bool):
    """
    Convert a CSV file to a text file.
    The output will be the same as the input, but with a .txt extension.
    """
    csv_path = Path(str(Path(file)).replace(".txt", ".csv"))
    convert_csv_to_txt_files(file, csv_path, delimiter, column_idx, no_headers)


@click.group()
def analyse():
    """
    Group with some analysis commands. For more information about the commands, please refer to `nlp_analyser analyse --help`
    """
    pass


@analyse.command()
@click.option(
    "--file",
    "-f",
    type=click.Path(exists=True, file_okay=True, readable=True, path_type=Path),
)
@click.option(
    "--output",
    "-o",
    type=click.Path(file_okay=False, dir_okay=True, writable=True, path_type=Path),
    required=False,
)
def corpus(file: Path, output: Optional[Path]):
    """
    Analyse the corpus contained in a text file.
    It will cache some results in the output directory for faster recomputation.
    """
    if file.suffix != ".txt":
        raise AssertionError("Please give a text file with one utterance per line.")

    if output is None:
        output = file.parent
    output.mkdir(exist_ok=True, parents=True)

    with open(file, "r") as data_file:
        datas: List[str] = data_file.readlines()

    report_html, topics_html = analyse_datas(datas, output)

    with open(output.joinpath("results.html"), "w") as res_file:
        res_file.write(report_html)

    with open(output.joinpath("topics.html"), "w") as res_file:
        res_file.write(topics_html)


@click.group()
def cli():
    """
    The nlp_analyser CLI.
    For more information about the commands, please refer to `nlp_analyser --help`
    """
    pass


cli.add_command(analyse)
cli.add_command(converter)


@cli.command()
def gui() -> None:
    """
    Launch the GUI (streamlit app).
    """
    sys.argv = [
        "streamlit",
        "run",
        f"{Path(__file__).parent / 'gui.py'}",
        "--server.port",
        "8501",
        "--theme.base",
        "dark",
        "--server.fileWatcherType",
        "none",
    ]
    sys.exit(stcli.main())


if __name__ == "__main__":
    cli()
