import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";



//import { setLayout } from "../utils/render.js";
let leaderboardPage = `<div class="container-fluid" id="panneau-leaderboard"></div>`;
const LeaderboardPage = () => {
  const user = getUserSessionData();
  if (!user) {
    RedirectUrl("/loginRegister", "Please login.");
  }else{
    let page = document.querySelector(".page");
    page.innerHTML = leaderboardPage;
  }
}

var element = document.getElementById("panneau-leaderboard");
//var t=setTimeout(openPage,1000);

/*function openPage() {
  element = document.getElementById("panneau-leaderboard");
  element.style.visibility = "visible";
  element.style.opacity = "1";
}*/

export default LeaderboardPage;