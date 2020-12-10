import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";

let user;
let leaderboardPage;
let victories;
let defeats;
let nbrGames;

const LeaderboardPage = () => {
  user = getUserSessionData();
  
  if (!user) {
    RedirectUrl("/loginRegister", "Please login.");
  }else{
    fetch(API_URL + 'users/getVictories/', {headers : {"Authorization" : user.token}})
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(victories);
      victories =  data.score;
      console.log(victories);
      return data.score;
    });
    fetch(API_URL + 'users/getDefeats/', {headers : {"Authorization" : user.token}})
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      defeats = data.score;
    });
    nbrGames = victories+defeats;
    let page = document.querySelector(".page");
    leaderboardPage =  `
    <div class="container-fluid panneau-leaderboard">
      <ul class="cadre-panneau-leaderboard">
        <li>Number of victories : <div id="victories"></div></li>
        <li>Number of defeats : <div id="defeats"></div></li>
        <li>Number of games : <div id="nbrGames"></div></li>
      </ul>
    </div>`;
    
    page.innerHTML = leaderboardPage;
    let champVictories = page.querySelector("#victories");
    let champDefeats = page.querySelector("#defeats");
    let champNbrGames = page.querySelector("#nbrGames");
    champVictories.innerText = victories
    champDefeats.innerText = defeats;
    champNbrGames.innerText = nbrGames;
  }
}







export default LeaderboardPage;