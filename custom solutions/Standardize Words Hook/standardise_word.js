function hook(bp: typeof sdk, event: sdk.IO.IncomingEvent) {
  /** Your code starts below */
  if (event.type !== "text") {
    return;
  }
  const _ = require("lodash");
  const maps = {
    covid: [
      /\bcoronavirus\b/gi,
      /\bcorona\b/gi,
      /\bcoronnavirus\b/gi,
      /\bcarona\b/gi,
      /\bcovid-19\b/gi,
      /\bcovid19\b/gi,
      /\bcovid 19\b/gi,
      /\sars-cov-2\b/gi,
      /\pandemic\b/gi,
    ],
  };
  let phrase = event.preview;
  _.entries(maps).forEach(([key, syn]) => {
    syn.forEach((e) => {
      phrase = phrase.toLowerCase().replace(e, key);
    });
  });
  event.preview = phrase;
  event.payload.text = phrase;
  /** Your code ends here */
}
