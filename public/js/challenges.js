const BASE_URL = "http://localhost:3000";
const API_BASE_URL = "http://localhost:3000/api";
const selections = document.querySelector(".selections-menu");
const challengesContainer = document.querySelector(".challenges");

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
  const languageList = [
    { id: 45, name: "Assembly (NASM 2.14.02)" },
    { id: 46, name: "Bash (5.0.0)" },
    { id: 47, name: "Basic (FBC 1.07.1)" },
    { id: 104, name: "C (Clang 18.1.8)" },
    { id: 75, name: "C (Clang 7.0.1)" },
    { id: 76, name: "C++ (Clang 7.0.1)" },
    { id: 103, name: "C (GCC 14.1.0)" },
    { id: 105, name: "C++ (GCC 14.1.0)" },
    { id: 48, name: "C (GCC 7.4.0)" },
    { id: 52, name: "C++ (GCC 7.4.0)" },
    { id: 49, name: "C (GCC 8.3.0)" },
    { id: 53, name: "C++ (GCC 8.3.0)" },
    { id: 50, name: "C (GCC 9.2.0)" },
    { id: 54, name: "C++ (GCC 9.2.0)" },
    { id: 86, name: "Clojure (1.10.1)" },
    { id: 51, name: "C# (Mono 6.6.0.161)" },
    { id: 77, name: "COBOL (GnuCOBOL 2.2)" },
    { id: 55, name: "Common Lisp (SBCL 2.0.0)" },
    { id: 90, name: "Dart (2.19.2)" },
    { id: 56, name: "D (DMD 2.089.1)" },
    { id: 57, name: "Elixir (1.9.4)" },
    { id: 58, name: "Erlang (OTP 22.2)" },
    { id: 44, name: "Executable" },
    { id: 87, name: "F# (.NET Core SDK 3.1.202)" },
    { id: 59, name: "Fortran (GFortran 9.2.0)" },
    { id: 60, name: "Go (1.13.5)" },
    { id: 95, name: "Go (1.18.5)" },
    { id: 88, name: "Groovy (3.0.3)" },
    { id: 61, name: "Haskell (GHC 8.8.1)" },
    { id: 96, name: "JavaFX (JDK 17.0.6, OpenJFX 22.0.2)" },
    { id: 91, name: "Java (JDK 17.0.6)" },
    { id: 62, name: "Java (OpenJDK 13.0.1)" },
    { id: 63, name: "JavaScript (Node.js 12.14.0)" },
    { id: 93, name: "JavaScript (Node.js 18.15.0)" },
    { id: 97, name: "JavaScript (Node.js 20.17.0)" },
    { id: 102, name: "JavaScript (Node.js 22.08.0)" },
    { id: 78, name: "Kotlin (1.3.70)" },
    { id: 64, name: "Lua (5.3.5)" },
    { id: 89, name: "Multi-file program" },
    { id: 79, name: "Objective-C (Clang 7.0.1)" },
    { id: 65, name: "OCaml (4.09.0)" },
    { id: 66, name: "Octave (5.1.0)" },
    { id: 67, name: "Pascal (FPC 3.0.4)" },
    { id: 85, name: "Perl (5.28.1)" },
    { id: 68, name: "PHP (7.4.1)" },
    { id: 98, name: "PHP (8.3.11)" },
    { id: 43, name: "Plain Text" },
    { id: 69, name: "Prolog (GNU Prolog 1.4.5)" },
    { id: 70, name: "Python (2.7.17)" },
    { id: 92, name: "Python (3.11.2)" },
    { id: 100, name: "Python (3.12.5)" },
    { id: 71, name: "Python (3.8.1)" },
    { id: 80, name: "R (4.0.0)" },
    { id: 99, name: "R (4.4.1)" },
    { id: 72, name: "Ruby (2.7.0)" },
    { id: 73, name: "Rust (1.40.0)" },
    { id: 81, name: "Scala (2.13.2)" },
    { id: 82, name: "SQL (SQLite 3.27.2)" },
    { id: 83, name: "Swift (5.2.3)" },
    { id: 74, name: "TypeScript (3.7.4)" },
    { id: 94, name: "TypeScript (5.0.3)" },
    { id: 101, name: "TypeScript (5.6.2)" },
    { id: 84, name: "Visual Basic.Net (vbnc 0.0.0.5943)" },
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
  const section = document.getElementById("languages");
  languageList.forEach((language) => {
    section.innerHTML += `<option value="${language.name}">${language.name}</option>`;
  });
}

function renderChallenges(withFilter = false) {
  challengesContainer.innerHTML = "";

  const languageInput = document.getElementById("languages");
  const difficultyInput = document.getElementById("difficulties");
  const categoryInput = document.getElementById("categories");

  let url = `${API_BASE_URL}/challenges?`;

  if (withFilter) {
    const language = languageInput.value ?? "";
    const difficulty = difficultyInput.value.toLowerCase() ?? "";
    const category = categoryInput.value.toLowerCase() ?? "";

    // url += difficulty
    //   ? `difficulty=${difficulty}&`
    //   : "" + language
    //   ? `language=${language}&`
    //   : "" + category
    //   ? `category=${category}&`
    //   : "";
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

renderMenu();
renderChallenges();
document.getElementById("select-btn").addEventListener("click", (e) => {
  e.preventDefault();
  renderChallenges(true);
});
