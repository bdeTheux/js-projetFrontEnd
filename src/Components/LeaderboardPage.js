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
    //on va chercher les victoires
    fetch(API_URL + 'users/getVictories/', {headers : {"Authorization" : user.token}})
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      victories =  data.score;
      return data.score;
    });
    //on va chercher les défaites
    fetch(API_URL + 'users/getDefeats/', {headers : {"Authorization" : user.token}})
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      defeats = data.score;
      //on calcule le nombres de parties jouées
      nbrGames = victories+defeats;
      let page = document.querySelector(".page");
      leaderboardPage =  `
        <div class="container-fluid panneau-leaderboard">
          <ul class="cadre-panneau-leaderboard">
            <li class="lobster-font">Number of victories : <span id="victories" class="dm-font"></span></li>
            <li class="lobster-font">Number of defeats : <span id="defeats" class="dm-font"></span></li>
            <li class="lobster-font">Number of games : <span id="nbrGames" class="dm-font"></span></li>
          </ul>
      </div>`;
      
      page.innerHTML = leaderboardPage;
      let champVictories = page.querySelector("#victories");
      let champDefeats = page.querySelector("#defeats");
      let champNbrGames = page.querySelector("#nbrGames");
      champVictories.innerText = victories
      champDefeats.innerText = defeats;
      champNbrGames.innerText = nbrGames;
    });
    
  }
}







export default LeaderboardPage;