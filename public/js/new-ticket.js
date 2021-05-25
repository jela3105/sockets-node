const lblNewTicket = document.querySelector("#lblNewTicket");
const btnCreate = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  btnCreate.disable = false;
});

socket.on("disconnect", () => {
  btnCreate.disable = true;
});

btnCreate.addEventListener("click", () => {
  socket.emit("next-ticket", null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
