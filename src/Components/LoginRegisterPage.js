/* In a template literal, the ` (backtick), \ (backslash), and $ (dollar sign) characters should be 
escaped using the escape character \ if they are to be included in their template value. 
By default, all escape sequences in a template literal are ignored.*/
import { getUserSessionData, setUserSessionData } from "../utils/session.js";
import { RedirectUrl } from "./Router.js";
import Navbar from "./Navbar.js";
import { API_URL } from "../utils/server.js";
import { setLayout } from "../utils/render.js";


/*let loginRegisterPage = `
  <div class="login_background">
    <form class="test">
      <h1>Login</h1>
      <label for="email"></label>
      <input class="form_control" id="email" type="text" name="email" placeholder="Email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,4})+\$"/>
      <label for="password"></label>
      <input class="form_control" id="password" type="password" name="password" placeholder="Password" required=""/>
      <button class="buttonLogin" idn="buttonLogin" type="submit">Login</button>
    </form>
  </div>
`;*/
/*
<form>
          <center><h1>Login</h1></center>
          <label for="email"></label>
          <input class="form_control" id="email" type="text" name="email" placeholder="Email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,4})+\$"/>
          <label for="password"></label>
          <input class="form_control" id="password" type="password" name="password" placeholder="Password" required=""/>
          <button class="buttonLogin" idn="buttonLogin" type="submit">Sign in</button>
        </form>
        */
let loginRegisterPage = `
  <div class="row">
    <div class="column">
      <div class="form_login">
        <form>
          <center><h1>Login</h1></center>
          <label for="email"></label>
          <input class="form_control" id="emailLogin" type="text" name="email" placeholder="Email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,4})+\$"/>
          <label for="password"></label>
          <input class="form_control" id="passwordLogin" type="password" name="password" placeholder="Password" required=""/>
          <p><input id="rememberme" type="checkbox" name="rememberme"/> Remember me</p>
          <p><button class="buttonLogin" id="buttonLogin" type="submit">Sign in</button></p>
        </form>
      </div>
    </div>
    <div class="column">
      <div class="form_register">
        <form>
          <center><h1>Register*</h1></center>
          <label for="username"></label>
          <input class="form_control" id="username" type="text" name="username" placeholder="username" required=""/>
          <label for="email"></label>
          <input class="form_control" id="emailRegister" type="text" name="email" placeholder="Email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,4})+\$"/>
          <label for="password"></label>
          <input class="form_control" id="passwordRegister" type="password" name="password" placeholder="Password" required=""/>
          <p></p>
          <p>*This website respect the General Data Protection Regulation (GDPR)</p>
          <button class="buttonRegister" id="buttonRegister type="submit">Register</button>
        </form>
      </div>  
    </div>
</div>`;

const LoginRegisterPage = () => {
  let page = document.querySelector(".page");
  page.innerHTML = loginRegisterPage;
  let loginForm = document.querySelector(".buttonLogin");
  let registerForm = document.querySelector(".buttonRegister");
  const user = getUserSessionData();
  if (user) {
    console.log("coucou");
    // re-render the navbar for the authenticated user
    Navbar();
    RedirectUrl("/game");
  } else {
    console.log("ah bah non");
    loginForm.addEventListener("submit", onLogin);
    registerForm.addEventListener("submit", onRegister);
  }
  page.innerHTML = loginRegisterPage;
};

const onLogin = (e) => {
  e.preventDefault();
  let email = document.getElementById("emailLogin");
  let password = document.getElementById("passwordLogin");

  let user = {
    email: document.getElementById("emailLogin").value,
    password: document.getElementById("passwordLogin").value,
  };

  fetch(API_URL + "users/loginRegister", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(user), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onUserLogin(data))
    .catch((err) => onError(err));
};

const onUserLogin = (userData) => {
  console.log("onUserLogin:", userData);
  const user = { ...userData, isAutenticated: true };
  setUserSessionData(user);
  // re-render the navbar for the authenticated user
  Navbar();
  RedirectUrl("/game");
};

const onRegister = (e) => {
  e.preventDefault();
  let user = {
    username: document.getElementById("username").value,
    email: document.getElementById("emailRegister").value,
    password: document.getElementById("passwordRegister").value,
  };

  fetch("/api/users/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(user), // body data type must match "Content-Type" header
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error code : " + response.status + " : " + response.statusText);
      return response.json();
    })
    .then((data) => onUserRegistration(data))
    .catch((err) => onError(err));
};

const onUserRegistration = (userData) => {
  console.log("onUserRegistration", userData);
  const user = {...userData, isAutenticated:true};
  setUserSessionData(user);
  // re-render the navbar for the authenticated user
  Navbar();
  RedirectUrl("/game");
};

const onError = (err) => {
  let messageBoard = document.querySelector("#messageBoard");
  let errorMessage = "";
  if (err.message.includes("401")) errorMessage = "Wrong username or password.";
  else errorMessage = err.message;
  messageBoard.innerText = errorMessage;
  // show the messageBoard div (add relevant Bootstrap class)
  messageBoard.classList.add("d-block");
};

export default LoginRegisterPage;
