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

        <input list="Tags" name="" id="" placeholder="Tags (Optional)" />
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
