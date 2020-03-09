import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { Row, Col, CardBody, Card, CardSubtitle, CardTitle, CardText, Button } from "reactstrap";

import IconWaittosleep from './components/WaittoSleepPage/ic_waitsleep.png'
import './components/text.css';
import './App.css';

var colorheader ={
  color: '#ffffff',
  padding: 20
}
var colorLight ={
  color: '#3cc7c3',
  fontSize: 200
}
var colorLightNR ={
  color: '#3cc7c3',
  fontSize: 30
}
var colorfont ={
  color: '#ffffff',
  fontSize: 30
}
const Waittosleep = (props) => {
  
  const [theme,setTheme] = useState(props.theme);
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
  
    useEffect(() => { setTheme(props.theme)});
  
  return (
    <div className="Bg-color">
    
    <a href ="./Wakeup"> <div className="align-items-center">
    <div className="textcenter">
        <a href="Wakeup" target="Wakeup"><img src={IconWaittosleep} alt="Icon Wait to Sleep"></img></a>
            <div className="textsize">
            <h1 style={colorheader}>Please close your phone's screen.</h1>
            <h1 style={colorheader}>So the system can better measure and assess the quality og your sleep.</h1>
            </div>
    </div>
    </div></a>
    
    </div>
      );
    }
    
    export default Waittosleep;
