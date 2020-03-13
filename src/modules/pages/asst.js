import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';

import Coffee from '../components/AssistantPage/Asst_Coffee.js';
import Alcohol from '../components/AssistantPage/Asst_Alcohol.js';
import Smoke from '../components/AssistantPage/Asst_Smoking.js';
import Tea from '../components/AssistantPage/Asst_Tea.js';

import Exercise from '../components/AssistantPage/Asst_Exercise.js';
import Nap from '../components/AssistantPage/Asst_Nap.js';
import Work from '../components/AssistantPage/Asst_Working.js';


import BtnScore from '../components/AssistantPage/BtnShowScore.js'

import { Route, Switch,BrowserRouter, Link } from 'react-router-dom';


const Assistant = (props) => {

    const [theme,setTheme] = useState(props.theme);
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
    
    useEffect(() => { setTheme(props.theme)});

    return (
        <div className={"App Assistant "+theme}>
        <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar> 
    <Container className="container" fluid="true">
        <Row> {/* Centre */}
        <Col>
        <div className="textcenter">
            <div className="textsize">
            <h1>Assistant</h1>
            </div>
        </div>
        </Col>
      </Row>
      <Row justify-content-md-center><Coffee/></Row>
      <Row justify-content-md-center><Alcohol/></Row>
      <Row justify-content-md-center><Smoke/></Row>
      <Row justify-content-md-center><Tea/></Row>
      <Row justify-content-md-center><Nap/></Row>
      <Row justify-content-md-center><Exercise/></Row>
      <Row justify-content-md-center><Work/></Row>
      <Row justify-content-md-center><BtnScore/></Row>
    
    </Container>
    
    </div>
    );
}

export default Assistant;