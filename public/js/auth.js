const auth = document.getElementById("auth");
const logIn = () => {
  auth.innerHTML = `<section id="log-in" class="log-in">
    <h1>Log <span>in</span></h1>
      <form action="" class="flex col">
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <p>
          Don't have an account ? <a id="signup-btn" >Sign up</a> <br />
          <span>Forget your password ?</span>
        </p>
        <a class="btn">Continue</a>
      </form>
      </section>`;
  const signupBtn = document.getElementById("signup-btn");
  signupBtn.addEventListener("click", signUp);
};
const signUp = () => {
  auth.innerHTML = `<section id="sign-up" class="sign-up"><h1>Sign <span>up</span></h1>
    <form action="" class="flex col">
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="User name" />
      <input type="text" placeholder="Email" />
      <input type="text" placeholder="Password" />
      <input type="text" placeholder="Repeat the password" />
      <div class="check">
        <input type="checkbox" name="" id="" />
        <label for="">
          I agree to the <span>Terms&conditions</span> and
          <span>Privacy Policy</span>
        </label>
      </div>

      <a class="btn">Create account</a>
      <a class="btn" id="login-btn"> Log In</a>
    </form>
</section>`;
  const loginBtn = document.getElementById("login-btn");

  loginBtn.addEventListener("click", logIn);
};

signUp();
