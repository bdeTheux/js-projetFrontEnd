import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";
//import { setLayout } from "../utils/render.js";



let achievementsPage = ``;
const AchievementsPage = () => {
    let page = document.querySelector(".page");
    page.innerHTML = achievementsPage;
}

export default AchievementsPage;