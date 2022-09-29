/**
 * Process the dynamic choice option chosen by the user
 * @title Process dynamic option
 * @category Custom
 * @author Botpress
 * @param {string} variableName - Name of the variable to store choice information
 */
const myAction = async (variableName) => {
  // Check if the user was presented to the dynamic choice selection
  if (!temp.choice || !temp.choice[variableName]) {
    bp.logger.error("No dynamic option with the variable name " + variableName + " was chosen");
  } else {
    // If we have a payload (User clicked in a button) we just set the value to our variable
    if (event.payload && event.payload.payload) {
      temp.choice[variableName].value = event.payload.payload;
    } else {
      // Stores what the user typed
      const input = event.payload.text;
      // For each choice, check the value and synonyms
      for (const choice of temp.choice[variableName].choices) {
        if (choice.value.toUpperCase() == input.toUpperCase() || choice.title == input) {
          temp.choice[variableName].value = choice.value.toUpperCase();
        } else {
          if (choice.synonyms) {
            for (const synonyms of choice.synonyms) {
              if (synonyms == input) {
                temp.choice[variableName].value = choice.value.toUpperCase();
              }
            }
          }
        }
      }
    }
    // If no value was found for the input, we just return it as invalid
    if (!temp.choice[variableName].value) {
      temp.choice[variableName].invalid = true;
    }
  }
};
return myAction(args.variableName);
