Two methods for date manipulation.

1. Date Parser
   This action takes a parameter (either the user's text, another variable or a date), then it formats it in the requested format, and stores the result in the configured variable.

If format is left empty, it will return a JS date object
When format is equal to "moment", it will return a moment object
Any other value for format will return the date formatted to the specified format (ex: YYYY-MM-DD for 2022-03-28)

2. Date Compare

This action takes a parameter (either a string, a date object or a moment object) then returns whether the first date `isBefore`, `isAfter` or `isEqual` the second one.
