const BASE_URL = "http://localhost:3000";
const API_BASE_URL = "http://localhost:3000/api";

const challengesContainer = document.querySelector(".challenges");

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

renderChallenges();
