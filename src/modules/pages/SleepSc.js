import React, { useState, useCallback, useEffect } from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import dailytest from './dailytest';

//import Component and Function
import RadialBars from '../components/SleepScorePage/RadialBars';
import Bar from '../components/SleepScorePage/Bar';
import SleepScore from '../components/SleepScorePage/SleepScore';  //show content SleepScore
import Btn_gotosleep from '../components/SleepScorePage/btngotosleep.png';
import BtnSummary from '../components/SleepScorePage/BtnSummary';
import BtnShare from '../components/SleepScorePage/BtnShare';
import HRSensor from '../components/SleepScorePage/HRSensor';
import Temp from '../components/SleepScorePage/Temp';
import { Row, Col , Container } from "reactstrap";
import { Route, Switch,BrowserRouter, Link } from 'react-router-dom';

//Create Component - JSX 
const SleepSc = (props) => {
  
    const [theme,setTheme] = useState(props.theme);
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
  
    useEffect(() => { setTheme(props.theme)});


var ButtonSize ={
  width: "50%",
  height: "50%",
  padding: 20,
  
}
    return(
        <div className="App">    
        <div className="Bg-color">
            <Container className="themed-container" fluid={true}>
            <Switch>
            <Route path="/dailytest" component={dailytest}/>
            </Switch>
        <Row> {/* Centre */}
        <Col xs={6}>
          <SleepScore/>
        </Col>
        <Col xs={6}>
        <div className="WhiteFont">
        {/* GO TO SLEEP BUTTON */}
        <div className=" wpb_column vc_col-sm-5 text-center mt-3">
              <div className="g-cols offset_small ">
                <div className="vc_col-sm-12 wpb_column mt-2">
                  <h1>Ready to Sleep?</h1>
                </div>
              </div>
              
              <Link to="/dailytest">
              <a href="dailytest" target="dailytest"><img src={Btn_gotosleep} alt="Button Go To Sleep _Daily Test" style={ButtonSize}></img></a></Link>
              </div>
                </div>
                </Col>
                </Row>
                </Container>
                <Container className="themed-container" fluid={true}>
                <div className=" wpb_column vc_col-sm-5 text-center mt-3">
                <div className="App-link">
                {/*<a href ="#" className="App-link"> <h1>More info</h1></a>*/}
                </div>
                </div>
                </Container>
                {/* RADIALBAR AND BAR*/}
                    <div className="container">
                    <div className="row">
                        <div className="col-sm">
                        <RadialBars/>
                        </div>
                        <div className="col-sm">
                        <Bar/>
                        </div>
                    </div>
                    </div>
                {/* TEMP AND HR Sensor */}
                    <div className=" wpb_column vc_col-sm-5 text-center mt-3">
                    <div className="container">
                    <div className="row">
                    <div className="col-sm">
                    <Temp/>
                    </div>
                    <div className="col-sm">
                    <HRSensor/>
                    </div>
                    </div>
                    </div>
                    </div>
                {/* SUMMARY AND SHARED BUTTON  */}
                    <div className="btn-padding-top-bottom">
                    <div className="container">
                    <div class="row justify-content-md-center">
                    <BtnSummary/>
                    <BtnShare/>
                    </div>
                    </div>
                    </div>
                </div> 
                </div>
            
    );
  }

export default SleepSc;
