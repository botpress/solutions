# NLP Analyser tool

This tool provide a small GUI to cluster a corpus

For now it support only csv files and txt files.

# Installation
This tool requires that python is installed on your machine.

## With a venv 
This is an exemple setup. If you have yours just `pip install botpress_analyser`.

```shell 
mkdir test                     # create a new folder
cd test                        # go to this folder
python -m venv .venv           # create the venv (virtual environnement)
source .venv/bin/activate      # activate the venv 
pip install botpress_analyser  # install the tool 
nlp_analyser gui               # launch the tool
deactivate                     # quit the venv
```

## With poetry 
Install poetry from https://python-poetry.org/docs/#installation 

```shell
mkdir test                    # create a new folder
cd test                       # go to this folder
poetry init                   # init poetry in the folder 
poetry add botpress_analyser  # add the dependency
poetry install                # double check that all is installed 
poetry run nlp_analyser gui   # launch the tool in the poetry **env**
```
# Using the GUI
We provide a small gui to help less technical users.
## Launching the gui
Once installed, run `nlp_analyser gui` to launch the app. 

It will launch on localhost, port 8501 by default.

You can then go to http://localhost:8501 and use the tool.

## Using a csv file
We provide a small utility to convert a csv file to a txt one. 

You __need__ to provide the column index where the text is and the csv delimiter.

By default it's `0` and `,` 

Then you can import any csv file, right after importing, a button will appear in the sidebar and you will be able to download the converted txt file.

Then the tool will automatically use this new converted text file as if you exported that in the first time.
## Using a txt file

You have nothing to do when using a text file. 
Just ensure that it's one sentence per line.

Buttons will appear and you will be able to analyse and cluster your corpus

# Analysis
When analyzing the corpus, we provide a progress bar. However, the operation might be really slow on big corpuses....

When clustering, we have no way to report progress but that can also be long for huge files...


# Using the cli 

We also provide a cli for users that prefer to use the command line.

After installing you can access it with `nlp_analyser --help` and follow from there.

It provide the same command as the gui : converting a csv and analyzing the corpus.