import Phaser from "phaser";

//creation d'une constante pour pouvoir maintenir plus facilement le code
const POULET = "poulet";
const CHAT = "chat";
const SILVER_EGG= "silverEgg";
const GOLD_EGG= "goldEgg";
const COEUR = "coeur";
const COEUR_CAT = "coeurCat";
const COEUR_CHICKEN = "coeurChicken";

//declaration de la liste de joueurs et des deux joueurs
let players;
let J1;
let J2;



//liste spawn des oeufs
let eggs;
let spawnPossibilities = [{x: 70, y: 500},{x: 150, y: 400},{x: 900, y: 90},{x: 300, y: 66}];

let coeursChat = [null,null,null];
let coeursPoulet = [null, null, null];

let run;
let hunter;
let nbrViesJ1 = 3;
let nbrViesJ2 = 3;
/*import ScoreLabel from "./ScoreLabel.js";
import EggSpawner from "./EggSpawner.js";
*/

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
    
    //déterminer qui est le chassé. Le non-chassé sera le chasseur
    this.hunter = J1;
    this.run = J2;


    //gestion collide avec le monde

    this.world.setCollisionByProperty({Collides : true});
    this.physics.add.collider(J1, this.world);
    this.physics.add.collider(J2, this.world);

    //this.game.scale.pageAlignHorizontally = true;
    //this.scale.pageAlignVertically = true;
    //this.scale.refresh();
    console.log(this);
    
    

   //deplacement du joueur1
    this.cursors = this.input.keyboard.createCursorKeys();
    //deplacement du joueur2
    this.j2Haut = this.input.keyboard.addKey('Z');
    this.j2Bas = this.input.keyboard.addKey('S');
    this.j2Gauche = this.input.keyboard.addKey('Q');
    this.j2Droite = this.input.keyboard.addKey('D');

    
    //les 2 premiers parm = objet qui sont comparé, 3 est la fonction appelé, 4et5 = scope
    this.physics.add.overlap(this.hunter,this.run,this.perteVie,null,this);
    //this.physics.add.collider(this.player, this.player2/*, rajouter la fonction faire perdre une vie et re tp les joueurs *///);
    
    //oeuf et bombe
    this.eggs = this.physics.add.group()
    this.createEgg();
    this.physics.add.overlap(this.players,this.eggs,this.collectEgg,null,this);

    
  }

  update() {
    this.deplacementJ1(J1);
    this.deplacementJ2(J2);
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
      player.setVelocityX(-200);
    }
    if (this.cursors.right.isDown) {
      player.setVelocityX(200);
    }
    if(this.cursors.up.isDown) {
      player.setVelocityY(-200);
    }
    if (this.cursors.down.isDown ) {
      player.setVelocityY(200);
    }
  }

  deplacementJ2(player){
    player.setVelocity(0);
    if (this.j2Gauche.isDown) {
      player.setVelocityX(-200);
    }
    if (this.j2Droite.isDown) {
      player.setVelocityX(200);
    }
    if(this.j2Haut.isDown) {
      player.setVelocityY(-200);
    }
    if (this.j2Bas.isDown ) {
      player.setVelocityY(200);
    }
  }

  getRandomPosition() {
    //création d'un compteur et d'un tableau tmp pour pouvoir crée des oeufs avec le reload
    let cmpt = 0;
    let tmp = spawnPossibilities;
    if(cmpt ==2){
      tmp = spawnPossibilities;
    }
    const min = 0;
    const max = spawnPossibilities.length-1
    let random = Math.floor(Math.random()*(max-min+1)+min);
    let position = spawnPossibilities[random]
    tmp = spawnPossibilities.filter(p => p != position)
    cmpt++;
    return position
  }

  createEgg(){
    for (let index = 0; index < 2; index++) {
      let position = this.getRandomPosition()
      this.eggs.create(position.x, position.y, SILVER_EGG)
      this.eggs.children.iterate((child) => {
        child.setScale(0.03);
        child.setSize(1000,1000);
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });
    }
    

    return this.eggs;
  }

  collectEgg(players, eggs) {
    let position = this.getRandomPosition();
    eggs.disableBody(true, true);
  // TO DO
    if (this.eggs.countActive(true) === 0) { 
      this.eggs.children.iterate((child) => {
        position = this.getRandomPosition();
        child.enableBody(true, position.x, position.y, true, true);
      });
    };
    
  }
  CreateHeart(listes){
    let hauteur = 64;
    if(coeursPoulet===listes){
      for(let i=0;i<3;i++){
        listes[i] = this.add.image(32,hauteur,COEUR);
        listes[i].setScale(0.02);
        hauteur+=64;
      }
    }else{
      for(let i=0;i<3;i++){
        listes[i] = this.add.image(992,hauteur,COEUR);
        listes[i].setScale(0.02);
        hauteur+=64;
      }
    }
    
  }

  perteVie(){
    console.log("perte vie");
    if(this.run === this.J1){
      nbrViesJ1--;
      this.updateHeart();
    }else{
      nbrViesJ2--;
      this.updateHeart();
      
    }
    J1.setX(950);
    J1.setY(550);

    J2.setX(80);
    J2.setY(80);
    
    
  }

  updateHeart(){
    console.log(coeursChat);
    if (this.run === J1){
      if (nbrViesJ1 === 2 ){
        coeursPoulet[0].setTexture(COEUR_CHICKEN);
      }else if (this.nbrViesJ1 === 1){
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
    //J1= this.players.create(600, 400, POULET);
    //J2 = this.players.create(65, 70,CHAT);

  }



}


//alert("hello"); permet de faire sortir un pop up
//

export default GameScene;
