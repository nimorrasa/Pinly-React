import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import '../components/text.css';
import '../css/App.css';
import { Container, Row, Col } from 'reactstrap';
import CarouselHowtoRsg from '../components/HowtoregisterPage/SlideShow.js'
var colorheader ={
  color: '#ffffff',
  padding: 20
}


const howtoregis = (props) => {
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
    <div className="textcenter">
    <Container className="themed-container" fluid="true">
        <Row> {/* Centre */}
        <Col>
            <div className="textsize">
            <h1 style={colorheader}>HOW TO REGISTER</h1>
            </div>
            <CarouselHowtoRsg/>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
      );
    }
    
    export default howtoregis;