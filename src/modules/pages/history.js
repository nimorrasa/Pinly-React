import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';
import Day1 from '../components/History/TableHistory_1.js'
import Day2 from '../components/History/TableHistory_2.js'
import Day3 from '../components/History/TableHistory_3.js'
import Day4 from '../components/History/TableHistory_4.js'
import Day5 from '../components/History/TableHistory_5.js'
import Day6 from '../components/History/TableHistory_6.js'
import Day7 from '../components/History/TableHistory_7.js'
var colorheader ={
  padding: 20
}
const history = (props) => {

  const [theme,setTheme] = useState(props.theme);
  const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

  const handleNavbarThemeChange = useCallback((current_theme) => {
    setNavbarTheme(current_theme);
    setTheme('theme_'+current_theme);
    props.onChangeTheme('theme_'+current_theme);
  },[setNavbarTheme,setTheme]);

  useEffect(() => { setTheme(props.theme)});
  return (
    <div className={"App history "+theme}>
        <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar> 
    <div className="textcenter">
    <Container className="container" fluid="true">
        <Row> {/* Centre */}
        <Col>
            <div className="textsize">
            <h1 style={colorheader}>History</h1>
            </div>
        </Col>
      </Row>
      <Row justify-content-md-center><Day7/></Row>
      <Row justify-content-md-center><Day6/></Row>
      <Row justify-content-md-center><Day5/></Row>
      <Row justify-content-md-center><Day4/></Row>
      <Row justify-content-md-center><Day3/></Row>
      <Row justify-content-md-center><Day2/></Row>
      <Row justify-content-md-center><Day1/></Row>

    </Container>
    </div>
    </div>
    
      );
    }
    
    export default history;