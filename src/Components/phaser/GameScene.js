import Phaser from "phaser";
import { getUserSessionData } from "../../utils/session.js";
import { API_URL } from "../../utils/server.js";

//creation d'une constante pour pouvoir maintenir plus facilement le code
const POULET = "poulet";
const CHAT = "chat";
const POULETCHASSE = "poulerChasse";
const CHATCHASSEUR = "chatChasseur";
const SILVER_EGG = "silverEgg";
//const GOLD_EGG = "goldEgg";
const COEUR = "coeur";
const COEUR_CAT = "coeurCat";
const COEUR_CHICKEN = "coeurChicken";
const BOMB = "Bomb";
const PLAYER1 = "player1";
const PLAYER2 = "player2";
const PLAYER1BIS = "player1bis";
const PLAYER2BIS = "player2bis";
const SWITCHIMAGE1 = "switchimage1";
const SWITCHIMAGE2 = "switchimage2";
//declaration de la liste de joueurs et des deux joueurs
let players;
let J1;
let J2;
let vitessePoulet = 200;
let vitesseChat = 200;
let coeursChat = [null, null, null];
let coeursPoulet = [null, null, null];
let hunter;
let nbrViesJ1 = 3;
let nbrViesJ2 = 3;
let imageJ1;
let imageJ2;
let switchImage;

let gameScene;
let cptTime;
let timeEvent = "";
let estPasse;
let explosionBombe = false;
let joueurExplose;
let cptAReboursBombe = 3;


let gameOver = false;
let textResult;
let textCompteur;
let textOeufs;
let textSwitch;

//liste spawn des oeufs et des bombes
let eggs = {};
let spawnPossibilities = [{ x: 70, y: 500 }, { x: 150, y: 400 }, { x: 900, y: 90 }, { x: 300, y: 66 }, { x: 305, y: 200 },
{ x: 250, y: 326 }, { x: 502, y: 300 }, { x: 400, y: 480 }];
let bombs;

class GameScene extends Phaser.Scene {

  //charge toutes les images
  preload() {
    //skin joueurs
    this.load.image(POULET, "../../assets/chicken_hunter.png");
    this.load.image(CHAT, "../../assets/cat_run.png");
    this.load.image(POULETCHASSE, "../../assets/chicken_run.png");
    this.load.image(CHATCHASSEUR, "../../assets/cat_hunter.png");

    this.load.image(PLAYER1, "../../assets/gameState_player1_hunter.svg");
    this.load.image(PLAYER2, "../../assets/gameState_player2_hunter.svg");
    this.load.image(PLAYER1BIS, "../../assets/gameState_player1_hunted.svg");
    this.load.image(PLAYER2BIS, "../../assets/gameState_player2_hunted.svg");
    this.load.image(SWITCHIMAGE1, "../../assets/game_state-_chick_vs_cat.svg");
    this.load.image(SWITCHIMAGE2, "../../assets/game_state-_cat_vs_chick.svg");

    //création de la map
    this.load.image("elementMap", "../../assets/elementMap.png");
    this.load.tilemapTiledJSON("map", "../../assets/mapChickyPaw.json");

    //pickable
    this.load.image(SILVER_EGG, "../../assets/silver_egg.png");
    //this.load.image(GOLD_EGG, "../../assets/gold_egg.png");
    this.load.image(BOMB, "../../assets/Bomb.png");

    //vies
    this.load.image(COEUR, "../../assets/coeur.png");
    this.load.image(COEUR_CAT, "../../assets/coeur_cat.png");
    this.load.image(COEUR_CHICKEN, "../../assets/coeur_chicken.png");
  }


