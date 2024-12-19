const BASE_URL = "http://localhost:3000";
const API_BASE_URL = "http://localhost:3000/api";
const Menu = document.querySelector(".menu");

function renderNavbar() {
  if (Cookies.get("token")) {
    console.log("Token is present:", Cookies.get("token"));
    Menu.innerHTML = ` 
            <li>
              <a ><i id="logoutIcon" class="fa-solid fa-right-from-bracket" ></i></a>
            </li>
            <li>
              <a><i class="fa-solid fa-bell"></i></a>
            </li>
            <li class='xp'>0 xp</li>
            <li>
              <a href="../pages/profile.html" class="userImage"><img src="https://placehold.co/400" alt="" /></a>
            </li>`;
  } else {
    console.log("Token is not present.");
    Menu.innerHTML = `
            <li>
              <a href="../pages/auth.html">Login</a>
            </li>
           `;
  }
}
renderNavbar();

function handelLogout(event) {
  event.preventDefault();
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; HttpOnly;";
  // Redirect to homepage
  window.location.href = "/";
  // Re-render the navbar to reflect the updated state
  renderNavbar();
}
document.getElementById("logoutIcon").addEventListener("click", handelLogout);
