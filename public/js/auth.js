// End points
const BASE_URL = "http://localhost:3000"; // for pages
const API_BASE_URL = "http://localhost:3000/api"; // for Api
// select authContainer
const authContainer = document.getElementById("authContainer");

// select registerForm and loginForm
const registerView = document.getElementById("register-view");
const loginView = document.getElementById("login-view");

// Switch between login and register forms
document.getElementById("show-register").addEventListener("click", () => {
  registerView.classList.remove("hidden");
  loginView.classList.add("hidden");
});

document.getElementById("show-login").addEventListener("click", () => {
  loginView.classList.remove("hidden");
  registerView.classList.add("hidden");
});

// HTTP Request
/// HTTP Request for login
function login(e) {
  e.preventDefault();
  const email = document.getElementById("login-email-username").value;
  const password = document.getElementById("login-password").value;

  if (!isValidEmail(email) && !isValidateUsername(email)) {
    return alert("Invalid email or username.");
  }
  //  Password validation
  if (password.length < 8) {
    return alert("Invalid password");
  }
  const userData = { email, password };

  fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token); // save the token in localStorage
      window.location.href = "/challenges";
    })
    .catch((e) => console.log(e));
}

// Email validation check regex pattern
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email); // true or false
}
// Username validation regex pattern
function isValidateUsername(username) {
  const usernamePattern = /^[a-zA-Z0-9_]{3,16}$/;
  return usernamePattern.test(username); // true or false
}
/// HTTP Request for register
function register(e) {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById(
    "signup-confirm-password"
  ).value;

  if (!name || !password || !email || !username) {
    return alert("Missing requireed fields");
  }

  if (password !== confirmPassword) {
    return alert("passwords do not match");
  }
  if (password.length < 8) {
    return alert("password must not be less than 8 characters");
  }
  if (!isValidEmail(email)) {
    return alert("Invalid email");
  }
  if (!isValidateUsername(username)) {
    return alert("Invalid username");
  }
  if (!document.getElementById("terms").checked) {
    return alert("You must agree to the Terms & Conditions.");
  }
  const userData = { name, username, email, password };

  fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    
    body: JSON.stringify(userData),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}

document.getElementById("login-form").addEventListener("submit", login);
document.getElementById("register-form").addEventListener("submit", register);


const token = localStorage.getItem('token');
   // "Authorization": `Bearer ${token}`
  if(token){
    // Send the request on the protected resource
  }