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

export default AchievementsPage;