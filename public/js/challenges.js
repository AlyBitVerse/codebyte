const BASE_URL = "http://localhost:3000";
const API_BASE_URL = "http://localhost:3000/api";
const selections = document.querySelector(".selections-menu");

function renderMenu() {
  const categories = [
    "Algorithms",
    "Data Structures",
    "Mathematics",
    "Artificial Intelligence",
    "Databases",
    "Operating Systems",
    "Networking",
    "Shell Scripting",
    "Competitive Programming",
    "Blockchain",
  ];

  selections.innerHTML = `
  <form id="query-form" class="flex col">
    <select name="language" id="languages"></select>
    <select name="difficulty" id="difficulties">
      <option value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
      <option value="Expert">Expert</option>
    </select>
    <select name="categories" id="categories">
      ${categories
        .map((category) => `<option value="${category}">${category}</option>`)
        .join("")}
    </select>
    <button id="select-btn">Select</button>
    <img id="someImage" src="https://placehold.co/400" alt="" />
  </form>`;
  fetch(`${API_BASE_URL}/challenges/languages`)
    .then((res) => res.json())
    .then((languages) => {
      languages.forEach((language) => {
        document.getElementById(
          "languages"
        ).innerHTML += `<option value="${language}">${language}</option>`;
      });
    });
}

function renderChallenges() {
  fetch(`${API_BASE_URL}/challenges`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.challenges);
      data.challenges.forEach((challenge) => {
        challengesContainer.innerHTML += `
        <div class="card">
          <div class="header">
            <h2 class="title">${challenge.title}</h2>
            <i class="fa-solid fa-ellipsis ellipsis"></i>
          </div>
          <div class="description">
            <p>
              ${challenge.description.slice(0, 150)} ...
            </p>
          </div>
          <div class="category">
            <div class="tags">
              ${challenge.tags
                .map((tag) => `<div class="tag">${tag}</div>`)
                .join("")}
            </div>
            <div class="difficulty">
              <p class="${challenge.difficulty}">${
          challenge.difficulty.charAt(0).toUpperCase() +
          challenge.difficulty.slice(1)
        }</p>
            </div>
          </div>
        </div>
      `;
      });
    });
}

renderMenu();
renderChallenges();
