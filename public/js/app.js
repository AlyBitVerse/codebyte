const BASE_URL = "http://localhost:3000";
const API_BASE_URL = "http://localhost:3000/api";
const Menu = document.querySelector(".menu");
const sideNavMenu = document.getElementById("sideNav");
const sideNavLinks = document.querySelectorAll("#sideNav a");

function renderNavbar() {
  if (true) {
    console.log("Token is present:", Cookies.get("token"));
    Menu.innerHTML = ` 
            <li>
              <a><i class="fa-solid fa-bell"></i></a>
            </li>
            <li class='xp'>0 xp</li>
            <li>
              <a href="" class="userImage" id="open-sideMenu" ><img src="https://placehold.co/400" alt="" /></a>
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
document.getElementById("logout-Btn").addEventListener("click", handelLogout);

///// SideMenu (open)/////////

document.getElementById("open-sideMenu").addEventListener("click", (e) => {
  e.preventDefault();
  sideNavMenu.style.width = "25rem";
  document.querySelector("body").style.marginRight = "25rem";
  document.querySelector("body").style.transition = "0.5s";
  sideNavLinks.forEach((link) => {
    link.style.opacity = "1";
    link.style.transition = "opacity 1s, color 0.3s";
  });
  document.querySelector("#sideNav a").style.opacity = "1";
});

////// SideMenu (close)////////

document.getElementById("close-sideMenu").addEventListener("click", (e) => {
  e.preventDefault();
  sideNavMenu.style.width = "0";
  document.querySelector("body").style.marginRight = "0";
  sideNavLinks.forEach((link) => {
    link.style.opacity = "0";
    link.style.transition = "opacity 0.5s";
  });
});
