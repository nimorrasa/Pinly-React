import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';
import CarouselHowtoSLT from '../components/HowtoSleeptestPage/SlideShow.js'
var colorheader ={
  // color: '#ffffff',
  padding: 20
}


const howtosleep = (props) => {
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
    <div className="textcenter">
    <Container className="themed-container" fluid="true">
        <Row> {/* Centre */}
        <Col>
            <div className="textsize">
            <h1 style={colorheader}>HOW TO USE SLEEP TEST</h1>
            </div>
            <CarouselHowtoSLT/>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
    </div>
      );
    }
    
    export default howtosleep;