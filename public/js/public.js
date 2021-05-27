const lblTicket1 = document.querySelector("#lblTicket1");
const lblTicket2 = document.querySelector("#lblTicket2");
const lblTicket3 = document.querySelector("#lblTicket3");
const lblTicket4 = document.querySelector("#lblTicket4");
const lblDesktop1 = document.querySelector("#lblDesktop1");
const lblDesktop2 = document.querySelector("#lblDesktop2");
const lblDesktop3 = document.querySelector("#lblDesktop3");
const lblDesktop4 = document.querySelector("#lblDesktop4");
const socket = io();

socket.on("actual-state", (payload) => {
  const [ticket1, ticket2, ticket3, ticket4] = payload;
  lblTicket1.innerText = "Ticket " + ticket1.number;
  lblTicket2.innerText = "Ticket " + ticket2.number;
  lblTicket3.innerText = "Ticket " + ticket3.number;
  lblTicket4.innerText = "Ticket " + ticket4.number;

  lblDesktop1.innerText = ticket1.desktop;
  lblDesktop2.innerText = ticket2.desktop;
  lblDesktop3.innerText = ticket3.desktop;
  lblDesktop4.innerText = ticket4.desktop;
});
