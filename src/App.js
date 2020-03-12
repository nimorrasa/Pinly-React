import React, { useState, useCallback, useEffect } from 'react';
import './fonts/rsufont/RSU_Regular.ttf'
import './fonts/rsufont/RSU_light.ttf'
import './fonts/rsufont/RSU_BOLD.ttf'
import './modules/css/App.css';
import Routes from "./modules/router/Routes.js";
import { BrowserRouter as Router } from 'react-router-dom';
import config from './modules/firebase/config.js';
import firebase from 'firebase';
import 'firebase/auth';
import { Toast, ToastBody, ToastHeader } from 'reactstrap'
import useInterval from './modules/hook/useInterval'

firebase.initializeApp(config);
firebase.analytics();

function App() {
  const [theme, setTheme] = useState('theme_dark');

  const [show, setShow] = useState(false)

  const [isAlreadyShow, setIsAlreadyShow] = useState(false)

  const toggle = () => setShow(!show)

  useInterval(() => {
    const date = new Date()
    if (date.getHours() === 22 && !isAlreadyShow) {
      setShow(true)
      setIsAlreadyShow(true)
    }
  }, 1000)

  useInterval(() => {
    const date = new Date()
    if (date.getHours() !== 22 && isAlreadyShow) {
      setIsAlreadyShow(false)
    }
  }, 1000)

  const handleNavbarThemeChange = useCallback((current_theme) => {
    setTheme(current_theme);
  },[setTheme]);

  return (
    <div className={"App "+theme} style={{height: '100vh'}}>
      <Router>
        <Routes firebase={firebase} theme={theme} onChangeTheme={handleNavbarThemeChange}></Routes>
      </Router>
      <Toast isOpen={show}>
        <ToastHeader toggle={toggle}>Alert</ToastHeader>
        <ToastBody>
          <font color="black">Time to sleep</font>
        </ToastBody>
      </Toast>
    </div>
  );
}

export default App;
