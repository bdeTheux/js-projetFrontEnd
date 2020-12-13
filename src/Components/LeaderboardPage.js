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
          <table class="table table-borderless table-responsive cadre-panneau-leaderboard">
            <tr>
              <th class="lobster-font">Number of victories </th>
              <th><span id="victories" class="badge bg-success score"></span></th>
            </tr>
            <tr>
              <th class="lobster-font">Number of defeats </th>
              <th><span id="defeats" class="badge bg-danger score"></span></th>
            </tr>
            <tr>
              <th class="lobster-font">Number of games </th>
              <th><span id="nbrGames" class="badge bg-dark score"></span></th>
            </tr>
          </table>
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