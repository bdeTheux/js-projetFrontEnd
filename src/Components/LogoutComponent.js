import LoginRegisterPage from "./LoginRegisterPage.js";
import { RedirectUrl } from "./Router.js";
import Navbar from "./Navbar.js";
import {removeSessionData} from "../utils/session.js";

const Logout = () => {
  removeSessionData();
  Navbar();
  RedirectUrl("/");
};

export default Logout;
