import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";

let aboutUsPage = `<div class="container-fluid panneau-aboutus">
  <ul class="cadre-panneau-aboutus">
    <li>Alessio, Samy, Boris and Nina are a team of 4 computer science students at the Paul Lambin Institute. Eager to provide entertaining, addictive and fun content, they worked hard to develop ChickyPaw. Their motivation comes from a desire to perform and be the best at what they do. Do you have an idea for a concept and need developers to make it a reality? Contact them at one of these email addresses and they will not hesitate to help you:</li>
    <li>- alessio.ditomasso@student.vinci.be </li>
    <li>- samy.alliche@student.vinci.be</li>
    <li>- boris.detheux@student.vinci.be</li>     
    <li>- nina.heuzer@student.vinci.be</li>
  </ul>
  </div>`;

const AboutUsPage = () => {
    let page = document.querySelector(".page");
    page.innerHTML = aboutUsPage;
}

export default AboutUsPage;