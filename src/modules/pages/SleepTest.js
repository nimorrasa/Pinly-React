import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { Row, Col, CardBody, Card, CardTitle, CardText, Button, Media } from "reactstrap";
import '../css/SleepTest.css';
import sleep_score from '../../images/button/sleep_score.png';
import go_to_sleep from '../../images/button/go_to_sleep.png';

const SleepTest = (props) => {

    const [theme,setTheme] = useState(props.theme);
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
    
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
                                <a href="https://www.google.com"><img className="button"  src={sleep_score}></img></a>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6" md="6" xs="12">
                        <Card>
                            <CardTitle>Ready to Sleep?</CardTitle>
                            <CardBody>
                                <a href="https://www.facebook.com"><img className="button"  src={go_to_sleep}></img></a>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default SleepTest;