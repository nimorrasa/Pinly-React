import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { Row, Col, CardBody, Card, CardTitle, CardText, Button, Media } from "reactstrap";
import { Route, Switch,BrowserRouter, Link } from 'react-router-dom';

import '../css/SleepTest.css';
import sleep_score from '../../images/button/sleep_score.png';
import go_to_sleep from '../../images/button/go_to_sleep.png';

const SleepTest = (props) => {

    const [theme,setTheme] = useState(props.theme);
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');
    const [isHoverSleepScore,setIsHoverSleepScore] = useState(false);
    const [isHoverGoToSleep,setIsHoverGoToSleep] = useState(false);

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);


    
    useEffect(() => { setTheme(props.theme)});

    
    var ButtonSize ={
        width: "100%",
        height: "100%",
        padding: 20,
    }

    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className={"App Sleep_test "+theme}>
                <Row>
                    <Col lg="6" md="6" xs="12">
                        <Card>
                            <CardTitle>Show sleep score</CardTitle>
                            <CardBody>
                            <Link to="/sleep_score">
                            <img src={sleep_score} alt="Button Go To Sleep_Score" style={{opacity : (isHoverSleepScore ? '80%' : '100%')},ButtonSize}></img></Link>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6" md="6" xs="12">
                        <Card>
                            <CardTitle>Ready to Sleep?</CardTitle>
                            <CardBody>
                                <Link to="/daily_test"><img src={go_to_sleep} alt="Button Go To Sleep _Daily Test" style={{opacity : (isHoverSleepScore ? '80%' : '100%')},ButtonSize}></img></Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default SleepTest;