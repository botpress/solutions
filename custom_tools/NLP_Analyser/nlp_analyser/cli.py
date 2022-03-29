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
    csv_path = Path(str(Path(file)).replace(".txt", ".csv"))
    convert_csv_to_txt_files(file, csv_path, delimiter, column_idx, no_headers)


@click.group()
def analyse():
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
def utterances(file: Path, output: Optional[Path]):
    if output is None:
        output = file.parent

    if file.suffix != ".txt":
        raise AssertionError("Please give a text file with one utterance per line.")

    with open(file, "r") as data_file:
        datas: List[str] = []
        for line in data_file:
            datas.append(line)

    report_html, topics_html = analyse_datas(datas, output)

    with open(output.joinpath("results.html"), "w") as res_file:
        res_file.write(report_html)

    with open(output.joinpath("topics.html"), "w") as res_file:
        res_file.write(topics_html)


@click.group()
def cli():
    pass


cli.add_command(analyse)
cli.add_command(converter)


@cli.command()
def gui() -> None:
    """
    Launch the streamlit app from the command line.
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