  create() {
    //Creation de la map
    this.tilemap = this.make.tilemap({ key: "map" });
    this.tileset = this.tilemap.addTilesetImage("elementMap", "elementMap");
    this.background = this.tilemap.createStaticLayer("background", this.tileset, 0, 0);
    this.world = this.tilemap.createStaticLayer("world", this.tileset, 0, 0);

    //Creation d'un group (de joueur)
    this.players = this.physics.add.group();
    //creation joueurs
    J1 = this.players.create(950, 550, POULET);
    J2 = this.players.create(80, 80, CHAT);
    this.playerSettings(J1);
    this.playerSettings(J2);
    this.CreateHeart(coeursChat);
    this.CreateHeart(coeursPoulet);
    imageJ1 = this.add.image(910, 25, PLAYER1).setScale(0.4, 0.4);
    imageJ2 = this.add.image(110, 25, PLAYER2).setScale(0.4, 0.4);
    switchImage = this.add.image(512, 25, SWITCHIMAGE1).setScale(0.4, 0.4);

    //initialisation du nombres de vies initiales
    nbrViesJ1 = 3;
    nbrViesJ2 = 3;

    //initialise le compte à rebours, initialise la fin du compteur à false et le hunter est à true lorsque le chasseur est la poule (J1)
    cptTime = 3;
    estPasse = false;
    hunter = true;

    gameScene = this;


    //gestion collide avec le monde
    this.world.setCollisionByProperty({ collides: true });
    this.physics.add.collider(J1, this.world);
    this.physics.add.collider(J2, this.world);
    this.physics.add.collider(J1, this.eggs);

    //deplacement du joueur1
    this.cursors = this.input.keyboard.createCursorKeys();
    //deplacement du joueur2
    this.j2Haut = this.input.keyboard.addKey('Z');
    this.j2Bas = this.input.keyboard.addKey('S');
    this.j2Gauche = this.input.keyboard.addKey('Q');
    this.j2Droite = this.input.keyboard.addKey('D');

    //les 2 premiers params = objets qui sont comparés, 3 est la fonction appelée, 4 et 5 = scope
    this.physics.add.overlap(J1, J2, this.perteVie, null, this);

    //Affichage des textes
    textCompteur = this.add.text(420, 150, cptTime, { fontSize: '320px', fill: '#000000' });
    textOeufs = this.add.text(400, 500, " ", { fontSize: '32px', fill: '#000000' });
    textSwitch = this.add.text(50, 200, " ", { fontSize: '200px', fill: '#000000' });
    textSwitch.setVisible(false);
    J1.disableBody(true, false);
    J2.disableBody(true, false);
    timeEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
    setInterval(this.switchRunHunter, 30000);

    //oeufs et bombes
    this.eggs = this.physics.add.group()
    this.createEgg();
    this.physics.add.overlap(this.players, this.eggs, this.collectEgg, null, this);
    this.bombs = this.physics.add.group();

    //Faire spawn la première bombe au bout de 7 sec
    setTimeout(this.spawnBombe, 7000);
  }

  update() {
    //fin du jeu
    if (this.gameOver) {
      return;
    }
    this.deplacementJ1(J1);
    this.deplacementJ2(J2);

    //fin du compte a rebours
    if (!estPasse && cptTime < 0) {
      J1.enableBody(true, J1.x, J1.y, true, true);
      J2.enableBody(true, J2.x, J2.y, true, true);
      timeEvent.destroy();
      textCompteur.destroy();
      estPasse = true;
    }

    //si un joueur passe sur une bombe
    if (cptAReboursBombe == 0 && this.physics.add.overlap(this.players, this.bombs, this.explosion, null, this)) {
      this.destructionBomb();
    }
  }

  playerSettings(player) {
    player.setScale(0.02);
    player.setSize(2000, 2000);
    player.setCollideWorldBounds(true);
    return player;
  }

  deplacementJ1(player) {
    player.setVelocity(0);
    if (this.cursors.left.isDown) {
      player.setVelocityX(-vitessePoulet);
    }
    if (this.cursors.right.isDown) {
      player.setVelocityX(vitessePoulet);
    }
    if (this.cursors.up.isDown) {
      player.setVelocityY(-vitessePoulet);
    }
    if (this.cursors.down.isDown) {
      player.setVelocityY(vitessePoulet);
    }
  }

  deplacementJ2(player) {
    player.setVelocity(0);
    if (this.j2Gauche.isDown) {
      player.setVelocityX(-vitesseChat);
    }
    if (this.j2Droite.isDown) {
      player.setVelocityX(vitesseChat);
    }
    if (this.j2Haut.isDown) {
      player.setVelocityY(-vitesseChat);
    }
    if (this.j2Bas.isDown) {
      player.setVelocityY(vitesseChat);
    }
  }

  //Gestion coeur
  CreateHeart(listes) {
    let hauteur = 64;
    if (coeursPoulet === listes) {
      for (let i = 0; i < 3; i++) {
        listes[i] = this.add.image(992, hauteur, COEUR);
        listes[i].setScale(0.02);
        hauteur += 64;
      }
    } else {
      for (let i = 0; i < 3; i++) {
        listes[i] = this.add.image(32, hauteur, COEUR);
        listes[i].setScale(0.02);
        hauteur += 64;
      }
    }
  }

