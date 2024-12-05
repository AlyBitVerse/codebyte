import { buildHeader } from "./components.js";

(function init() {
  const header = document.querySelector("header");
  header.innerHTML = buildHeader();
})();
// IIFE -- Immediately Invoked Function Expression
