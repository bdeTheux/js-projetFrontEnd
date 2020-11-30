import { RedirectUrl } from "./Router.js";
import { getUserSessionData } from "../utils/session.js";
import { API_URL } from "../utils/server.js";
//import { setLayout } from "../utils/render.js";
let user = getUserSessionData(); 
let profilePage;   
  if (user) {
profilePage = `<div class="container-fluid panneau-profile">
<ul class="cadre-panneau-profile">
    <li class="username-profile">Username: ${user.username}</li>
    <li class="last-connected">Last connected at: </li>
    <li>
        <a href="/logout" data-uri="/logout" class="btn btn-danger logout-btn" role="button">Log-out</a>
    </li>
</ul>
</div>`
}else{
    profilePage = `<div class="container-fluid panneau">
    <ul class="cadre-panneau-profile">
        <li class="username-profile">Username: </li>
        <li class="last-connected">Last connected at: </li>
        <li>
            <a href="/logout" data-uri="/logout" class="btn btn-danger logout-btn" role="button">Log-out</a>
        </li>
    </ul>
    </div>` 
};
const Profile = () => {
    //setLayout("About Us");
    let page = document.querySelector(".page");
    page.innerHTML = profilePage;
}

export default Profile;