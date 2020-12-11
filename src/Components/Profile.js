import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";

let user;
let profilePage;

const Profile = () => {
    user  = getUserSessionData(); 
   /*Si l'utilisateur n'est pas connecté alors il est redirigé vers la page de login 
   *sinon on affiche son username et bientôt sa dernière connexion
   */
    if (!user) {
        RedirectUrl("/loginRegister");
    }else{
        let page = document.querySelector(".page");
        profilePage =  `<div class="container-fluid panneau-profile">
        <ul class="cadre-panneau-profile">
            <li class="username-profile">Username: ${user.username}</li>
            <li>
                <a href="/logout" data-uri="/logout" class="btn btn-danger logout-btn" role="button">Log-out</a>
            </li>
        </ul>
        </div>`;
        page.innerHTML = profilePage;
    }
}

export default Profile;