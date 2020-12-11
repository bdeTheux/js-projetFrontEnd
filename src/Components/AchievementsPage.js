import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";
//import { achievementsVictory } from "../../../js-projetBackEnd/model/Achievement.js";
//import { setLayout } from "../utils/render.js";

const ACHIEVEMENT_TYPE = ['Victory', 'Defeat', 'Game', 'Time'];
let page = document.querySelector(".page");
let displayed = false;
let achievementsPage;

const AchievementsPage = () => {
  achievementsPage = `<div class="cards-container">`;

  const user = getUserSessionData();
  if (!user) {
    RedirectUrl("/loginRegister", "Please login.");
  } else {

    let scoreVictory;
    let scoreDefeat;
    let scoreGame;

    fetch(API_URL + 'users/getVictories/', { headers: { "Authorization": user.token } })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("score victoire: " + data.score);
        fetch(API_URL + 'achievements/victory/')
          .then(function (response) {
            return response.json()
          })
          .then(function (data2) {
            scoreVictory = data.score;
            showAchievements(data2, 0, scoreVictory);
            fetch(API_URL + 'users/getDefeats/', { headers: { "Authorization": user.token } })
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log("score defeat: " + data.score);
                fetch(API_URL + 'achievements/defeat/')
                  .then(function (response) {
                    return response.json()
                  })
                  .then(function (data2) {
                    scoreDefeat = data.score;
                    showAchievements(data2, 1, scoreDefeat);

                    fetch(API_URL + 'users/getGameScore/', { headers: { "Authorization": user.token } })
                      .then(function (response) {
                        return response.json();
                      })
                      .then(function (data) {
                        console.log("score game: " + data.score);
                        fetch(API_URL + 'achievements/game/')
                          .then(function (response) {
                            return response.json()
                          })
                          .then(function (data2) {
                            scoreGame = data.score;
                            showAchievements(data2, 2, scoreGame);
                            achievementsPage += '</div>';
                            page.innerHTML = achievementsPage;
                            console.log("achievements displayed")
                          })
                      })


                  })
              })

          })
      })




  } // else
  

}




const achievementVictory = () => {
  fetch(API_URL + 'achievements/victory/')
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      showAchievements(data, 0);
    })
}

const achievementDefeat = () => {
  fetch(API_URL + 'achievements/defeat/')
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      showAchievements(data, 1);
    })
}

const achievementGame = () => {
  fetch(API_URL + 'achievements/game/')
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      //console.log(data)

      showAchievements(data, 2);
    })
}

/*
const achievementTime = () => {
    fetch(API_URL + 'achievements/time/')
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        //console.log(data)
        showAchievements(data, 3);
    })
}
*/

const victoryScore = () => {
  let user = getUserSessionData();
  fetch(API_URL + 'users/getVictories/', { headers: { "Authorization": user.token } })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    })
}

