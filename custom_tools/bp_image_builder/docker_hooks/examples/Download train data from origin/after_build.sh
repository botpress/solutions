#!/bin/sh
echo "\n------\nExecuting after_build hook to download as AI models for bots\n-------\n"
echo "Build Origin Host is $BUILD_ORIGIN_HOST"
echo "Build token is $BUILD_TOKEN"
echo "-------\n"
root=/botpress/data/bots
cd $root

#Download jq for json processing
jq=$root/jq
echo "Downloading jq from https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64"
success=$(wget -O $jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 2>&1 | grep -c '200 OK')
chmod 775 $jq
if [ ! $success = 1 ]; then 
    echo "Issues aquiring jq, verify your internet connection and try again."
    return
fi

#Download the file index from the origin server db
file_index="$root/origin_files.json"
header="Authorization: Bearer $BUILD_TOKEN"
echo "Downloading origin files index from host $BUILD_ORIGIN_HOST"
success=$(wget --header="$header" -O $file_index $BUILD_ORIGIN_HOST/api/v1/bots/bot2/mod/code-editor/files?rawFiles=true 2>&1 | grep -c '200 OK')
chmod 775 $file_index

if [ ! $success = 1 ]; then 
    echo "Issues aquiring origin files index, verify your origin host and token (don't use localhost as the host argument) and internet connection."
    return
fi

# Goes into each bot folder, and use its name to download the correct AI model
for d in */ ; do
    botId="${d%\/*}"

    # Create or clean /models dir
    modelsDir=$root/$botId/models
    if [ -d "$modelsDir" ]; then
        rm -R $modelsDir/*
    else
        mkdir $modelsDir
    fi

    # Get the path for all models for this bot that is included in the .json file downloaded from the origin server
    filter=".raw[] | select( .location | contains(\"bots/$botId/models/\")) | .location"
    models=$(cat $root/origin_files.json | $jq -c "$filter")
    echo "\n\nDownloading models for bot $botId\n-------------\n"
    for modelPath in $models ; do
    	echo "\n---\nModel Path: $modelPath"
        filter=".raw[] | select( .location == $modelPath) | .name"
        modelName=$(cat $root/origin_files.json | $jq -c "$filter")
        echo "Model Name: $modelName"
        echo "Downloading from $BUILD_ORIGIN_HOST/api/v1/bots/___/mod/code-editor/download"
        modelName="${modelName%\"}"
        modelName="${modelName#\"}"
        data="{\"name\":\"$modelName\",\"type\":\"raw\",\"location\": $modelPath}"
        success=$(wget --header="$header" --header="Content-Type: application/json" --post-data "$data" -O $modelsDir/$modelName $BUILD_ORIGIN_HOST/api/v1/bots/___/mod/code-editor/download 2>&1 | grep -c '200 OK')

        if [ ! $success = 1 ]; then 
            echo "Issues downloading model, check your arguments."
            return
        fi
    done

    echo "\n---->Finished downloading models for bot $botId"
done

echo "\n\n ------>Finished downloading models for all bots<------\n"