  perteVie() {
    //dans le cas où J2, le chasseur, a touché J1, et que ce n'est pas l'explosion d'une bombe
    if (!explosionBombe) {
      if (!hunter) {
        nbrViesJ1--;
        this.updateHeart();
      } else {
        //dans l'autre cas
        nbrViesJ2--;
        this.updateHeart();
      }
    }
    //fin du jeu
    if (nbrViesJ1 === 0) {
      this.saveDefeatScore();
      textResult = this.add.text(60, 300, "Kitten, you won " + (3 - nbrViesJ1) + "-" + (3 - nbrViesJ2) + " !", { fontSize: '75px', fill: '#000000' });
      this.physics.pause();
      gameOver = true;
    } else if (nbrViesJ2 === 0) {
      this.saveVictoryScore();
      textResult = this.add.text(45, 300, "Chicky, you won " + (3 - nbrViesJ2) + "-" + (3 - nbrViesJ1) + " !", { fontSize: '75px', fill: '#000000' });
      this.physics.pause();
      gameOver = true;
    }
    //replacement des joueurs après la perte d'une vie
    J1.setX(950);
    J1.setY(550);
    J2.setX(80);
    J2.setY(80);
  }

  updateHeart() {
    //si c'est dans le cas d'une explosion de bombes
    if (explosionBombe) {
      if (joueurExplose === J1) {
        if (nbrViesJ1 === 2) {
          coeursPoulet[0].setTexture(COEUR_CHICKEN);
        } else if (nbrViesJ1 === 1) {
          coeursPoulet[1].setTexture(COEUR_CHICKEN);
        } else {
          coeursPoulet[2].setTexture(COEUR_CHICKEN);
        }
      } else {
        if (nbrViesJ2 === 2) {
          coeursChat[0].setTexture(COEUR_CAT);
        } else if (nbrViesJ2 === 1) {
          coeursChat[1].setTexture(COEUR_CAT);
        } else {
          coeursChat[2].setTexture(COEUR_CAT);
        }
      }
      //si c'est dans le cas d'un joueur qui en attrape un autre 
    } else {
      if (!hunter) {
        if (nbrViesJ1 === 2) {
          coeursPoulet[0].setTexture(COEUR_CHICKEN);
        } else if (nbrViesJ1 === 1) {
          coeursPoulet[1].setTexture(COEUR_CHICKEN);
        } else {
          coeursPoulet[2].setTexture(COEUR_CHICKEN);
        }
      } else {
        if (nbrViesJ2 === 2) {
          coeursChat[0].setTexture(COEUR_CAT);
        } else if (nbrViesJ2 === 1) {
          coeursChat[1].setTexture(COEUR_CAT);
        } else {
          coeursChat[2].setTexture(COEUR_CAT);
        }
      }
    }
  }

  //switch du chasseur et du chassé
  switchRunHunter() {
    hunter = !hunter;
    textSwitch.setText("SWITCH !");
    textSwitch.setVisible(true);
    if (hunter) {
      switchImage.setTexture(SWITCHIMAGE1);
      imageJ1.setTexture(PLAYER1);
      imageJ2.setTexture(PLAYER2);
      J1.setTexture(POULET);
      J2.setTexture(CHAT);
    } else {
      switchImage.setTexture(SWITCHIMAGE2);
      imageJ1.setTexture(PLAYER1BIS);
      imageJ2.setTexture(PLAYER2BIS);
      J1.setTexture(POULETCHASSE);
      J2.setTexture(CHATCHASSEUR);
    }
    setTimeout(gameScene.changerVisibiliteTextSwitch, 2000);
  }

  getRandomPosition() {
    //création d'un compteur et d'un tableau tmp pour pouvoir crée des oeufs avec le reload
    let cmpt = 0;
    let tmp = spawnPossibilities;
    if (cmpt == 2) {
      tmp = spawnPossibilities;
    }
    const min = 0;
    const max = spawnPossibilities.length - 1;
    let random = Math.floor(Math.random() * (max - min + 1) + min);
    let position = spawnPossibilities[random];
    tmp = spawnPossibilities.filter(p => p != position);
    cmpt++;
    return position;
  }

