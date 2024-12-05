export function buildHeader(navItems) {
  return `<div class="container">
        <nav class="flex row wrap">
          <h1 id="logo">Codebyte</h1>

          <ul class="toggle-menu ">
            <li><input type="text" placeholder="search" /></li>
            <li><i class="fas fa-bars toggle-menu"></i></li>
          </ul>

          
          <ul class=" menu flex">
            <li><input type="text" placeholder="search" /></li>
            <li>
              <a><i class="fa-solid fa-bell"></i></a>
            </li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Challenges</a></li>
            <li>
              <a href="#"
                >Logout <i class="fa-solid fa-right-from-bracket"></i
              ></a>
            </li>
          </ul>
        </nav>
      </div>`;
}
