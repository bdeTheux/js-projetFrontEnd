//import PhaserGame from "./PhaserGamePage.js";
import { setLayout } from "../utils/render.js";
let homePage = "<h1>coucou</h1>";

const HomePage = () => {
  let page = document.querySelector(".page");
  console.log(page);
  page.innerHTML = homePage;
};



export default HomePage;
