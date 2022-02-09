from pathlib import Path
from typing import Optional, List

import click

from nlp_analyser.utterances import idea_split, analyse_datas


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

    report_html, topics_html = analyse_datas(datas)

    with open(output.joinpath("results.html"), "w") as res_file:
        res_file.write(report_html)

    with open(output.joinpath("topics.html"), "w") as res_file:
        res_file.write(topics_html)

    speechacts = idea_split(datas)
    for speech_act_label, speechact_datas in speechacts.items():
        with open(output.joinpath(f"{speech_act_label}.txt"), "w") as res_file:
            res_file.write("\n".join(speechact_datas))

        report_html, topics_html = analyse_datas(speechact_datas)

        with open(output.joinpath(f"results_{speech_act_label}.html"), "w") as res_file:
            res_file.write(report_html)

        with open(output.joinpath(f"topics_{speech_act_label}.html"), "w") as res_file:
            res_file.write(topics_html)
