let navBar = document.querySelector(".navbar");

let menu;
import { getUserSessionData } from "../utils/session.js";
// destructuring assignment
const Navbar = () => {
  let navbar;
  let user = getUserSessionData();

  navbar = `
    <nav class="navbar">
      <ul class="navbar-nav menu">
        <li class="nav-menu menu" id="menu">
          <a href="#" class="nav-link">
            <svg id="6c358107-d60f-48a4-b04e-f6537f9a0496" class="navbar-icon" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 720 720">
              <title>icons</title>
              <path
                d="M606.68,437.36c-17.54,97.8-122,210.41-261.34,210.35-142.45-.06-242-117.83-261.33-210.35-1.12-5.38-1.85-10.05-2.33-13.71a536.27,536.27,0,0,1,51.24-312.58A349.35,349.35,0,0,1,205.59,160a350.16,350.16,0,0,1,65,75.8,322.22,322.22,0,0,1,74.73-8.72,317.48,317.48,0,0,1,69.21,7.49A348.26,348.26,0,0,1,551.39,111.07,607.8,607.8,0,0,1,601.7,270.39a606.19,606.19,0,0,1,7.77,130.9A182.17,182.17,0,0,1,606.68,437.36Z" />
              <path
                d="M375.73,505.25a94.45,94.45,0,0,0-30,35.52,3.06,3.06,0,0,1-2.32,1.14,3,3,0,0,1-2.31-1.14,176.48,176.48,0,0,0-30-35.52,5.1,5.1,0,0,1-.87-3.63,3.72,3.72,0,0,1,2.14-2.79,81.27,81.27,0,0,1,62.08,0C376.76,499.77,377.45,503.21,375.73,505.25Z" />
              <path
                d="M303.34,472.16c-5.7,6-27.47,27.46-61.07,29.4-35.33,2.05-69.77-18.34-88.55-52.09a82.94,82.94,0,0,1-.39-36.4l89.6-56.37a86.17,86.17,0,0,1,26.83,14.44C312.83,405.52,304,468.17,303.34,472.16Z" />
              <path
                d="M532.54,454.07c-18.75,33.74-53.22,54.13-88.54,52.11-33.61-1.94-55.38-23.4-61.05-29.4-.64-4-9.52-66.64,33.55-101a88,88,0,0,1,32.17-16.07l82.77,52.08A82.82,82.82,0,0,1,532.54,454.07Z" />
              <ellipse cx="238.92" cy="441.36" rx="24.75" ry="36.34" />
              <ellipse cx="441.71" cy="449.66" rx="24.75" ry="36.34" />
            </svg>
            <span class="menu-text">Menu</span>
          </a>
        </li>
      </ul>

      <ul class="navbar-nav menu-content">

        <li class="nav-item right" id="profil">
          <a href="#" data-uri="/profil"  class="nav-link paw">
            <svg id="c71ce21f-ad7d-40b3-961f-916b686d1540" class="navbar-icon right-feet chick-feet"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
              <path
                d="M434,106.36a26.69,26.69,0,0,1,29.82-7.16,24.85,24.85,0,0,1,15.6,26.48L408.87,299.25l175.19-32c11.27,1.05,20.71,8.42,23.72,18.41,3.45,11.48-2.22,24.29-13.84,30.29L381.5,378.6,244.76,619.2c-7.6,8.46-19.6,11.61-29.8,8a26.34,26.34,0,0,1-16.54-30.64L298.45,339l-114-188.18c-3.18-10.52-.1-21.64,7.79-28.1,10.23-8.37,27.1-7.77,38.22,2.73Q286,199.31,341.65,273.18Z" />
            </svg>
            <span class="link-text">Profile</span>
          </a>
        </li>

        <li class="nav-item left" id="leaderboards">
          <a href="#" data-uri="/leaderboards" class="nav-link paw">
            <svg id="c71ce21f-ad7d-40b3-961f-916b686d1540" class="navbar-icon left-feet chick-feet"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
              <path
                d="M434,106.36a26.69,26.69,0,0,1,29.82-7.16,24.85,24.85,0,0,1,15.6,26.48L408.87,299.25l175.19-32c11.27,1.05,20.71,8.42,23.72,18.41,3.45,11.48-2.22,24.29-13.84,30.29L381.5,378.6,244.76,619.2c-7.6,8.46-19.6,11.61-29.8,8a26.34,26.34,0,0,1-16.54-30.64L298.45,339l-114-188.18c-3.18-10.52-.1-21.64,7.79-28.1,10.23-8.37,27.1-7.77,38.22,2.73Q286,199.31,341.65,273.18Z" />
            </svg>
            <span class="link-text">Leaderboards</span>
          </a>
        </li>

        <li class="nav-item right" id="achievements">
          <a href="#" data-uri="/achievements" class="nav-link paw">
            <svg id="c71ce21f-ad7d-40b3-961f-916b686d1540" class="navbar-icon right-feet chick-feet"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
              <path
                d="M434,106.36a26.69,26.69,0,0,1,29.82-7.16,24.85,24.85,0,0,1,15.6,26.48L408.87,299.25l175.19-32c11.27,1.05,20.71,8.42,23.72,18.41,3.45,11.48-2.22,24.29-13.84,30.29L381.5,378.6,244.76,619.2c-7.6,8.46-19.6,11.61-29.8,8a26.34,26.34,0,0,1-16.54-30.64L298.45,339l-114-188.18c-3.18-10.52-.1-21.64,7.79-28.1,10.23-8.37,27.1-7.77,38.22,2.73Q286,199.31,341.65,273.18Z" />
            </svg>
            <span class="link-text">Achievements</span>
          </a>
        </li>

        <li class="nav-item left" id="about-us">
          <a href="#" data-uri="/aboutus" class="nav-link paw">
            <svg id="c71ce21f-ad7d-40b3-961f-916b686d1540" class="navbar-icon left-feet chick-feet"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
              <path
                d="M434,106.36a26.69,26.69,0,0,1,29.82-7.16,24.85,24.85,0,0,1,15.6,26.48L408.87,299.25l175.19-32c11.27,1.05,20.71,8.42,23.72,18.41,3.45,11.48-2.22,24.29-13.84,30.29L381.5,378.6,244.76,619.2c-7.6,8.46-19.6,11.61-29.8,8a26.34,26.34,0,0,1-16.54-30.64L298.45,339l-114-188.18c-3.18-10.52-.1-21.64,7.79-28.1,10.23-8.37,27.1-7.77,38.22,2.73Q286,199.31,341.65,273.18Z" />
            </svg>
            <span class="link-text">About Us</span>
          </a>
        </li>

      </ul>
  </nav>
  `
  navBar.innerHTML = navbar;
  menu = document.querySelector("#menu");
  menu.addEventListener("click", () => { console.log("click sur menu") });
  menu.addEventListener("click", onclick);

};

