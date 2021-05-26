const lblNewTicket = document.querySelector("#lblNewTicket");
const btnCreate = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  btnCreate.disable = false;
});

socket.on("disconnect", () => {
  btnCreate.disable = true;
});

socket.on("last-ticket", (last) => {
  lblNewTicket.innerText = "Ticket: " + last;
});

btnCreate.addEventListener("click", () => {
  socket.emit("next-ticket", null, (ticket) => {
    lblNewTicket.innerText = "Ticket " + ticket;
  });
});
