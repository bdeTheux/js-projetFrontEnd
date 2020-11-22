//import PhaserGame from "./PhaserGamePage.js";

import Navbar from "./Navbar";

//import { setLayout } from "../utils/render.js";
let homePage = "<h1></h1>";
console.log(Navbar);
const HomePage = () => {

  let page = document.querySelector(".page");
  let navBar = document.querySelector(".navbar");

  console.log(page);
  page.innerHTML = homePage;
};



export default HomePage;
