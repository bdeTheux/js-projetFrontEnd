import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";
//import { setLayout } from "../utils/render.js";
let leaderboardPage = ``;
const LeaderboardPage = () => {
    let page = document.querySelector(".page");
    page.innerHTML = leaderboardPage;
}

export default LeaderboardPage;