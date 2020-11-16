import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";
import { setLayout } from "../utils/render.js";
let aboutUsPage = ``;
const AboutUsPage = () => {
    setLayout("About Us");
    let page = document.querySelector("#page");
    page.innerHTML = aboutUsPage;
}

export default AboutUsPage;