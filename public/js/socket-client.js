const lblOnline = document.getElementById("lblOnline");
const lblOffline = document.getElementById("lblOffline");
const txtMessage = document.getElementById("txtMessage");
const btnSend = document.getElementById("btn-send");
const socket = io();

socket.on("connect", () => {
  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});
socket.on("disconnect", () => {
  console.log("disconnect");
  lblOffline.style.display = "";
  lblOnline.style.display = "none";
});

socket.on("send-message", (payload) => {
  console.log(payload);
});

btnSend.addEventListener("click", () => {
  const message = txtMessage.value;
  socket.emit("send-message", message);
});
