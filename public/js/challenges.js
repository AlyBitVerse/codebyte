const BASE_URL = "http://localhost:3000";
const API_BASE_URL = "http://localhost:3000/api";
const selections = document.querySelector(".selections-menu");
function renderMenu() {
  selections.innerHTML = `
  <form>
        <select name="lang" id="">
          <option value="">JavaScript</option>
          <option value="">Python</option>
          <option value="">PHP</option>
          <option value="">C#</option>
          <option value="">C++</option>
          <option value="">Java</option>
        </select>

        <select name="level" id="">
          <option value="">Very Easy</option>
          <option value="">Easy</option>
          <option value="">Meduim</option>
          <option value="">Hard</option>
          <option value="">Very Hard</option>
          <option value="">Expert</option>
        </select>

        <input list="Tags" name="tags" id="tags" placeholder="Tags (Optional)" />
        <datalist id="Tags">
          <option value="Loops"></option>
          <option value="Conditions"></option>
          <option value="Functions"></option>
          <option value="Strings"></option>
          <option value="Arrays"></option>
          <option value="Numbers"></option>
        </datalist>
        <img src="https://placehold.co/400" alt="">
      </form>`;
}
renderMenu();
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
        <a href='#'><div class="card">
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
        </a>
      `;
      });
    });
}

renderChallenges();
