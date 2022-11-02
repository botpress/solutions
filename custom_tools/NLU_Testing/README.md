# NLU-Testing Python Scripts



Now available as a **command-line tool, a Jupyter notebook, or a hosted Google Colab notebook!**

This tool will take a CSV file of test phrases, send them to a Botpress bot via ConverseAPI, record the results, then generate a confusion matrix and F1 score.

<img width="799" alt="image" src="https://user-images.githubusercontent.com/77560236/199500793-29af303b-0996-432a-a491-d92cc65753ac.png">

The easiest way to get started is by making a copy of the Google Colab notebook and running it on your own Google Drive.

## How to use:

## Google Colab Notebook Instructions:
1. [Open this link](https://colab.research.google.com/drive/1Kk4WID3KvQTSG1YkGsqT_hR6r-hY7azv?usp=share_link) and make a copy of the notebook to your own Google Drive.
2. Follow the instructions in the file.

## Jupyter Notebook Instructions:
1. Set up your preferred [Jupyter Notebook](https://jupyter.org/) environment.
2. Download the [NLU_Testing.ipynb](NLU_Testing.ipynb) file and open it in your Jupyter instance.
3. Follow the instructions in the file


## Command-Line Tool Instructions:

1. Make sure you have [Python3](https://www.python.org/downloads/) and [Pip](https://pypi.org/project/pip/) installed.


2. Use pip to install dependent packages

    `cd ~/NLU-Testing/`

    `pip3 -r requirements.txt`
        
    Microsoft Visual C++ 14.0 or greater is required for the Pandas library on Windows. Get it with [Microsoft C++ Build Tools]( https://visualstudio.microsoft.com/visual-cpp-build-tools/)

3. Add the following information to the .env file:

    **ENDPOINT**
    : where your bot is exposed

    **EMAIL**
    : the username used to log in to Botpress

    **PASSWORD**
    : the password used with the above username

    **BOT_ID**
    : the ID of the bot which you will be testing
    
    **EXTRACT_ENTITIES**
    : whether or not to save any extracted entities during testing. Should be either TRUE or FALSE
    
    **EXTRACT_CONFIDENCE**
    : whether or not to record the decision confidence during testing. Confidence is rounded to two decimals (eg 78.32, 54.92, etc)

    **TEST_PATH**
    : the location of your file with test utterances. The file should be a .csv file with the first two columns labeled:
    | Utterance | Expected        |
    | --------- | --------------- |
    | Hi        |   greeting      |
    
    The .csv file can have more columns, but the first two must be labeled "Utterance" and "Expected" respectively.

    **COL_NAME**
    : the label for the test results

    **RESULTS_PATH**
    : if you want the test results saved in a different file than the one used in TEST_PATH, put that file path here.

    **QNA_FOLDER_PATH**
    : fill in the first part with where Botpress is installed on your machine
    
    **JSON_MOD**
    : whether or not to remove redirects and content elements from the Q&As before testing. This is useful when testing one bot's exported Q&As in a different bot. TRUE by default.

4. **Train your bot** as you would normally in Botpress Studio.

5. Run the script with

    `python3 NLU-Testing.py`
    

## How it works

This script uses multithreading to send 10 utterances at a time to the bot via Botpress Converse API and then records the Q&A or intent chosen. It will also record extracted slots for intents that have slots.

Once an utterance is processed, the selected NLU intent name is saved alongside the utterance in the **RESULTS_PATH** file.

The Q&A ID prefix (__qna__1234567889010) is automatically stripped from any chosen Q&As.
