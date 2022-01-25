# NLU-Testing Python Script

### How to use:

1. Install [Python3](https://www.python.org/downloads/) and [Pip](https://pypi.org/project/pip/)


2. Use pip to install dependent packages

    `cd ~/NLU-Testing/`

    `pip -r requirements.txt`

3. Add the following information to the .env file:

    ENDPOINT
    : where your bot is exposed

    EMAIL
    : the username used to log in to Botpress

    PASSWORD
    : the password used with the above username

    BOT_ID
    : the ID of the bot which you will be testing

    TEST_PATH
    : the location of your file with test utterances. The file should be a .csv file with two columns like:
    | Utterance | Expected Intent |
    | --------- | --------------- |
    | Hi        |   greeting      |

    COL_NAME
    : the label for the test results

    RESULTS_PATH
    : if you want the test results saved in a different file than the one used in TEST_PATH, put that filepath here.

    QNA_FOLDER_PATH
    : fill in the first part with where Botpress is installed on your machine
    
    JSON_MOD
    : whether or not to remove redirects and content elements from the Q&As before testing. TRUE by default.

4. Run the script with

    `python3 NLU-Testing.py`

### How it works

This script uses multithreading to send 10 utterances at a time to the bot via Botpress Converse API.

Once an utterance is processed, the selected NLU intent name is saved alongside the utterance in the RESULTS_PATH file.

The Q&A ID prefix (__qna__1234567889010) is automatically stripped from any chosen Q&As.
