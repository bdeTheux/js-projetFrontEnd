//let Phaser = require("phaser");

import Phaser from "phaser";
import GameScene from "./GameScene.js";
import { RedirectUrl } from "../Router.js";
import { getUserSessionData } from "../../utils/session.js";
import 'bootstrap/dist/css/bootstrap.css';
import "../../assets/stylesheets/style.css";

import style from "../../assets/stylesheets/style.css"

let game;
/*
let width =  window.innerWidth*0.6;
let height = width*0.625;
*/

//configuration de la partie phaser
let config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [GameScene],
  //  parent DOM element into which the canvas created by the renderer will be injected.
  parent: "gameDiv",
};

//generation de la page accueillant le jeu
const PhaserGamePage = () => {
  const user  = getUserSessionData(); 
  console.log(getUserSessionData);
  if (!user) {
    return RedirectUrl("/loginRegister", "Please login.");
  } 

  let phaserGame = `<div id="gameDiv"></div>
  <button id="playAgain" type="button" class="btn btn-danger btn-lg btn-block">Play Again</button>`;

  let page = document.querySelector(".page");
  let navBar = document.querySelector(".navbar");
  page.innerHTML = phaserGame;
  //bouton de restart
  let playAgain = document.querySelector("#playAgain");
  playAgain.addEventListener("click", onPlayAgain);  

  if (game){
    location.reload();
  }
  game = new Phaser.Game(config);
};

//Pour le bouton restart
const onPlayAgain = () =>{
  location.reload();
}

export default PhaserGamePage;