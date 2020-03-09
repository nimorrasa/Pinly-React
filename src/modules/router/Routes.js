import React, { useState, useCallback, useEffect } from 'react';
import {
  Route,
  Switch,
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

//Neeya's Edit Zone
import SleepSc from '../pages/SleepSc';
import DailyTest from '../pages/dailytest';
import WaitToSleep from '../pages/Waittosleep';
import Wakeup from '../pages/Wakeup';

// import HowToRegister from '../pages/howtoregis';
// import HowToSleep from '../pages/howtosleep';
// import Assistant from '../pages/asst';
// import History from '../pages/history';

import NotFound from '../pages/notfound';
//End Neeya's Edit Zone 

const Routes = (props) => {
  const [userId,setUserId] = useState('');
  const [theme,setTheme] = useState(props.theme);

  const handleNavbarThemeChange = useCallback((current_theme) => {
    setTheme(current_theme);
    props.onChangeTheme(current_theme);
  },[setTheme]);

  const handleUserId = useCallback((newUserId) => { setUserId(newUserId); }, [setUserId]);

  useEffect(() => {
    if(firebase.auth().currentUser != null) {
      setUserId(firebase.auth().currentUser.uid);
    }
  },[firebase]);

  return (
    <main>
      <Switch>
        <Redirect exact from="/" to="/home" />
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
        {/* //Neeya's Edit */}
        <Route path="/sleep_score">
          <SleepSc theme={theme} onChangeTheme={handleNavbarThemeChange}></SleepSc>
        </Route>
        <Route path="/daily_test">
          <DailyTest theme={theme} onChangeTheme={handleNavbarThemeChange}></DailyTest>
        </Route>
        <Route path="/wait_to_sleep">
          <WaitToSleep theme={theme} onChangeTheme={handleNavbarThemeChange}></WaitToSleep>
        </Route>
        <Route path="/wake_up">
          <Wakeup theme={theme} onChangeTheme={handleNavbarThemeChange}></Wakeup>
        </Route>
        {/* <Route path="/how_to_register">
          <HowToRegister theme={theme} onChangeTheme={handleNavbarThemeChange}></HowToRegister>
        </Route>
        <Route path="/how_to_sleep">
          <HowToSleep theme={theme} onChangeTheme={handleNavbarThemeChange}></HowToSleep>
        </Route> */}
        {/* <Route path="/history">
          <History theme={theme} onChangeTheme={handleNavbarThemeChange}></History>
        </Route> */}
        <Route  component={NotFound} />
        {/* //End Neeya's Edit */}
        </Switch>
    </main>
    );
}

export default Routes;
