const BASE_URL = "http://localhost:3000";
const API_BASE_URL = "http://localhost:3000/api";
const Menu = document.querySelector(".menu");
const sideNavMenu = document.getElementById("sideNav");
const sideNavLinks = document.querySelectorAll("#sideNav a");
const currentUser = await (async () => getCurrentUser())();

function renderNavbar() {
  if (currentUser) {
    Menu.innerHTML = ` 
            <li>
              <a><i class="fa-solid fa-bell"></i></a>
            </li>
            <li class='xp'>${currentUser.rank} XP</li>
            <li>
              <a href="/profile" class="userImage" id="open-sideMenu" >
              <img src="${currentUser.imgUrl}" />
              </a>
            </li>`;
  } else {
    Menu.innerHTML = `
            <li>
              <a href="/auth">Login</a>
            </li>
           `;
  }
}
renderNavbar();

async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE_URL}/me`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.log("Currently, no user is logged in.");
  }
}
async function handleLogout(event) {
  event.preventDefault();
  await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    if (response.ok) {
      console.log("Cookie cleared");
    }
  }); // Redirect to homepage
  window.location.href = "/";
  // Re-render the navbar to reflect the updated state
  // renderNavbar();
}
document.getElementById("logout-Btn").addEventListener("click", handleLogout);

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
