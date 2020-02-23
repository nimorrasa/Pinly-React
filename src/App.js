import React, { useState, useCallback } from 'react';
import './fonts/rsufont/RSU_Regular.ttf'
import './fonts/rsufont/RSU_light.ttf'
import './fonts/rsufont/RSU_BOLD.ttf'
import './modules/css/App.css';
import MyNavbar from './modules/components/navbar/MyNavbar.js';
import Routes from "./modules/router/Routes.js";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [theme, setTheme] = useState('theme_dark');
  const [navbarTheme, setNavbarTheme] = useState('dark');

  const handleNavbarThemeChange = useCallback((current_theme) => {
    setNavbarTheme(current_theme);
    setTheme('theme_'+current_theme);
  },[setNavbarTheme,setTheme]);

  return (
    <div className={"App "+theme}>
      <Router>
        <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange}></MyNavbar>
        <Routes></Routes>
      </Router>
    </div>
  );
}

export default App;
