# Record all Misunderstood

Like Q&As utterances are only recorded as misunderstood if they occur outside of a flow. This hook changes that behavior to record every single utterance that causes the matched intent to be `none`.

Add as an `after-incoming-middleware` hook.
