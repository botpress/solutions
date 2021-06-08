/**
 * Small description of your action
 * @title The title displayed in the flow editor
 * @category Custom
 * @author Your_Name
 */
const myAction = async () => {
  const intervalMs = 500;
  const interval = setInterval(() => {
    bp.events.replyToEvent(event, [{ type: "typing", value: intervalMs }]);
  }, intervalMs);

  // Make your API call (may take between any amount of time to execute)
  // ...

  clearInterval(interval);

  // Do something with your response
  // ...
};

return myAction();
