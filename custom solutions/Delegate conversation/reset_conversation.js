const exec = (botId) => {
  if (session.delegation) {
    session.delegation[botId] = undefined;
  }
};

return exec(args.botId);
