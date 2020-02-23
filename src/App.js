import React, { useState, useCallback } from 'react';
import {useRoutes} from 'hookrouter';
import './fonts/rsufont/RSU_Regular.ttf'
import './fonts/rsufont/RSU_light.ttf'
import './fonts/rsufont/RSU_BOLD.ttf'
import './modules/css/App.css';
import MyNavbar from './modules/components/navbar/MyNavbar.js';
import Home from './modules/pages/Home.js';
import Routes from "./modules/router/Routes.js";

function App() {

  const routeResult = useRoutes(Routes)
  const [theme, setTheme] = useState('theme_dark');
  const [navbarTheme, setNavbarTheme] = useState('dark');

  const handleNavbarThemeChange = useCallback((current_theme) => {
    setNavbarTheme(current_theme);
    setTheme('theme_'+current_theme);
  },[setNavbarTheme,setTheme]);

  return (
    <div className={"App "+theme}>
      <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange}></MyNavbar>
      {routeResult}

      {/* <Home theme={theme} handleThemeChange={handleNavbarThemeChange}></Home> */}
    </div>
  );
}

export default App;
