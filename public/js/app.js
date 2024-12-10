// import { buildHeader } from "./components.js";

// (function init() {
//   const header = document.querySelector("header");
//   header.innerHTML = buildHeader();
// })();
// // IIFE -- Immediately Invoked Function Expression
const isAuthenticate = true;
const Menu = document.querySelector(".menu");
document.addEventListener("DOMContentLoaded", () => {
  if (isAuthenticate) {
    Menu.innerHTML = ` <li>
              <a><i class="fa-solid fa-right-from-bracket"></i></a>
            </li>
            <li>
              <a><i class="fa-solid fa-bell"></i></a>
            </li>
            <li>0 xp</li>
            <li>
              <a><img src="https://placehold.co/400" alt="" /></a>
            </li>`;
  } else {
    Menu.innerHTML = `<li>
              <a>Login</a>
            </li>
            <li>
              <a>Signup</a>
            </li>`;
  }
});
