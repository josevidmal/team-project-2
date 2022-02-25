const menuButton = document.querySelector("#menu-button");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    ul.classList.toggle("show");
  });