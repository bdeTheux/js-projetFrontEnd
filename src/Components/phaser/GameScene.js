import Phaser from "phaser";
const DUDE_KEY = "dude";

/*import ScoreLabel from "./ScoreLabel.js";
import EggSpawner from "./EggSpawner.js";
*/

class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
   
  }

  preload() {
    this.load.image("sky", "../../assets/sky.png");
    
    this.load.spritesheet(DUDE_KEY, "../../assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, "sky");
    this.player = this.createPlayer();
   
    
    this.cursors = this.input.keyboard.createCursorKeys();

    /*The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision...*/
  }

  update() {
  

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }


  createPlayer() {
    const player = this.physics.add.sprite(100, 450, DUDE_KEY);
    

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    

    return player;
  }

  
}

export default GameScene;
