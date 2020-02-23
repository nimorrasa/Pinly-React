import React, { useState, useCallback } from 'react';
import { Button, Container, Row } from 'reactstrap';
import MyNavbar from '../components/navbar/MyNavbar.js';
import logo from '../../images/logo.png';
import '../css/MyTheme.css';

const Home = (props) => {
  const [theme, setTheme] = useState('theme_dark');

  const handleThemeChange = useCallback((current_theme) => {
    setTheme('theme_'+current_theme);
  },[setTheme]);

  let navbarTheme = theme === 'theme_dark' ? 'dark' : 'light';

  return (
    <div className={"App Home "+theme}>
    <MyNavbar theme={navbarTheme} onChangeTheme={handleThemeChange}></MyNavbar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <Container className={"App-content "+theme}>
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

export default Home;