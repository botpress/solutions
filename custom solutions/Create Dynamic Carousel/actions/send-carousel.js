/**
 * Send list of reservations to the user so he can pick
 * @title Send reservations picker
 * @category Dynamic Carousel
 */
const sendCarousel = async (reservations) => {
  if (!reservations || !reservations.length) {
    return bp.logger.warn("No reservations to send to the user");
  }

  const makeCard = ({ number, arrival, departure, id, status, adults, total_booking_value }) => {
    let title;
    let subtitle;

    const price = total_booking_value.cents / 100;

    if (event.channel === "web") {
      title = `Reservation ${number}`;
      subtitle = `\n${arrival} to ${departure}\nBooking Total: ${price} CAD\n1 Room, ${adults} Adults\nStatus: ${status}`;
    } else {
      title = `Reservation ${number} ${status}`;
      subtitle = `${arrival} to ${departure}\n1 Room, ${adults} Adults`;
    }

    const button = bp.experimental.render.buttonPostback("Select", `PICK_RESERVATION_${id}`);

    return bp.experimental.render.card(title, undefined, subtitle, button);
  };

  const cards = reservations.map((x) => makeCard(x));
  const carousel = bp.experimental.render.carousel(...cards);

  return bp.events.replyToEvent(event, [carousel]);
};

return sendCarousel(temp.user_reservations);
