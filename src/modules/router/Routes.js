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
import Contact_us from "../pages/Contact_us";
import SleepTest from "../pages/SleepTest";
import firebase from 'firebase';

const Routes = (props) => {
  const [userId,setUserId] = useState('');
  const [theme,setTheme] = useState(props.theme);

  const handleNavbarThemeChange = useCallback((current_theme) => {
    setTheme(current_theme);
    props.onChangeTheme(current_theme);
  },[setTheme]);

  const handleUserId = useCallback((newUserId) => { setUserId(newUserId); });

  useEffect(() => {
    if(firebase.auth().currentUser != null) {
      setUserId(firebase.auth().currentUser.uid);
    }
  },firebase);

  return (
    <main>
      <Redirect from="/" to="/home" />
      <Route path="/home">
        <Home theme={theme} onChangeTheme={handleNavbarThemeChange}></Home>
      </Route>
      <Route path="/help">
        <Help theme={theme} onChangeTheme={handleNavbarThemeChange}></Help>
      </Route>
      <Route path="/contact_us">
        <Contact_us theme={theme} onChangeTheme={handleNavbarThemeChange}></Contact_us>
      </Route>
      <Route path="/profile">
        <Profile userId={userId} theme={theme} onChangeTheme={handleNavbarThemeChange}></Profile>
      </Route>
      <Route path="/login">
        <Login onLogin={handleUserId} theme={theme} onChangeTheme={handleNavbarThemeChange}></Login>
      </Route>
      <Route path="/sign_up">
        <SignUp onLogin={handleUserId} theme={theme} onChangeTheme={handleNavbarThemeChange}></SignUp>
      </Route>
      <Route path="/sleep_test">
        <SleepTest theme={theme} onChangeTheme={handleNavbarThemeChange}></SleepTest>
      </Route>
    </main>
    );
}

export default Routes;