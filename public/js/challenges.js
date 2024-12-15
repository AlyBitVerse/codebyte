const BASE_URL = "http://localhost:3000";
const API_BASE_URL = "http://localhost:3000/api";
const selections = document.querySelector(".selections-menu");
function renderMenu() {
  selections.innerHTML = `
  <form>
        <select name="lang" id="languages">
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="PHP">PHP</option>
          <option value="C#">C#</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
        </select>

        <select name="level" id="difficulties">
          <option value="Very Easy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="medium">Meduim</option>
          <option value="Hard">Hard</option>
          <option value="Very Hard">Very Hard</option>
          <option value="Expert">Expert</option>
        </select>

        <input list="Tags" name="tags" id="tags" placeholder="Tags (Optional)" />
        <datalist id="categories">
          <option value="Loops"></option>
          <option value="Conditions"></option>
          <option value="Functions"></option>
          <option value="Strings"></option>
          <option value="Arrays"></option>
          <option value="Numbers"></option>
        </datalist>
        <img id='button' src="https://placehold.co/400" alt="">
      </form>`;
}
renderMenu();

const challengesContainer = document.querySelector(".challenges");

function renderChallenges(withFilter = false) {
  challengesContainer.innerHTML = "";

  const languageInput = document.getElementById("languages");
  const difficultyInput = document.getElementById("difficulties");
  const tagsInput = document.getElementById("categories");

  let url = `${API_BASE_URL}/challenges?`;

  if (withFilter) {
    const language = languageInput.value ?? ""; // javascript
    const difficulty = difficultyInput.value.toLowerCase() ?? ""; // easy
    const tags = tagsInput.options.value ?? ""; // beginner,algorithms

    // tags = ['javascript', 'beginner'].join(',') // 'javascript,beginner'

    // tags = 'beginner'

    // category

    url += difficulty ? `difficulty=${difficulty}` : "";
  }

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((challenges) => {
      challenges.forEach((challenge) => {
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
document.getElementById("button").addEventListener("click", () => {
  renderChallenges(true);
});
