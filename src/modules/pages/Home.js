import React, { useState, useCallback, useEffect } from 'react';
import { Button, Container, Row } from 'reactstrap';
import logo from '../../images/logo.png';
import '../css/MyTheme.css';
import '../css/Home.css';
import MyLink from '../components/MyLink.js';
import MyNavbar from '../components/navbar/MyNavbar.js';

const Home = (props) => {
  const [theme, setTheme] = useState(props.theme);
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
      <div className={"App Home "+theme}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          <Container className={"App-content "+theme}>
              <Row className="Link-padding">
                  <MyLink className="App-link" destination='/login' text="Login"></MyLink> | <MyLink className="App-link" destination='sign_up' text="Sign Up"></MyLink>
              </Row>
              <Row>
                  <Button style={{borderWidth: 2, borderRadius: 20 }} className="App-button">GET STARTED</Button>
              </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Home;