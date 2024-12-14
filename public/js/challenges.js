const selections = document.querySelector(".selections-menu");
document.addEventListener("DOMContentLoaded", () => {
  selections.innerHTML = `
  <form class="flex col">
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
});
const challenges = document.querySelector(".challenges");

function renderChallenges() {
  Array.from({ length: 10 }).forEach((item) => {
    challenges.innerHTML += `
    <div class="card">
      <div class="header">
        <h2 class="title">Return the Sum of Two Numbers</h2>
        <i class="fa-solid fa-ellipsis ellipsis"></i>
      </div>
      <div class="description">
        <p>
          ${"Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe repudiandae aspernatur sapiente voluptas ex esse perspiciatis eos neque officia illo iure harum beatae, fugit, facere odio. Corporis eum iste accusamus libero, assumenda doloremque laborum earum est debitis vitae, tenetur reiciendis aliquid quae animi porro eaque necessitatibus nesciunt. Fuga inventore atque labore quae? Nihil inventore neque dolores corrupti rerum esse sapiente!".slice(
            0,
            150
          )} ...
        </p>
      </div>
      <div class="category">
        <div class="tags">
          <div class="tag">tag1</div>
          <div class="tag">tag2</div>
          <div class="tag">tag3</div>
        </div>
        <div class="difficulty">
          <p>Very Easy</p>
        </div>
      </div>
    </div>
  `;
  });
}

renderChallenges();
