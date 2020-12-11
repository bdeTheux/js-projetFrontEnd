import { getUserSessionData, setUserSessionData } from "../utils/session.js";
import Navbar from "./Navbar";
import { RedirectUrl } from "./Router";
let homePage = `
<div class="container-fluid blurred-game">
</div>
<div class="buttonPlay">
  <button id="buttonPlay" type="button" class="btn btn-danger btn-lg btn-block">Play</button>

</div>`;

const HomePage = () => {
  let page = document.querySelector(".page");
  let navBar = document.querySelector(".navbar");
  page.innerHTML = homePage;
  let play = document.querySelector("#buttonPlay");
  console.log(play);
  play.addEventListener("click", onPlay);
 
};

//Bouton de redirection vers /game
const onPlay = () =>{
    const user = getUserSessionData();
    console.log(user);
    if (user){
        RedirectUrl("/game");
    }else{
        RedirectUrl("/loginRegister");
    }
}
export default HomePage;
