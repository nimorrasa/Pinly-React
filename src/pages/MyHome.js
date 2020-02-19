import React, { useState, useCallback } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import MyNavbar from '../components/MyNavbar.js';
import logo from '../images/logo.png';

const MyHome = (props) => {
  const [theme, setTheme] = useState("theme_light");

  const handleThemeChange = useCallback((current_theme) => {
    setTheme('theme_'+current_theme);
  },[setTheme]);

  return (
    <div className={"App Home "+theme}>
    <MyNavbar theme={theme} onChangeTheme={handleThemeChange}></MyNavbar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <Container className="App-content">
            <Row className="Link-padding">
                 <a className="App-link" href="#login">Login</a> | <a className="App-link" href="#sign_up">Sign Up</a>
            </Row>
            <Row>
                <Button style={{borderWidth: 2, borderRadius: 20 }} className="App-button">GET STARTED</Button>
            </Row>
        </Container>
      </div>
    </div>
  );
}

export default MyHome;