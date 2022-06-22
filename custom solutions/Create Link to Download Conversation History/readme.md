# Create Link to Download Conversation History

This solution will create a API endpoint that users can access to download their conversation history

# How to use it

1. Create the after_server_start hook available in this folder (createDownloadConversationRouter.js) as a global hook in your server, and restart your server
2. Use the action from the file SendTranscriptDownloadLink.js, also included in this folder, to send the transcript download link to your user.
