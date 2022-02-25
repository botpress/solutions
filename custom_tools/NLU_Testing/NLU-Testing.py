# ////////////////////////////////////////////////////////////////////
# This code does four things
# 1. It uses your credentials to generate an access token
# 2. It modifies the individual .json files for each Q&A to:
#   a. Remove any redirection
#   b. Set the answer to "Test Answer"
# 3. Takes individual utterances from a test dataset and sends them via converse API to the bot and records the intent
#   - If no intent is matched, it will record 'No Intent Matched'
#   - If any entities are extracted and EXTRACT_ENTITIES = TRUE in the .env file, it saves the extracted entity information
#   - After all testing is done it will save the test results to a csv
# 4. It uses the results to create a confusion matrix that's saved in the base folder
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
entities = os.getenv('EXTRACT_ENTITIES')
user = os.getenv("EMAIL")
password = os.getenv("PASSWORD")
botId= os.getenv("BOT_ID")
testPath = os.getenv("TEST_PATH")
col_name = os.getenv('COL_NAME')
resultsPath = os.getenv("RESULTS_PATH")
qnaFolderPath = os.getenv("QNA_FOLDER_PATH")
json_mod = os.getenv("JSON_MOD")

####### Definitions #################

# Gets the auth token
def getToken(endpoint, email, password):
    try:
        return requests.post(f"{endpoint}/api/v1/auth/login/basic/default", data={"email":email, "password":password}).json()["payload"]["jwt"]
    except:
        print('Error retrieving auth token- check your credentials')

# Uses the converse API to send an utterance to the bot and then records the top NLU suggestion
def getActualAndEntities(utterance):
    user = uuid.uuid4()
    result_dict = {}
    payload= {
    "type":"text",
    "text":utterance
    }
    auth= {"Authorization": "Bearer "+token}
    url = f"{endpoint}/api/v1/bots/{botId}/converse/{user}/secured?include=decision,nlu"
    response = requests.post(url, data=payload, headers=auth)
    slots = ""
    try:
        actual = response.json()["nlu"]["intent"]["name"]
        extracted = response.json()['nlu']['slots']
        
        if(len(extracted)>0):
            slots = [f"{extracted[i]['name']} was extracted from \"{extracted[i]['source']}\" and normalized to {extracted[i]['value']}"
                    for i in extracted]
        else:
            None
    except:
        actual = "ERROR"
    if (re.match(r"__qna__",actual)):
        actual = actual[18:]
    
    result_dict[utterance] = ["No Intent Matched", ''] if actual == 'none' else [actual,str(slots)]
   # print(f"Utterance: {utterance} \n Actual: {actual}")
    return result_dict

def getActual(utterance):
    user = uuid.uuid4()
    result_dict = {}
    payload= {
    "type":"text",
    "text":utterance
    }
    auth= {"Authorization": "Bearer "+token}
    url = f"{endpoint}/api/v1/bots/{botId}/converse/{user}/secured?include=decision,nlu"
    response = requests.post(url, data=payload, headers=auth)
    slots = ""
    try:
        actual = response.json()["nlu"]["intent"]["name"]
    except:
        actual = "ERROR"

    if (re.match(r"__qna__",actual)):
        actual = actual[18:]
    
    result_dict[utterance] = "No Intent Matched" if actual == 'none' else actual
   # print(f"Utterance: {utterance} \n Actual: {actual}")
    return result_dict

# Renders a progress bar in the terminal window
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

# Uses multithreading to send 10 utterances to the bot at once
def runner():
    threads = []
    i = 0
    with ThreadPoolExecutor(max_workers=10) as executor:
        if(entities == 'TRUE'):
            for phrase in test_df.Utterance:
                threads.append(executor.submit(getActualAndEntities, phrase))
            
            for task in as_completed(threads):
                progress(i, test_df.Utterance.size, status="Testing")
                results.append(task.result())
                i+=1
        else:
            for phrase in test_df.Utterance:
                threads.append(executor.submit(getActual, phrase))
            
            for task in as_completed(threads):
                progress(i, test_df.Utterance.size, status="Testing")
                results.append(task.result())
                i+=1
# ############ End Definitions #############

# Processing time!
# Step 1: Get the token
token = getToken(endpoint, user, password)

#Step 2: Clean the Q&A .json files
if(json_mod == 'TRUE'):
    for filename in os.listdir(qnaFolderPath):
        updateJsonFile(qnaFolderPath+filename)
        print(filename+" has been modified")
        
#Step 3: Send utterances to the bot
test_df = pandas.read_csv(testPath)

# Overwrite any previous data with the same labels
if( col_name in test_df.columns):
    test_df.drop(col_name, axis=1, inplace=True)
if( f"{col_name}_entities" in test_df.columns):
    test_df.drop(f"{col_name}_entities", axis=1, inplace=True)
results = []         
print(f"Starting NLU test.... \n {test_df.Utterance.size} utterances detected")
runner()
if(entities=='TRUE'):
    results_df = pandas.concat(pandas.DataFrame.from_dict(i, orient='index', columns=[col_name, f"{col_name}_entities"]) for i in results)
else:
    results_df = pandas.concat(pandas.DataFrame.from_dict(i, orient='index', columns=[col_name]) for i in results)
test_df = test_df.merge(right= results_df, how='inner', right_index=True, left_on='Utterance')

# Repeat the test for any errors, checking twice
errors = test_df.loc[(test_df[col_name]==None)|(test_df[col_name]=='')]
for error in errors.Utterance.index:
    test_df.at[error, col_name] = list(sendUtterance(test_df.Utterance.iloc[error]).values())[0]

errors = test_df.loc[(test_df[col_name]==None)|(test_df[col_name]=='')]
for error in errors.Utterance.index:
    test_df.at[error, col_name] = list(sendUtterance(test_df.Utterance.iloc[error]).values())[0]
# Remove any duplicate utterances
test_df.drop_duplicates(subset='Utterance', keep='last', ignore_index=True, inplace=True)

#Save data to a csv
test_df.to_csv(resultsPath, index=False)

#Step 4: Create confusion matrix & calculate scores
labels = np.sort(test_df[col_name].unique())
y_pred = test_df[col_name].tolist()
y_act = test_df["Expected"].tolist()

#Create the confusion metrix
fig, ax = plt.subplots(figsize=(20,15))
cmp = sklearn.metrics.ConfusionMatrixDisplay.from_predictions(y_act, y_pred, labels=labels, normalize='true', xticks_rotation='vertical', ax=ax)

#Calculate Scores
f1 = np.around(sklearn.metrics.f1_score(y_act, y_pred, labels=labels, average='macro', zero_division=0),4)
prec = np.around(sklearn.metrics.precision_score(y_act, y_pred, labels=labels, average='macro',zero_division=0),4)
rec = np.around(sklearn.metrics.recall_score(y_act, y_pred, labels=labels, average='macro',zero_division=0),4)
print(f"------{col_name} NLU Scoring--------\n Precision Score: {prec} \n Recall Score: {rec} \n F1 Score: {f1}")

#Add the scores in the plot's title and save the confusion matrix as a PNG
ax.text(2.5,-1, f"------{col_name} NLU Scoring--------\n Precision Score: {prec} \n Recall Score: {rec} \n F1 Score: {f1}",
size='large')
fig.tight_layout()
fig.savefig(os.path.join(BASEDIR, f"{col_name}_confusion_matrix.png"), dpi=fig.dpi)
