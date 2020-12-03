import Phaser from "phaser";

//creation d'une constante pour pouvoir maintenir plus facilement le code
const POULET = "poulet";
const CHAT = "chat";
const SILVER_EGG= "silverEgg";
const GOLD_EGG= "goldEgg";
const COEUR = "coeur";
const COEUR_CAT = "coeurCat";
const COEUR_CHICKEN = "coeurChicken";
const BOMB = "Bomb";
//declaration de la liste de joueurs et des deux joueurs
let players;
let J1;
let J2;
let gameScene;
let cptTime;
let timeEvent = "";
let estPasse;
let explosionBombe = false;
let joueurExplose;

let vitessePoulet = 200;
let vitesseChat = 200;
let gameOver = false; 
let textResult;
let textCompteur;
let textOeufs;
let textSwitch;

//liste spawn des oeufs
let eggs = {};
let spawnPossibilities = [{x: 70, y: 500},{x: 150, y: 400},{x: 900, y: 90},{x: 300, y: 66},{x:305, y:200},
                          {x: 250, y: 326},{x: 502, y: 300},{x: 400, y: 600}];

let coeursChat = [null,null,null];
let coeursPoulet = [null, null, null];

let hunter;
let nbrViesJ1 = 3;
let nbrViesJ2 = 3;
/*import ScoreLabel from "./ScoreLabel.js";
import BombSpawner from "./BombSpawner.js";
*/
let bombs;

class GameScene extends Phaser.Scene {
  /*constructor() {
    super("game-scene");
    this.player = undefined;
    this.player2 = undefined;
    this.eggs = undefined;
    this.cursors = undefined;
   
  }*/

  preload() {
    this.load.image(POULET, "../../assets/chicken_hunter.png");
    this.load.image(CHAT, "../../assets/cat_run.png");
    this.load.image("elementMap", "../../assets/elementMap.png");
    this.load.tilemapTiledJSON("map", "../../assets/mapChickyPaw.json");
    this.load.image(SILVER_EGG, "../../assets/silver_egg.png");
    //this.load.image(GOLD_EGG, "../../assets/gold_egg.png");
    this.load.image(COEUR, "../../assets/coeur.png");
    this.load.image(COEUR_CAT, "../../assets/coeur_cat.png");
    this.load.image(COEUR_CHICKEN, "../../assets/coeur_chicken.png");
    this.load.image(BOMB,"../../assets/Bomb.png");

    
  }


  create() {
    //Creation de la map
    this.tilemap = this.make.tilemap({key:"map"});
    this.tileset = this.tilemap.addTilesetImage("elementMap", "elementMap");
    this.background = this.tilemap.createStaticLayer("background", this.tileset,0,0);
    this.world = this.tilemap.createStaticLayer("world", this.tileset,0,0);
    //Creation d'un group (de joueur)
    this.players = this.physics.add.group();
    //creation joueur
    J1= this.players.create(950, 550, POULET);
    J2 = this.players.create(80, 80,CHAT);
    this.playerSettings(J1);
    this.playerSettings(J2);
    this.CreateHeart(coeursChat);
    this.CreateHeart(coeursPoulet);
    //this.physics.add.sprite(1000,600,BOMB);
    //déterminer qui est le chassé. Le non-chassé sera le chasseur
    cptTime = 3;
    estPasse = false;

    nbrViesJ1 = 3;
    nbrViesJ2 = 3;  
    hunter = true;
    
    gameScene = this;


    //gestion collide avec le monde

    this.world.setCollisionByProperty({collides : true});
    this.physics.add.collider(J1, this.world);
    this.physics.add.collider(J2, this.world);
    this.physics.add.collider(J1, this.eggs);
    //this.game.scale.pageAlignHorizontally = true;
    //this.scale.pageAlignVertically = true;
    //this.scale.refresh();
    
    

   //deplacement du joueur1
    this.cursors = this.input.keyboard.createCursorKeys();
    //deplacement du joueur2
    this.j2Haut = this.input.keyboard.addKey('Z');
    this.j2Bas = this.input.keyboard.addKey('S');
    this.j2Gauche = this.input.keyboard.addKey('Q');
    this.j2Droite = this.input.keyboard.addKey('D');
    
    //les 2 premiers parm = objet qui sont comparé, 3 est la fonction appelé, 4et5 = scope
    
    this.physics.add.overlap(J1, J2,this.perteVie,null,this);
    //this.physics.add.collider(this.player, this.player2/*, rajouter la fonction faire perdre une vie et re tp les joueurs *///);

    textCompteur = this.add.text(420,150, cptTime, { fontSize: '320px', fill: '#000000' });
    textOeufs = this.add.text(400,500, " ", { fontSize: '32px', fill: '#000000' });
    textSwitch = this.add.text(80, 500, "Kitten, RUUUUN !", {fontSize: '35px', fill: '#000000'});
    textSwitch.setVisible(false);
    J1.disableBody(true, false);
    J2.disableBody(true, false);
    timeEvent = this.time.addEvent({delay:1000, callback:this.onEvent, callbackScope: this, loop: true });
    setInterval(this.switchRunHunter, 30000);

    //oeuf et bombe
    this.eggs = this.physics.add.group()

    this.createEgg();
    this.physics.add.overlap(this.players,this.eggs,this.collectEgg,null,this);
    this.bombs = this.physics.add.group();

    this.spawnBombe();
    this.physics.add.overlap(this.players,this.bombs,this.explosion,null,this);

  }

