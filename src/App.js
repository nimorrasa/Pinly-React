import React, { useState, useCallback } from 'react';
import './fonts/rsufont/RSU_Regular.ttf'
import './fonts/rsufont/RSU_light.ttf'
import './fonts/rsufont/RSU_BOLD.ttf'
import './modules/css/App.css';
import Routes from "./modules/router/Routes.js";
import { BrowserRouter as Router } from 'react-router-dom';
import config from './modules/firebase/config.js';
import firebase from 'firebase';
import 'firebase/auth';

firebase.initializeApp(config);
firebase.analytics();

function App() {


  const [theme, setTheme] = useState('theme_dark');

  const handleNavbarThemeChange = useCallback((current_theme) => {
    setTheme(current_theme);
  },[setTheme]);


  return (
    <div className={"App "+theme} style={{height: '100vh'}}>
      <Router>
        <Routes firebase={firebase} theme={theme} onChangeTheme={handleNavbarThemeChange}></Routes>
      </Router>
    </div>
  );
}

export default App;
