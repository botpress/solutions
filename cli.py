import sys
from streamlit import cli as stcli
from pathlib import Path


def main() -> None:
    sys.argv = [
        "streamlit",
        "run",
        f"{Path(__file__).parent / 'gui.py'}",
        "--server.port",
        "8501",
        "--theme.base",
        "dark",
    ]
    sys.exit(stcli.main())


if __name__ == "__main__":
    main()