  update() {
    if (this.gameOver) {
      return;
    }
    this.deplacementJ1(J1);
    this.deplacementJ2(J2);

    if (!estPasse && cptTime < 0){
      J1.enableBody(true, J1.x, J1.y, true, true);
      J2.enableBody(true, J2.x, J2.y, true, true);
      timeEvent.destroy();
      textCompteur.destroy();
      estPasse = true;
    }
  }

  playerSettings(player){
    player.setScale(0.02);
    player.setSize(2000,2000);
    player.setCollideWorldBounds(true);
    return player;
  }

  
  //
  deplacementJ1(player){
    player.setVelocity(0);
    if (this.cursors.left.isDown) {
      player.setVelocityX(-vitessePoulet);
    }
    if (this.cursors.right.isDown) {
      player.setVelocityX(vitessePoulet);
    }
    if(this.cursors.up.isDown) {
      player.setVelocityY(-vitessePoulet);
    }
    if (this.cursors.down.isDown ) {
      player.setVelocityY(vitessePoulet);
    }
  }

  deplacementJ2(player){
    player.setVelocity(0);
    if (this.j2Gauche.isDown) {
      player.setVelocityX(-vitesseChat);
    }
    if (this.j2Droite.isDown) {
      player.setVelocityX(vitesseChat);
    }
    if(this.j2Haut.isDown) {
      player.setVelocityY(-vitesseChat);
    }
    if (this.j2Bas.isDown ) {
      player.setVelocityY(vitesseChat);
    }
  }

  getRandomPosition() {
    //création d'un compteur et d'un tableau tmp pour pouvoir crée des oeufs avec le reload
    let cmpt = 0;
    let tmp = spawnPossibilities;
    if(cmpt == 2){
      tmp = spawnPossibilities;
    }
    const min = 0;
    const max = spawnPossibilities.length-1;
    let random = Math.floor(Math.random()*(max-min+1)+min);
    let position = spawnPossibilities[random];
    tmp = spawnPossibilities.filter(p => p != position);
    cmpt++;
    return position;
  }

  createEgg(){
      let position = this.getRandomPosition();
      this.eggs.create(position.x, position.y, SILVER_EGG);
      this.eggs.children.iterate((child) => {
        child.setScale(0.03);
        child.setSize(1000,1000);
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });
    

    return this.eggs;
  }

  collectEgg(player, egg) {
    let position = this.getRandomPosition();
    egg.disableBody(true, true);
  // TO DO
    if (this.eggs.countActive(true) === 0) { 
      this.eggs.children.iterate((child) => {
        position = this.getRandomPosition();
        child.enableBody(true, position.x, position.y, true, true);
      });
    };
    this.effetOeufs(player);    
  }

  CreateHeart(listes){
    let hauteur = 64;
    if(coeursPoulet===listes){
      for(let i=0;i<3;i++){
        listes[i] = this.add.image(992,hauteur,COEUR);
        listes[i].setScale(0.02);
        hauteur+=64;
      }
    }else{
      for(let i=0;i<3;i++){
        listes[i] = this.add.image(32,hauteur,COEUR);
        listes[i].setScale(0.02);
        hauteur+=64;
      }
    }
    
  }

  perteVie(){
    //quand hunter est à true, le chasseur est J1
    if (!explosionBombe){
      if(!hunter){
        nbrViesJ1--;
        this.updateHeart();
      }else{
        nbrViesJ2--;
        this.updateHeart();
      }
    }
    if (nbrViesJ1 === 0){
      textResult = this.add.text(60, 300, "Kitten, you won " + (3-nbrViesJ1) + "-" + (3-nbrViesJ2) + " !", { fontSize: '75px', fill: '#000000' });
      this.physics.pause();
      gameOver = true;
    }else if (nbrViesJ2 === 0){
      textResult = this.add.text(45, 300, "Chicky, you won " + (3-nbrViesJ2) + "-" + (3-nbrViesJ1) + " !", { fontSize: '75px', fill: '#000000' });
      this.physics.pause();
      gameOver = true;
    }
    J1.setX(950);
    J1.setY(550);

    J2.setX(80);
    J2.setY(80);
    
    
  }


