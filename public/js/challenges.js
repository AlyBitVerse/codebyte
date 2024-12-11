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
