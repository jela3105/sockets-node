const TicketControl = require("../models/ticket-control");
const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", ticketControl.last);
  socket.on("next-ticket", (payload, callback) => {
    const next = ticketControl.next();
    callback(next);
  });
  socket.on("attend-ticket", ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: "desktop is required",
      });
    }
    const ticket = ticketControl.attendTicket(desktop);
    if (!ticket) {
      callback({ ok: false, msg: "There are not more tickets" });
    } else {
      callback({ ok: true, ticket });
    }
  });
};

module.exports = { socketController };
