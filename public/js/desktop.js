const lblDesktop = document.querySelector("h1");
const btnAttent = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert");
const lblPending = document.querySelector("#lblPending");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("Desktop")) {
  window.location = "index.html";
  throw new Error("The desktop is required");
}

const desktop = searchParams.get("Desktop");
lblDesktop.innerText = desktop;

divAlert.style.display = "none";
const socket = io();

socket.on("connect", () => {
  btnAttent.disable = false;
});

socket.on("disconnect", () => {
  btnAttent.disable = true;
});

socket.on("pending-tickets", (pendingTickets) => {
  lblPending.innerText = pendingTickets;
});

btnAttent.addEventListener("click", () => {
  socket.emit("attend-ticket", { desktop }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = "no ticket";
      return (divAlert.style.display = "");
    }
    lblTicket.innerText = `Ticket ${ticket.number}`;
  });
});
