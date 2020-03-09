import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { Link } from 'react-router-dom';
import { Row, Col, CardBody, Card, CardTitle, CardText, Button, Media } from "reactstrap";
import '../css/SleepTest.css';
import sleep_score from '../../images/button/sleep_score.png';
import go_to_sleep from '../../images/button/go_to_sleep.png';

import SleepScore from '../pages/SleepSc';
import DailyTest from '../pages/dailytest';

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

    const onMouseOverSleepScore = useCallback(() => { setIsHoverSleepScore(true); },[setIsHoverSleepScore]);
    const onMouseOutSleepScore = useCallback(() => { setIsHoverSleepScore(false); },[setIsHoverSleepScore]);

    const onMouseOverGoToSleep = useCallback(() => { setIsHoverGoToSleep(true); },[setIsHoverGoToSleep]);
    const onMouseOutGoToSleep = useCallback(() => { setIsHoverGoToSleep(false); },[setIsHoverGoToSleep]);
    
    useEffect(() => { setTheme(props.theme)});

    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className={"App Sleep_test "+theme}>
                <Row>
                    <Col lg="6" md="6" xs="12">
                        <Card>
                            <CardTitle>Show sleep score</CardTitle>
                            <CardBody>
                                <a href="sleep_score" onMouseOver={onMouseOverSleepScore} onMouseOut={onMouseOutSleepScore} style={{opacity : (isHoverSleepScore ? '80%' : '100%')}}><img className="button"  src={sleep_score}></img></a>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6" md="6" xs="12">
                        <Card>
                            <CardTitle>Ready to Sleep?</CardTitle>
                            <CardBody>
                                <a href="daily_test" onMouseOver={onMouseOverGoToSleep} onMouseOut={onMouseOutGoToSleep} style={{opacity : (isHoverGoToSleep ? '80%' : '100%')}}><img className="button"  src={go_to_sleep}></img></a>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default SleepTest;
