# Force Minimum Confidence

By default, Botpress NLU sets a minimum confidence threshold of 0.5- this hook allows users to raise that for a particular bot.

**How to use:**

1. Create a `before_suggestions_election` hook in your bot.
2. Copy/paste the contents of `minimum-confidence.js` into the new hook.
3. Modify the number on line 2 as needed.'

Note: This hook is only good for _raising_ the minimum confidence threshold. If you want to lower it, set the environmental variable  `BP_DECISION_MIN_CONFIDENCE` as needed.
