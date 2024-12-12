const authContainer = document.getElementById("authContainer");

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

// Switch between login and register forms
document.getElementById("show-register").addEventListener('click', () => {
  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');

});

document.getElementById("show-login").addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
});

function login() {
  // HTTP Request
}

function register() {
  // HTTP Request
}

document.getElementById('login-form').addEventListener('submit', login);
document.getElementById('register-form').addEventListener('submit', register);
