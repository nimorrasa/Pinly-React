import React, { useState, useCallback, useEffect } from 'react';
import {
  Route,
  // BrowserRouter as Router,
  // Link,
  // useRouteMatch,
  useLocation,
  Redirect
} from 'react-router-dom';
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import SignUp from "../pages/SignUp.js";
import Help from "../pages/Help.js";
import Profile from "../pages/Profile.js";
import Setting from "../pages/Setting";

const Routes = (props) => {
  const [theme,setTheme] = useState(props.theme);

  const handleNavbarThemeChange = useCallback((current_theme) => {
      setTheme(current_theme);
    },[setTheme]);

  return (
    <main>
      <Redirect from="/" to="/home" />
      <Route path="/home">
        <Home theme={theme} handleThemeChange={handleNavbarThemeChange}></Home>
      </Route>
      <Route path="/help">
        <Help theme={theme} handleThemeChange={handleNavbarThemeChange}></Help>
      </Route>
      <Route path="/setting">
        <Setting theme={theme} handleThemeChange={handleNavbarThemeChange}></Setting>
      </Route>
      <Route path="/profile">
        <Profile theme={theme} handleThemeChange={handleNavbarThemeChange}></Profile>
      </Route>
      <Route path="/login">
        <Login theme={theme} handleThemeChange={handleNavbarThemeChange}></Login>
      </Route>
      <Route path="/sign_up">
        <SignUp theme={theme} handleThemeChange={handleNavbarThemeChange}></SignUp>
      </Route>
    </main>
    );
}

export default Routes;