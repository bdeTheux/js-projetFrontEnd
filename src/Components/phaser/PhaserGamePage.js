//let Phaser = require("phaser");

import Phaser from "phaser";
import GameScene from "./GameScene.js";
import { RedirectUrl } from "../Router.js";
import { getUserSessionData } from "../../utils/session.js";
import 'bootstrap/dist/css/bootstrap.css';
import "../../assets/stylesheets/style.css";

import style from "../../assets/stylesheets/style.css"
import { setLayout } from "../../utils/render.js";

let game;
let config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [GameScene],
  //  parent DOM element into which the canvas created by the renderer will be injected.
  parent: "gameDiv",
};


const PhaserGamePage = () => {
 // servira a afficher les coeurs
  //setLayout("Making your first Phaser 3 game");
  /*const user = getUserSessionData();
  if (!user) RedirectUrl("/error", "Resource not authorized. Please login or register.");*/
  const user  = getUserSessionData(); 
  console.log(getUserSessionData);

  if (!user) {
    return RedirectUrl("/loginRegister", "Please login.");
  } 

  let phaserGame = `<div id="gameDiv">
  
  </div>
  <button id="playAgain" type="button" class="btn btn-danger btn-lg btn-block">Play Again</button>`;
  //permet de changer de page
  let page = document.querySelector(".page");
  page.innerHTML = phaserGame;
  let playAgain = document.querySelector("#playAgain");
  playAgain.addEventListener("click", onPlayAgain);
  

  // there could be issues when a game was quit (events no longer working)
  // therefore destroy any started game prior to recreate it
  if(game)
    game.destroy(true);
  game = new Phaser.Game(config);
    
};

const onPlayAgain = () =>{
  game.destroy(true);
  game = new Phaser.Game(config);
}

export default PhaserGamePage;
