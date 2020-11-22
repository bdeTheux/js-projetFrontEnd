//import { setLayout } from "./utils/render.js";
import HomePage from "./Components/HomePage.js";
import {Router} from "./Components/Router.js";
import Navbar from "./Components/Navbar.js";
/* use webpack style & css loader*/
import "./assets/stylesheets/style.css";
/* load bootstrap css (web pack asset management) */
import 'bootstrap/dist/css/bootstrap.css';
/* load bootstrap module (JS) */
import 'bootstrap';

import 'animejs';

//const HEADER_TITLE = "JavaScript & Node.js full course";
//const FOOTER_TEXT = "Happy learning : )";

let menu = document.getElementById("menu");
let navbarItems = document.getElementsByClassName("nav-item")
let navbarOn = false;

$(document).ready(function () {
    anime({
        targets: '.title',
        translateY: 90,
        scale: 25,
        easing: 'easeOutElastic(1, .6)',
        delay: 1000
    });

    anime({
        targets: '.nav-menu',
        translateY: 220,
        easing: 'easeOutElastic(1, .6)',
        delay: 1500
    });
});

function fadeIn(id) {
    let div = document.getElementById(id).style;// récupère div
    let i = 0;// initialise i
    let f = function ()// attribut à f une fonction anonyme
    {
        div.opacity = i;// attribut à l'opacité du div la valeur d'i
        i = i + 0.02;// l'incrémente

        if (i <= 1)// si c'est toujours pas égal à 1
        {
            setTimeout(f, 20);// attend 20 ms, et relance la fonction
        }
    };

    f();// l'appel une première fois pour lancer la boucle
}

function fadeOut(id) {
    var div = document.getElementById(id).style;// récupère div
    let i = 1;
    var f = function ()// attribut à f une fonction anonyme
    {
        div.opacity = i;// attribut à l'opacité du div la valeur d'i
        i = i - 0.03;// l'incrémente

        if (i >= 0)// si c'est toujours pas égal à 1
        {
            setTimeout(f, 10);// attend 20 ms, et relance la fonction
        }
    };

    f();// l'appel une première fois pour lancer la boucle
}

menu.onclick = function () {
    if (navbarOn) {
        fadeOut('about-us');
        setTimeout(function(){ fadeOut('achievements'); }, 400);
        setTimeout(function(){ fadeOut('leaderboards'); }, 800);
        setTimeout(function(){ fadeOut('profile'); }, 1200);
        navbarOn = false;
    }
    else {
        fadeIn('profile');
        setTimeout(function(){ fadeIn('leaderboards'); }, 400);
        setTimeout(function(){ fadeIn('achievements'); }, 800);
        setTimeout(function(){ fadeIn('about-us'); }, 1200);
        
        navbarOn = true;
    }
};

Navbar();

Router();

//setLayout(undefined);