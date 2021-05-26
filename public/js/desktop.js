const lblDesktop = document.querySelector("h1");
const btnAttent = document.querySelector("button");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("Desktop")) {
  window.location = "index.html";
  throw new Error("The desktop is required");
}

const desktop = searchParams.get("Desktop");
lblDesktop.innerText = desktop;

const socket = io();

socket.on("connect", () => {
  btnAttent.disable = false;
});

socket.on("disconnect", () => {
  btnAttent.disable = true;
});

btnAttent.addEventListener("click", () => {});
