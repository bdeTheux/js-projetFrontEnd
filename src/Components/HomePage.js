//import PhaserGame from "./PhaserGamePage.js";

import Navbar from "./Navbar";

//import { setLayout } from "../utils/render.js";
let homePage = `
<div class="buttonPlay">
  <button id="buttonPlay" type="button" class="btn btn-danger btn-lg btn-block">Play</button>
</div>`;
console.log(Navbar);
const HomePage = () => {

  let page = document.querySelector(".page");
  let navBar = document.querySelector(".navbar");

  
  page.innerHTML = homePage;
};



export default HomePage;
