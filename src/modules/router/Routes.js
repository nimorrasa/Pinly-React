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
import VoiceOver from "../pages/VoiceOver";
import SleepScore from "../pages/SleepScore";
import SleepForm from "../pages/SleepForm";
import MyNavbar from '../components/navbar/MyNavbar.js';

const Routes = (props) => {
  const [theme,setTheme] = useState(props.theme);
  const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

  const handleNavbarThemeChange = useCallback((current_theme) => {
    setNavbarTheme(current_theme);
    setTheme('theme_'+current_theme);
    props.onChangeTheme('theme_'+current_theme);
  },[setNavbarTheme,setTheme]);

  return (
    <main>
      <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange}></MyNavbar>
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
      <Route path="/sleep_form">
        <SleepForm theme={theme} handleThemeChange={handleNavbarThemeChange}></SleepForm>
      </Route>
      <Route path="/sleep_score">
        <SleepScore theme={theme} handleThemeChange={handleNavbarThemeChange}></SleepScore>
      </Route>
      <Route path="/voice_over">
        <VoiceOver theme={theme} handleThemeChange={handleNavbarThemeChange}></VoiceOver>
      </Route>
    </main>
    );
}

export default Routes;