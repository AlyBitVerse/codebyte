const BASE_URL = "http://localhost:3000";
const API_BASE_URL = "http://localhost:3000/api";
const selections = document.querySelector(".selections-menu");

function renderMenu() {
  selections.innerHTML = `
  <form id="query-form" class="flex col">
        <select name="language" id="lang-selection">
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="php">PHP</option>
          <option value="c#">C#</option>
          <option value="c++">C++</option>
          <option value="java">Java</option>
        </select>
        <select name="difficulty" id="difficulty-selection">
          <option value="very-easy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="medium">Meduim</option>
          <option value="hard">Hard</option>
          <option value="very-hard">Very Hard</option>
          <option value="expert">Expert</option>
        </select>

        <input list="Tags" name="tags"  placeholder="Tags (Optional)" />
        <datalist id="tags">
          <option value="Loops">
          <option value="Conditions">
          <option value="Functions">
          <option value="Strings">
          <option value="Arrays">
          <option value="Numbers">
        </datalist>
        <img id="someImage" src="https://placehold.co/400" alt=""  >
        <button ></button>
      </form>`;
}
renderMenu();


// const lang_selection = document.getElementById("lang-selection");
// const difficulty_selection = document.getElementById("difficulty-selection");
// const tagList = document.getElementById("tags");

function filterChallenges() {
  const language = document.getElementById("lang-selection").value ?? "";
  const difficulty = document.getElementById("difficulty-selection").value ?? "";
  const tags = tdocument.getElementById("tags").options.value ?? "";
  // tag1,tag2,tag3
  console.log(language, difficulty, tags);
  fetch(`${API_BASE_URL}/challenges?key=dsadasda&difficulty=`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.challenges);
      challengesContainer.innerHTML = "";
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
// 127.0.0:3000/api/challenges?language=javascript&difficulty=hard&tags=web,algorithms,beginner

document
  .getElementById("someImage")
  .addEventListener("click", filterChallenges);
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