  createEgg() {
    let position = this.getRandomPosition();
    this.eggs.create(position.x, position.y, SILVER_EGG);
    this.eggs.children.iterate((child) => {
      child.setScale(0.03);
      child.setSize(1000, 1000);
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

  effetOeufs(joueur) {
    //on va prendre au hasard un chiffre entre 0 et 2
    let random = Math.floor(Math.random() * Math.floor(4));
    textOeufs.setVisible(true);
    //si 0,  augmenter vitesse
    if (random === 0) {
      this.augmenterVitesse(joueur);
      textOeufs.setText("Increased speed !");
    } else if (random === 1) {
      //si 1,  diminuer vitesse
      this.diminuerVitesse(joueur);
      textOeufs.setText("Reduced speed !");
    } else if (random === 2) {
      //si 2,  diminuer taille
      this.diminuerTaille(joueur);
      textOeufs.setText("You shrink !");
    } else {
      this.augmenterTaille(joueur);
      textOeufs.setText("You have grown up !");
    }
    setTimeout(this.changerVisibiliteTextOeufs, 1000);
  }

  augmenterVitesse(joueur) {
    if (joueur === J1) {
      vitessePoulet = 400;
      setTimeout(function () { vitessePoulet = 200 }, 3000);
    } else {
      vitesseChat = 400;
      setTimeout(function () { vitesseChat = 200 }, 3000);
    }
  }

  diminuerVitesse(joueur) {
    if (joueur === J1) {
      vitessePoulet = 100;
      setTimeout(function () { vitessePoulet = 200 }, 3000);
    } else {
      vitesseChat = 100;
      setTimeout(function () { vitesseChat = 200 }, 3000);
    }
  }

  diminuerTaille(joueur) {
    joueur.setScale(0.01);
    setTimeout(function () { joueur.setScale(0.02) }, 5000);
  }

  augmenterTaille(joueur) {
    joueur.setScale(0.03);
    setTimeout(function () { joueur.setScale(0.02) }, 5000);
  }

  changerVisibiliteTextOeufs() {
    textOeufs.setVisible(false);
  }

  changerVisibiliteTextSwitch() {
    textSwitch.setVisible(false);
  }

  //gestion du compte à rebours de départ
  onEvent() {
    cptTime -= 1;
    if (cptTime >= 1) {
      textCompteur.setText(cptTime);
    } else {
      textCompteur.setText("");
      textCompteur = this.add.text(0, 150, "Start !", { fontSize: '250px', fill: '#000000' });
      textSwitch.setVisible(true);
      setTimeout(this.changerVisibiliteTextSwitch, 2000);
    }
  }

  //Spawn des bombes
  spawnBombe() {
    cptAReboursBombe = 3;
    let position = gameScene.getRandomPosition();
    gameScene.bombs.create(position.x, position.y, BOMB).setScale(0.09).setSize(400, 400);
    gameScene.diminuerCptAReboursBombe()
  }

  diminuerCptAReboursBombe() {
    cptAReboursBombe = 0;
  }

  explosion(joueur, bomb) {
    bomb.disableBody(true, true);
    if (joueur === J1) {
      nbrViesJ1--;
    } else {
      nbrViesJ2--;
    }
    explosionBombe = true;
    joueurExplose = joueur;
    gameScene.perteVie();
    gameScene.updateHeart();
    explosionBombe = false;
  }

  destructionBomb() {
    let position = this.getRandomPosition();
    cptAReboursBombe = 3;
    this.bombs.children.iterate((child) => {
      position = this.getRandomPosition();
      child.enableBody(true, position.x, position.y, true, true);
    });
    setTimeout(gameScene.diminuerCptAReboursBombe, 11000);
  }

  //incrémente le nombre de victoires du joueur connecté
  saveVictoryScore() {
    let user = getUserSessionData();
    fetch(API_URL + 'users/getVictories/', { headers: { "Authorization": user.token } })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        fetch(API_URL + "users/setVictories/", {
          headers: {
            "Authorization": user.token,
          },
        }).then((response) => {
          if (!response.ok)
            throw new Error(
              "Error: " + response.status + " : " + response.statusText
            );
          return response.json();
        }).catch((err) => this.onError(err));
      })
  }


  //incrémente le nombre de défaites du joueur connecté
  saveDefeatScore() {
    let user = getUserSessionData();
    fetch(API_URL + 'users/getDefeats/', { headers: { "Authorization": user.token } })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let score = data.score + 1;
        fetch(API_URL + "users/setDefeats/", {
          //method: "POST", // *GET, POST, PUT, DELETE, etc.
          //body: JSON.stringify(score), // body data type must match "Content-Type" header
          headers: {
            "Content-Type": "application/json",
            "Authorization": user.token,
          },
        }).then((response) => {
          if (!response.ok)
            throw new Error(
              "Error: " + response.status + " : " + response.statusText
            );
          return response.json();
        }).catch((err) => this.onError(err));
      })
  }

  //erreur lors du fetch
  onError(err) {
    let page = document.querySelector(".page");
    let errorMessage = "";
    if (err.message.includes("409"))
      errorMessage = "ERROR";
    else errorMessage = err.message;
    page.innerText = errorMessage;
  };
}
export default GameScene;
