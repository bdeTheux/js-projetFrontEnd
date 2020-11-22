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

Navbar();

Router();

//setLayout(undefined);