import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";
//import { setLayout } from "../utils/render.js";


let achievementsPage = `<section class="card-list"></section>`;
const AchievementsPage = () => {
  const user = getUserSessionData();
    if (!user) {
        RedirectUrl("/loginRegister", "Please login.");
      }else{
    let page = document.querySelector(".page");
    page.innerHTML = achievementsPage;
    }
}

fetch(API_URL + 'achievements')
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })

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

const onShowAchievements = (data) => {
    let scoreText = `<ul class="list-group list-group-lg">`;
    if(data.length === 0){
        scoreText += `<li class="list-group-item">Il n'y a pas encore de résultat pour cette catégorie</li>`;
    }else {
        scoreText += data
            .map((leaderboard) => `<li class="list-group-item">${leaderboard.username} : ${scoreToTime(leaderboard.score)}</li>`)
            .join("");
    }
    scoreText += "</ul>";
    return (page.innerHTML = scoreText);
}



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