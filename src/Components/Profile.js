import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";
//import { setLayout } from "../utils/render.js";
let user;
let profilePage;


/*else{
    profilePage = `<div class="container-fluid panneau">
    <ul class="cadre-panneau-profile">
        <li class="username-profile"><b>Username:</b></li>
        <li class="last-connected"><b>Last connected at: </b></li>
        <li>
            <a href="/logout" data-uri="/logout" class="btn btn-danger logout-btn" role="button">Log-out</a>
        </li>
    </ul>
    </div>` 
};*/


const Profile = () => {
    //setLayout("About Us");
    user  = getUserSessionData(); 
    console.log(user);
    if (!user) {
        RedirectUrl("/loginRegister");
    }else{
        let page = document.querySelector(".page");
        profilePage =  `<div class="container-fluid panneau-profile">
        <ul class="cadre-panneau-profile">
            <li class="username-profile">Username: ${user.username}</li>
            <li class="last-connected">Last connected at: </li>
            <li>
                <a href="/logout" data-uri="/logout" class="btn btn-danger logout-btn" role="button">Log-out</a>
            </li>
        </ul>
        </div>`;
        page.innerHTML = profilePage;
    }
}



export default Profile;