  updateHeart(){
    if (explosionBombe){
      if (joueurExplose === J1){
        if (nbrViesJ1 === 2 ){
          coeursPoulet[0].setTexture(COEUR_CHICKEN);
        }else if (nbrViesJ1 === 1){
          coeursPoulet[1].setTexture(COEUR_CHICKEN);
        }else{
          coeursPoulet[2].setTexture(COEUR_CHICKEN);
        }
      }else{
        if (nbrViesJ2 === 2 ){
          coeursChat[0].setTexture(COEUR_CAT);
        }else if (nbrViesJ2 === 1){
          coeursChat[1].setTexture(COEUR_CAT);
        }else{
          coeursChat[2].setTexture(COEUR_CAT);
        }
      }
    }else{
      if (!hunter){
        if (nbrViesJ1 === 2 ){
          coeursPoulet[0].setTexture(COEUR_CHICKEN);
        }else if (nbrViesJ1 === 1){
          coeursPoulet[1].setTexture(COEUR_CHICKEN);
        }else{
          coeursPoulet[2].setTexture(COEUR_CHICKEN);
        }
      }else{
        if (nbrViesJ2 === 2 ){
          coeursChat[0].setTexture(COEUR_CAT);
        }else if (nbrViesJ2 === 1){
          coeursChat[1].setTexture(COEUR_CAT);
        }else{
          coeursChat[2].setTexture(COEUR_CAT);
        }
      }
    }
    
    //J1= this.players.create(600, 400, POULET);
    //J2 = this.players.create(65, 70,CHAT);

  }


  switchRunHunter(){
    hunter = !hunter;
    textSwitch.setVisible(true);
    if (hunter){
      textSwitch.setText("Attention, switch : Kitten, RUUUUN !");
    }else{
      textSwitch.setText("Attention, switch : Chicky, RUUUUN !");
    }
    setTimeout(gameScene.changerVisibiliteTextSwitch, 2000);
  }

  effetOeufs(joueur){
    //on va prendre au hasard un chiffre entre 0 et 2
    let random = Math.floor(Math.random()*Math.floor(4));
    
    textOeufs.setVisible(true);
      //si 0 augmenter vitesse
    if(random === 0){
      this.augmenterVitesse(joueur);
      textOeufs.setText("Increased speed !");
    } else if(random === 1){
      //si 1 diminuer vitesse
      this.diminuerVitesse(joueur);
      textOeufs.setText("Reduced speed !");
    }else if(random === 2){
      //si 2 diminuer taille
      this.diminuerTaille(joueur);
      textOeufs.setText("You shrink !");
    }else{
      this.augmenterTaille(joueur);
      textOeufs.setText("You have grown up !");
      
    }
    

    setTimeout(this.changerVisibiliteTextOeufs, 1000);
    
  }

  augmenterVitesse(joueur){
      if(joueur === J1){
        vitessePoulet = 400;
        setTimeout(function(){vitessePoulet = 200}, 3000);
      }else{
        vitesseChat = 400;
        setTimeout(function(){vitesseChat = 200}, 3000);
      }
  }

  diminuerVitesse(joueur){
    if(joueur === J1){
      vitessePoulet = 100;
      setTimeout(function(){vitessePoulet = 200}, 3000);
    }else{
      vitesseChat = 100;
      setTimeout(function(){vitesseChat = 200}, 3000);
    }
  }

  diminuerTaille(joueur){
    joueur.setScale(0.01);
    setTimeout(function(){joueur.setScale(0.02)}, 5000);
  }

  augmenterTaille(joueur){
    joueur.setScale(0.03);
    setTimeout(function(){joueur.setScale(0.02)}, 5000);
  }

  changerVisibiliteTextOeufs(){
    textOeufs.setVisible(false);
  }

  changerVisibiliteTextSwitch(){
    textSwitch.setVisible(false);
  }


  onEvent(){
    cptTime -= 1;
    if (cptTime >= 1){
      textCompteur.setText(cptTime);
    }else{
      textCompteur.setText("");
      textCompteur = this.add.text(0,150, "Start !", { fontSize: '250px', fill: '#000000' });
      textSwitch.setVisible(true);
      setTimeout(this.changerVisibiliteTextSwitch, 2000);
    }
  }

  spawnBombe(){
    let position = this.getRandomPosition();
      this.bombs.create(position.x,position.y,BOMB).setScale(0.09).setSize(1500,1500); 
    
  }


  explosion(joueur){
    console.log("call la reference");
    if (joueur === J1){
      nbrViesJ1--;
    }else{
      nbrViesJ2--;
    }
    explosionBombe = true;
    joueurExplose = joueur;
    this.updateHeart();
    this.perteVie();
    explosionBombe = false;
  }
}





//alert("hello"); permet de faire sortir un pop up
//

export default GameScene;
