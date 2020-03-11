import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { Row, Col, CardBody, Card, CardSubtitle, CardTitle, CardText, Button } from "reactstrap";
import '../css/Contact_us.css';
import { useCookies } from 'react-cookie';

const Contact_us = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['theme']);
    const [isLoading,setIsLoading] = useState(false);
    const [theme,setTheme] = useState(cookies.theme);
    const [navbarTheme, setNavbarTheme] = useState(cookies.theme === 'theme_dark' ? 'dark' : 'light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
  
    useEffect(() => {
        handleNavbarThemeChange(cookies.theme);
    },[cookies.theme]);

    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className="loading" style={{textAlign: "center",top: "30vh",height: "50vh",color: "white",display : (!isLoading ? 'none' : 'block' )}}>
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>
            <div className={"App Contact_us "+theme} style={{display : (isLoading ? 'none' : 'block' )}}>
                <Card className="main">
                    <CardBody>
                        <CardTitle>
                            <h1>CONTACT</h1>
                        </CardTitle>
                        <div className="card-text">
                            <h4><i className="fa fa-envelope"></i>Pinly.sleepapp@gmail.com</h4>
                        </div>
                        <div className="card-text">
                            <h4><i className="fa fa-phone" aria-hidden="true"></i>(+66) 955419228</h4>
                        </div>
                    </CardBody>
                </Card>
                <Card className="footer">
                    <CardBody>
                        <CardTitle>Powered by</CardTitle>
                        <CardText>Pinly Sleepapp Developer</CardText>
                        <CardText><b>Updated 2020-02-07</b></CardText>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default Contact_us;