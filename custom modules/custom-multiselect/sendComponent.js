const options = [
  { label: "Test1", value: "Value1" },
  { label: "Test2", value: "Value2" },
];

//These options will appear to the user
const payloads = [
  {
    type: "custom",
    module: "custom-multiselect",
    component: "MultiSelect",
    question: "Please select an option",
    options,
  },
];

bp.events.replyToEvent(
  {
    botId: event.botId,
    channel: event.channel,
    target: event.target,
    threadId: event.threadId,
  },
  payloads,
  event.id
);
