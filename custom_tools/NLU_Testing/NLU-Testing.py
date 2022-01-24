# ////////////////////////////////////////////////////////////////////
# This code does three things
# 1. It uses your credentials to generate an access token
# 2. It modifies the individual .json files for each Q&A to:
#   a. Remove any redirection
#   b. Set the answer to "Test Answer"
# 3. Takes individual utterances from a test dataset and sends them via converse API to the bot and records the intent
#   - If no intent is matched, it will record a blank entry
#   - After all testing is done it will save the test results
# Sometimes you may need to run the program twice- once to change the Q&A files, then train the bot,
# and then a second time to test the utterances on the newly-trained bot
# Writeen by Gordon Clark on Botpress 12.26.9
# /////////////////////////////////////////////////////////////////////

import requests
import pandas
import sys
import os
import json
import re
import uuid
import numpy as np
import matplotlib.pyplot as plt
from dotenv import load_dotenv
import sklearn.metrics
from concurrent.futures import ThreadPoolExecutor, as_completed

BASEDIR = os.path.abspath(os.path.dirname(__file__))

# Connect the path with your '.env' file name
load_dotenv(os.path.join(BASEDIR, '.env'))

# Read an environment variables.

endpoint = os.getenv("ENDPOINT")
user = os.getenv("EMAIL")
password = os.getenv("PASSWORD")
botId= os.getenv("BOT_ID")
testPath = os.getenv("TEST_PATH")
col_name = os.getenv('COL_NAME')
resultsPath = os.getenv("RESULTS_PATH")
qnaFolderPath = os.getenv("QNA_FOLDER_PATH")

####### Definitions #################

def getToken(endpoint, email, password):
    try:
        return requests.post(f"{endpoint}/api/v1/auth/login/basic/default", data={"email":email, "password":password}).json()["payload"]["jwt"]
    except:
        print('Error retrieving auth token- check your credentials')

def sendUtterance(utterance):
    user = uuid.uuid4()
    result_dict = {}
    payload= {
    "type":"text",
    "text":utterance
    }
    auth= {"Authorization": "Bearer "+token}
    url = f"{endpoint}/api/v1/bots/{botId}/converse/{user}/secured?include=decision,nlu"
    response = requests.post(url, data=payload, headers=auth)
    try:
        actual = response.json()["nlu"]["intent"]["name"]
    except:
        actual = "ERROR"
    if (re.match(r"__qna__",actual)):
        actual = actual[18:]
    
    result_dict[utterance] = "No Intent Matched" if actual == 'none' else actual
   # print(f"Utterance: {utterance} \n Actual: {actual}")
    return result_dict

# Renders a progress bar
def progress(count, total, status=''):
    bar_len = 60
    filled_len = int(round(bar_len * count / float(total)))

    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)

    sys.stdout.write('[%s] %s%s ...%s\r' % (bar, percents, '%', status))
    sys.stdout.flush()

# Some Q&As have automatic redirects. 
# This modifies the .json files of each Q&A to remove the redirect
def updateJsonFile(path):
    jsonFile = open(path, "r")
    data = json.load(jsonFile)
    jsonFile.close() 

    data["data"]["redirectFlow"] = ""
    data["data"]["redirectNode"] = ""
    data["data"]["action"]= "text"
    data["data"]["contexts"]= ["global"]
    data["data"]["answers"]["en"]=["Test Answer"]

    jsonFile = open(path, "w+")
    jsonFile.write(json.dumps(data, indent=6))
    jsonFile.close()

def runner():
    threads = []
    i = 0
    with ThreadPoolExecutor(max_workers=10) as executor:
        for phrase in test_df.Utterance:
            threads.append(executor.submit(sendUtterance, phrase))
        
        for task in as_completed(threads):
            progress(i, test_df.Utterance.size, status="Testing")
            results.append(task.result())
            i+=1
 
def cleanJSON():
    for filename in os.listdir(qnaFolderPath):
        updateJsonFile(qnaFolderPath+filename)
        print(filename+" has been modified")

def getGrade(y_act, y_pred):
    f1 = sklearn.metrics.f1_score(y_act, y_pred, labels=np.unique(np.array(y_act)), average='macro')
    prec = sklearn.metrics.precision_score(y_act, y_pred, labels=np.unique(np.array(y_act)), average='macro', zero_division=0)
    rec = sklearn.metrics.recall_score(y_act, y_pred, labels=np.unique(np.array(y_act)), average='macro',zero_division=0)
    print('\n')
    print(f"------{col_name} NLU Scoring--------\n Precision Score: {prec} \n Recall Score: {rec} \n F1 Score: {f1}")

# Step 1: Get the token
token = getToken(endpoint, user, password)

#Step 2: Clean the Q&A .json files
cleanJSON()
        
#Step 3: Send utterances to the bot
test_df = pandas.read_csv(testPath)

# Overwrite any previous data with the same labels
if( col_name in test_df.columns):
    test_df.drop(col_name, axis=1, inplace=True)
results = []         
print(f"Starting NLU test.... \n {test_df.Utterance.size} utterances detected")
runner()
results_df = pandas.concat(pandas.DataFrame.from_dict(i, orient='index', columns=[col_name]) for i in results)
test_df = test_df.merge(right= results_df, how='inner', right_index=True, left_on='Utterance')

#Step 4 Calculate scores
getGrade( test_df['Expected'], test_df[col_name])

#Save the data to a CSV before removing empties & errors
test_df.to_csv(resultsPath, index=False)

#Create the confusion matrix
empties = test_df.loc[test_df[col_name]=='']
errors = test_df.loc[test_df[col_name]=='ERROR']
print(f"Removed {empties.size} empty lines and {errors.size} errors")
test_df.drop(empties.index, inplace=True, axis=0)
test_df.drop(errors.index, inplace=True, axis=0)
labels = test_df[col_name].unique()

y_pred = test_df[col_name].tolist()
y_act = test_df["Expected"].tolist()

#Creating the confusion metrix
cm = sklearn.metrics.confusion_matrix(y_act, y_pred, labels=labels, normalize='true')
cmp = sklearn.metrics.ConfusionMatrixDisplay(cm, display_labels=labels)
fig, ax = plt.subplots(figsize=(15,15))

#Calculate Scores
f1 = sklearn.metrics.f1_score(y_act, y_pred, labels=labels, average='macro', zero_division=0)
prec = sklearn.metrics.precision_score(y_act, y_pred, labels=labels, average='macro',zero_division=0)
rec = sklearn.metrics.recall_score(y_act, y_pred, labels=labels, average='macro',zero_division=0)

#Add the scores in the plot's title
ax.text(2.5,-1, f"------{col_name} NLU Scoring--------\n Precision Score: {prec} \n Recall Score: {rec} \n F1 Score: {f1}",
size='large')

#cmp.plot(ax=ax, xticks_rotation='vertical')
plt.savefig(f"{col_name}_confusion_matrix.png", dpi=300)