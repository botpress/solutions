This action forces a specific QnA to be sent a user, while ignoring any automatically detected QnAs.

## How to Use

1. Create your QnAs as normal
2. Make a choice skill where the values are the IDs for the QnAs you want to trigger

<img width="1116" alt="image" src="https://user-images.githubusercontent.com/77560236/169050762-9411fe88-ed69-4cd1-ad89-aff1498e653b.png">

3. You can easily find the QnA ID by exporting the QnAs as JSON. Just remember to add `__qna__` to the start of the ID

<img width="356" alt="image" src="https://user-images.githubusercontent.com/77560236/169051124-1ecf59a4-0ba4-43ad-b757-778b85d435eb.png">

4. Fill in the parameters:

**qnaId**: If you're using this after a choice skill, set it to `{{event.payload.payload}}`. Otherwise set it to the Qna ID from step 3

**collectFeedback**: true to show the thumbs up/down icons, false to hide them

**followRedirect**: true to follow the qna redirect (if applicable), false to use the node's transition as a follow-up.

<img width="650" alt="image" src="https://user-images.githubusercontent.com/77560236/169051295-d6c8d448-703a-4d37-855b-b191d7ff763a.png">
