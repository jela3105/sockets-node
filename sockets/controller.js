const TicketControl = require("../models/ticket-control");
const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", ticketControl.last);
  socket.emit("actual-state", ticketControl.lastFour);
  socket.emit("pending-tickets", ticketControl.tickets.length);

  socket.on("next-ticket", (payload, callback) => {
    const next = ticketControl.next();
    callback(next);
    socket.broadcast.emit("pending-tickets", ticketControl.tickets.length);
  });

  socket.on("attend-ticket", ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: "desktop is required",
      });
    }
    const ticket = ticketControl.attendTicket(desktop);
    socket.broadcast.emit("actual-state", ticketControl.lastFour);
    socket.emit("pending-tickets", ticketControl.tickets.length);
    socket.broadcast.emit("pending-tickets", ticketControl.tickets.length);

    if (!ticket) {
      callback({ ok: false, msg: "There are not more tickets" });
    } else {
      callback({ ok: true, ticket });
    }
  });
};

module.exports = { socketController };