let navbarItems = document.getElementsByClassName("nav-item")
let navbarOn = false;

function fadeIn(id) {
  let div = document.getElementById(id).style;// récupère div
  let i = 0;// initialise i
  let f = function ()// attribut à f une fonction anonyme
  {
    div.opacity = i;// attribut à l'opacité du div la valeur d'i
    i = i + 0.02;// l'incrémente

    if (i <= 1)// si c'est toujours pas égal à 1
    {
      setTimeout(f, 20);// attend 20 ms, et relance la fonction
    }
  };

  f();// l'appel une première fois pour lancer la boucle
}

function fadeOut(id) {
  var div = document.getElementById(id).style;// récupère div
  let i = 1;
  var f = function ()// attribut à f une fonction anonyme
  {
    div.opacity = i;// attribut à l'opacité du div la valeur d'i
    i = i - 0.03;// l'incrémente

    if (i >= 0)// si c'est toujours pas égal à 1
    {
      setTimeout(f, 10);// attend 20 ms, et relance la fonction
    }
  };

  f();// l'appel une première fois pour lancer la boucle
}



function onclick() {
  if (navbarOn) {

    fadeOut('about-us');
    setTimeout(function () { fadeOut('achievements'); }, 400);
    setTimeout(function () { fadeOut('leaderboards'); }, 800);
    setTimeout(function () { fadeOut('profil'); }, 1200);
    navbarOn = false;
  }
  else {
    fadeIn('profil');
    setTimeout(function () { fadeIn('leaderboards'); }, 400);
    setTimeout(function () { fadeIn('achievements'); }, 800);
    setTimeout(function () { fadeIn('about-us'); }, 1200);

    navbarOn = true;
  }
};

export default Navbar;

