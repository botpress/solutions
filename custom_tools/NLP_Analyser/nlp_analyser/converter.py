from pathlib import Path
from csv import reader


def convert_csv_to_txt_files(
    csv_path: Path, txt_path: Path, delimiter: str, column_idx: int, no_headers: bool
) -> None:
    assert len(delimiter) == 1

    with open(csv_path, "r") as csv_file, open(txt_path, "w") as out_file:
        csv_reader = reader(csv_file, delimiter=delimiter)

        if not no_headers:
            next(csv_reader)

        for row in csv_reader:
            out_file.write(row[column_idx] + "\n")