const showAchievements = (data, typeID, score) => {
  let achievementContent = `<section class="card-list" id="${ACHIEVEMENT_TYPE[typeID]}">
    <div class="category"> <p class="text-category category-font">${ACHIEVEMENT_TYPE[typeID]}</p> </div>`;
  if (data.length === 0) {
    achievementContent += ``;
  } else {
    achievementContent += data
      .map((achievements) => `<article class="card ${(score >= achievements.condition)}">
            <header class="card-header">
              <h2 class="achievements-font">${achievements.description}</h2>
            </header>
      
            <div class="card-badge">
              <a class="badge-avatar" href="#">
                <svg id="d7a4cbc2-ead4-4a07-8689-5a915b6ae1ca" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 720 720">
                  <path
                    d="M482.13,546.12a152.36,152.36,0,0,1-58.32,30.48h0a182.19,182.19,0,0,1-50.75,6.58,179.59,179.59,0,0,1-56.2-10.08,160.77,160.77,0,0,1-28.53-13,151.58,151.58,0,0,1-30.72-23c-59.41-57.46-50.36-142-47.66-167.86C219.1,283.7,277.47,165.76,361.79,156a97.55,97.55,0,0,1,11.26-.65c90.29.06,153.48,124.43,163.1,213.92C538.61,392.41,549.05,489.29,482.13,546.12Z"
                    fill="#fff" />
                  <path
                    d="M416.19,317.58c0-29.5-14.44-46.34-42.63-46.34s-42.62,16.84-42.62,46.34v18.17h27.32v-20c0-13.18,5.27-18.16,14.5-18.16s14.49,5,14.49,18.16c0,17.59-3.66,29.74-16.61,48.13-11.29,16.1-14.95,26.86-14.95,41.59a35.24,35.24,0,0,0,1.54,11.34H383a47.86,47.86,0,0,1-1-10.25c0-11.86,3.44-20.8,14.73-36.1C410.92,351.5,416.19,337.29,416.19,317.58ZM355.91,429.71V457.6h27.91V429.71Z" />
                  <path
                    d="M470.2,220.75a43.29,43.29,0,0,0-14.93,38.14,43.29,43.29,0,0,0-36.44-15.1,43.28,43.28,0,0,0,11.65-40,43.23,43.23,0,0,0,39.72,16.93Z"
                    fill="#fbb040" />
                  <path
                    d="M311.94,319.26A43.26,43.26,0,0,0,297,357.4a43.21,43.21,0,0,0-36.44-15.1,43.21,43.21,0,0,0,11.65-40,43.26,43.26,0,0,0,39.73,16.93Z"
                    fill="#fbb040" />
                  <path
                    d="M460.89,484.69A43.29,43.29,0,0,0,446,522.83a43.26,43.26,0,0,0-36.44-15.11,43.27,43.27,0,0,0,11.65-40,43.23,43.23,0,0,0,39.72,16.93Z"
                    fill="#fbb040" />
                  <path
                    d="M330.94,549.84A42.6,42.6,0,0,0,318.68,567a33,33,0,0,0-1.84,6.07,162.14,162.14,0,0,1-28.53-13c.35-.69.63-1.38.92-2.06a42.71,42.71,0,0,0,1.95-25.1,43.12,43.12,0,0,0,39.76,16.9Z"
                    fill="#fbb040" />
                  <path
                    d="M482.13,546.12a152.36,152.36,0,0,1-58.32,30.48h0A573,573,0,0,0,435.65,514c1.34-10.2,2.47-21,3.31-32.38a553.9,553.9,0,0,0-10.57-156.35A555.58,555.58,0,0,0,361.79,156a97.55,97.55,0,0,1,11.26-.65c90.29.06,153.48,124.43,163.1,213.92C538.61,392.41,549.05,489.29,482.13,546.12Z"
                    opacity="0.1" />
                </svg>
              </a>
      
              <div class="badge-name">
                <div class="badge-name-prefix achievements-font">${achievements.title}</div>
              </div>
            </div>
          </article>`)
      .join("");
  }
  achievementContent += '</section>';
  achievementsPage += achievementContent;
}

/*
const achievements = () => {
    console.log('achievements');
 
    fetch(API_URL + "achievements", {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                let fullErrorMessage =
                    " Error code : " +
                    response.status +
                    " : " +
                    response.statusText +
                    "/nMessage : ";
                return response.text().then((errorMessage) => {
                    fullErrorMessage += errorMessage;
                    return fullErrorMessage;
                });
            }
            return response.json();
        })
        .then((data) => {
            if (typeof data === "string") onError(data);
            else onShowAchievements(data);
        })
        .catch((err) => onError(err));
};
 
 
 
 
 
const onError = (err) => {
    console.error("AchievementsPage::onError:", err);
    let errorMessage;
    if (err.message) {
        errorMessage = err.message;
    } else errorMessage = err;
    RedirectUrl("/error", errorMessage);
};
*/



export default AchievementsPage;