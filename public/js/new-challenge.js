document.addEventListener("DOMContentLoaded", () => {
  // Difficulty buttons logic
  const difficultyButtons = document.querySelectorAll("#difficulty-buttons input");
  const difficultyLabels = document.querySelectorAll("#difficulty-buttons label");

  difficultyLabels.forEach((label) => {
    label.addEventListener("click", () => {
      difficultyLabels.forEach((l) => l.classList.remove("selected"));
      label.classList.add("selected");
    });
  });

  // Markdown Preview Logic
  const previewButton = document.getElementById("preview-btn");
  const markdownTextarea = document.getElementById("challenge-instructions");
  const markdownPreview = document.getElementById("markdown-preview");

  previewButton.addEventListener("click", () => {
    const markdownText = markdownTextarea.value;
    markdownPreview.innerHTML = marked.parse(markdownText);
  });
});

document.querySelector(".add-test-case-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const testCaseSection = document.querySelector(".test-cases-section");

  // Create new test case
  const newTestCase = document.createElement("div");
  newTestCase.classList.add("test-case");
  newTestCase.innerHTML = `
    <div class="test-case-body">
      <div class="test-case-item">
        <input type="text" placeholder="Enter Input">
      </div>
      <div class="test-case-item">
        <input type="text" placeholder="Enter Output">
      </div>
    </div>
  `;

  testCaseSection.insertBefore(newTestCase, document.querySelector(".add-test-case-btn"));
});
