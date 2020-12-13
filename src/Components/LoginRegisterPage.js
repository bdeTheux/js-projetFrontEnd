"use strict"
import { getUserSessionData, setUserSessionData } from "../utils/session.js";
import { RedirectUrl, Router } from "./Router.js";
import Navbar from "./Navbar.js";
import { API_URL } from "../utils/server.js";
import { setLayout } from "../utils/render.js";

let loginRegisterPage = `
  <div class="row">
    <div class="column">
      <div class="form_login">
        <form id="formLogin">
          <center><h1>Login</h1></center>
          <div class="inputForm">
              <label for="email" class="form-label"></label>
              <input class="form-control" id="emailLogin" type="text" name="email" placeholder="Email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,4})+\$"/>
              <label for="password" class="form-label"></label>
              <input class="form-control" id="passwordLogin" type="password" name="password" placeholder="Password" required=""/>
            <div class="buttonDiv"><button class="buttonLogin btn btn-outline-success" type="submit">Sign in</button></div>
            </div>
        </form>
      </div>
    </div>
    <div class="column">
      <div class="form_register">
        <form id="formRegister">
          <center><h1>Register*</h1></center>
          <div class="inputForm">
          <label for="username" class="form-label"></label>
          <input class="form-control" id="username" type="text" name="username" placeholder="username" required=""/>
          
          <label for="email" class="form-label"></label>
          <input class="form-control" id="emailRegister" type="text" name="email" placeholder="Email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,4})+\$"/>
          
          <label for="password" class="form-label"></label>
          <input class="form-control" id="passwordRegister" type="password" name="password" placeholder="Password" required=""/>
          <br>
          <p>*This website respect the General Data Protection Regulation (GDPR)</p>
          <button class="buttonRegister btn btn-warning" id="buttonRegister type="submit">Register</button>
          </div>
        </form>
      </div>  
    </div>
    <div class="alert alert-danger mt 2 d-none" id="messageBoard"> </div><span id="errorMessage"> </span>
</div>`;

const LoginRegisterPage = () => {
  let page = document.querySelector(".page");
  page.innerHTML = loginRegisterPage;
  let loginForm = document.querySelector("#formLogin");
  let registerForm = document.querySelector("#formRegister");
  console.log(loginForm);
  console.log(registerForm);
  registerForm.addEventListener("submit", onRegister);
  const user = getUserSessionData();
  if (user) {
    // re-render the navbar for the authenticated user
    console.log("je suis connecté !");
    RedirectUrl("/game");
    Navbar(user);
  } else {
    loginForm.addEventListener("submit", onLogin);
    registerForm.addEventListener("submit", onRegister);
  }
};

const onRegister = (e) => {
  e.preventDefault();
  let user = {
    username: document.getElementById("username").value,
    email: document.getElementById("emailRegister").value,
    password: document.getElementById("passwordRegister").value,
  };

  fetch(API_URL + "users/", {
    method: "POST",
    body: JSON.stringify(user),
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
  const user = { ...userData, isAutenticated: true };
  setUserSessionData(user);
  Navbar();
  RedirectUrl("/game");
  Router();
};

const onLogin = (e) => {
  e.preventDefault();
  let email = document.getElementById("emailLogin");
  let password = document.getElementById("passwordLogin");

  let user = {
    email: document.getElementById("emailLogin").value,
    password: document.getElementById("passwordLogin").value,
  };

  fetch(API_URL + "users/login", {
    method: "POST",
    body: JSON.stringify(user),
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
  console.log("logé");
  console.log("onUserLogin:", userData);
  console.log(userData);
  const user = { ...userData, isAutenticated: true };
  setUserSessionData(user);
  Navbar();
  RedirectUrl("/game");
  Router();
};

const onError = (err) => {
  let messageBoard = document.querySelector("#messageBoard");
  let errorMessage = "";
  if (err.message.includes("401")) errorMessage = "Wrong username or password.";
  else errorMessage = err.message;
  messageBoard.innerText = errorMessage;
  messageBoard.classList.add("d-block");
  console.log(messageBoard);
};

export default LoginRegisterPage;