import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { Row, Col, CardBody, Card, CardSubtitle, CardTitle, CardText, Button } from "reactstrap";

const Contact_us = (props) => {

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
            <div className={"App Contact_us "+theme}>
                <Card style={{margin: "10vw", marginButtom: "0", padding: "10vh", background : "transparent", textAlign : "center", borderColor: "white", height: "40vh"}}>
                    <CardBody>
                        <CardTitle>CONTACT</CardTitle>
                        <CardText>Pinly.sleepapp@gmail.com</CardText>
                        <CardText>(+66) 955419228</CardText>
                    </CardBody>
                </Card>
                <Card style={{background : "transparent", textAlign : "center", height: "10vh"}}>
                    <CardBody>
                            <CardTitle>Powered by</CardTitle>
                            <CardText>Pinly Sleepapp Developer</CardText>
                            <CardText>Updated 2020-02-07</CardText>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default Contact_us;