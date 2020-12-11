import HomePage from "./HomePage.js";
import LoginRegisterPage from "./LoginRegisterPage.js";
import AboutUsPage from "./AboutUsPage.js";
import LogoutComponent from "./LogoutComponent.js";
import ErrorPage from "./ErrorPage.js";
import PhaserGamePage from "./phaser/PhaserGamePage.js";
import Profile from "./Profile.js";
import AchievementsPage from "./AchievementsPage.js";
import LeaderboardPage from "./LeaderboardPage.js";

const routes = {
  "/": HomePage,
  "/loginRegister": LoginRegisterPage,
  "/logout": LogoutComponent,
  "/error": ErrorPage,
  "/game": PhaserGamePage,
  "/aboutus" : AboutUsPage,
  "/profile" : Profile,
  "/achievements" : AchievementsPage,
  "/leaderboard" : LeaderboardPage
};

let page = document.querySelector(".page");
let navBar = document.querySelector(".navbar");
let links = document.getElementsByClassName('nav-link')
let menu = navBar.querySelector("#menu");
let componentToRender;

const Router = () => {
  window.addEventListener("load", (e) => {
    console.log("onload page:", [window.location.pathname]);
    componentToRender = routes[window.location.pathname];
    if (!componentToRender)
      return ErrorPage(
        new Error("The " + window.location.pathname + " ressource does not exist.")
      );
    componentToRender();
  });

  //redirection
  const onNavigate = (e) => {
    let uri;
    if (e.target.tagName === "A") {
      e.preventDefault();
      uri = e.target.dataset.uri;
    } else  if (e.target.tagName === "SPAN") {
      uri = e.target.parentElement.dataset.uri
    }
    if (uri) {     
      window.history.pushState({}, uri, window.location.origin + uri);
      componentToRender = routes[uri];
      if (routes[uri]) {
        
        componentToRender();
      } else {
        ErrorPage(new Error("The " + uri + " ressource does not exist"));
      }
    }
  };
  Array.from(links).forEach((e) => e.addEventListener('click', onNavigate))
  menu.addEventListener("click", onNavigate);
  window.addEventListener("popstate", () => {
    componentToRender = routes[window.location.pathname];
    componentToRender();
  });
};

const RedirectUrl = (uri, data) => {
  window.history.pushState({}, uri, window.location.origin + uri);
  componentToRender = routes[uri];
  if (routes[uri]) {
    if(!data)
      componentToRender();
    else
      componentToRender(data);
    
  } else {
    ErrorPage(new Error("The " + uri + " ressource does not exist"));
  }
};

export { Router, RedirectUrl };
