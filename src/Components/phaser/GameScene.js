import Phaser from "phaser";

//creation d'une constente pour pouvoir maintenir plus facilement le code
const POULET = "poulet";
const CHAT = "chat";


/*import ScoreLabel from "./ScoreLabel.js";
import EggSpawner from "./EggSpawner.js";
*/

class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.player2 = undefined;

    this.cursors = undefined;
    /*
    this.j2Droite = undefined;
    this.j2Gauche = undefined;
    this.j2Haut = undefined;
    this.j2Bas = undefined;
    */

   
  }

  preload() {
    this.load.image("sky", "../../assets/sky.png");
    
    this.load.image(POULET, "../../assets/chicken_hunter.png");
    this.load.image(CHAT, "../../assets/cat_run.png");
  }

  create() {
    this.add.image(400, 300, "sky");
    this.player = this.createPlayer();
    this.player2 = this.createPlayer2();

   //deplacement du joueur1
    this.cursors = this.input.keyboard.createCursorKeys();
    //deplacement du joueur2
    this.j2Haut = this.input.keyboard.addKey('Z');
    this.j2Bas = this.input.keyboard.addKey('S');
    this.j2Gauche = this.input.keyboard.addKey('Q');
    this.j2Droite = this.input.keyboard.addKey('D');

    /*The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision...*/
  }

  update() {
  
    this.deplacementJ1();
    this.deplacementJ2();
  }

  //1 fonction pour crée 2 joueur, boolean ? Deadlock?
  createPlayer() {
    const player = this.physics.add.sprite(100, 450, POULET);
    
    player.setScale(0.02);
    player.setCollideWorldBounds(true);
    return player;
  }
  createPlayer2() {
    const player2 = this.physics.add.sprite(100, 450, CHAT);
    
    player2.setScale(0.02);
    player2.setCollideWorldBounds(true);
    return player2;
  }
  //
  deplacementJ1(){
    this.player.setVelocity(0);
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    }
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    }
    if(this.cursors.up.isDown) {
      this.player.setVelocityY(-200);
    }
    if (this.cursors.down.isDown ) {
      this.player.setVelocityY(200);
    }
  }

  deplacementJ2(){
    this.player2.setVelocity(0);
    if (this.j2Gauche.isDown) {
      this.player2.setVelocityX(-200);
    }
    if (this.j2Droite.isDown) {
      this.player2.setVelocityX(200);
    }
    if(this.j2Haut.isDown) {
      this.player2.setVelocityY(-200);
    }
    if (this.j2Bas.isDown ) {
      this.player2.setVelocityY(200);
    }
  }

  
}

export default GameScene;
