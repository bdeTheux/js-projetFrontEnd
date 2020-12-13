import LoginRegisterPage from "./LoginRegisterPage.js";
import { RedirectUrl, Router } from "./Router.js";
import Navbar from "./Navbar.js";
import {removeSessionData} from "../utils/session.js";

const Logout = () => {
  console.log("hello")
  removeSessionData();
  Navbar();
  RedirectUrl("/");
  Router();
};

export default Logout;
