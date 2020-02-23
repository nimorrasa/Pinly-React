import React from "react";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import SignUp from "../pages/SignUp.js";
import Help from "../pages/Help.js";
import Profile from "../pages/Profile.js";
import Setting from "../pages/Setting";
const Routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/sign_up": () => <SignUp />,
  "/help": () => <Help />,
  "/profile": () => <Profile />,
  "/setting": () => <Setting />
};
export default Routes;