const moment = require("moment");
const axios = require("axios");
const { getUserIdFromTarget, getMessengerConfig } = require("./utils");

/**
 * @title Fill booking on website
 * @category Website
 * @author Botpress
 * @param {string} bonusCode Code to apply
 * @param {string} adults Number of adults
 * @param {string} children Number of children
 * @param {string} arrival Arrival date
 * @param {string} departure Number of nights
 */
const openWebsite = async (bonusCode, adults, children, arrival, departure) => {
  const arrivalDate = moment(arrival).format("DD MMM YYYY");
  const nbOfNights = moment(departure).diff(moment(arrival), "day");

  const config = await bp.config.getModuleConfigForBot("my-module", event.botId);
  const website = config.reservationURL;
  const url = `${website}?code${bonusCode}&adults=${adults}&arrival=${arrivalDate}&kids=${children}&nbOfNights=${nbOfNights}`;

  if (event.channel === "messenger") {
    const config = await getMessengerConfig(event.botId, bp);
    const userId = await getUserIdFromTarget(event.target, bp);

    let headerText = "Reservation";
    let buttonText = "Complete Reservation";

    if (user.language === "fr") {
      headerText = "Inscription";
      buttonText = "Terminer sur le site web";
    }

    const payload = {
      recipient: {
        id: userId,
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: headerText,
            buttons: [
              {
                type: "web_url",
                url,
                title: buttonText,
              },
            ],
          },
        },
      },
    };

    await axios.post(
      `https://graph.facebook.com/v2.6/me/messages?access_token=${config.accessToken}`,
      payload
    );
  } else if (event.channel === "web") {
    let message = `Great news! We have rooms available for your dates, with prices starting at ${temp.lowestPrice} CAD per room.\n \n[Click here to complete your reservation](${url})`;

    if (user.language === "fr") {
      message = `Bonne nouvelle! Nous avons des chambres disponibles pour vos dates, avec des prix commençant à ${temp.lowestPrice} CAD par chambre.\n \n[Cliquez ici pour compléter votre réservation](${url})`;
    }

    const payload = { type: "text", markdown: true, text: message };

    bp.events.replyToEvent(event, [payload], event.id);
  }
};

return openWebsite(args.bonusCode, Number(args.adults), Number(args.children), args.arrival, args.departure);
