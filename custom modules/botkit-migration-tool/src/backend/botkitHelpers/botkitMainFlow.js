exports.prepareMainFlow = {
    "id": "6203f536b1489ecf0869dc32",
    "command": "6203f536b1489ecf0869dc32",
    "name": "se_soigner_quand_on_a_un_rhume_v2",
    "description": "Se soigner quand on a un rhume -V2",
    "modified": "",
    "converter-format": "1.0",
    "source": "Botpress",
    "source_id": "6203f536b1489ecf0869dc32",
    "triggers": [
        {
            "type": "string",
            "pattern": "6203f536b1489ecf0869dc32"
        }
    ],
    "script":[],
    "variables":[]
}

exports.prepareMainScript = {
    "topic": "default",
    "first_message_id": "6203f58bb1489e4efb69dda8",
    "script": []
}

exports.prepareSubTxtScript = {"text": [""]}
exports.prepareSubImageScripts = 
{
    "attachment": {
        "type": "image",
        "payload": {
            "url": "https:\/\/s3.amazonaws.com\/botsociety.prod.us\/c150273ae427a90a60037e50fe6_giphy296gif.gif"
        }
    },
}
exports.prepareSubChoicScript = {
    "text": [
        "- Légère fièvre 🌡\n- Toux;\n- Maux de tête 🤕\n- Écoulement nasal; \n- Congestion du nez;\n- Fatigue 💤\n- Maux de gorge."
    ],
    "quick_replies": [
        {
            "title": "Pas l'fun",
            "payload": "Pas l'fun",
            "content_type": "text"
        },
        {
            "title": "🤒",
            "payload": "🤒",
            "content_type": "text"
        }
    ],
    "collect": {
        "key": "response_e031069ddee",
        "options": [
            {
                "default": true,
                "pattern": "default",
                "action": "eab0169ddf1"
            },
            {
                "pattern": "Pas l'fun",
                "type": "string",
                "action": "eab0169ddf1"
            },
            {
                "pattern": "🤒",
                "type": "string",
                "action": "eab0169ddf1"
            }
        ]
    }
}