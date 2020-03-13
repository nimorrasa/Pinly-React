import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MyNavbar from '../components/navbar/MyNavbar.js';
import dailytest from './dailytest';
import { Container, Row, Col } from 'reactstrap';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import Component and Function
import RadialBars from '../components/SleepScorePage/RadialBars';
import Bar from '../components/SleepScorePage/Bar';
import SleepScore from '../components/SleepScorePage/SleepScore';  //show content SleepScore
import Btn_gotosleep from '../components/SleepScorePage/btngotosleep.png';
import BtnSummary from '../components/SleepScorePage/BtnSummary';
import BtnShare from '../components/SleepScorePage/BtnShare';
import HRSensor from '../components/SleepScorePage/HRSensor';
import Temp from '../components/SleepScorePage/Temp';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';
import { Route, Switch,BrowserRouter, Link } from 'react-router-dom';


//Create Component - JSX 
const SleepSc = (props) => {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['theme']);
  const [ userData, setUserData ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);
  const [theme,setTheme] = useState(props.theme);
  const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

  const handleNavbarThemeChange = useCallback((current_theme) => {
    setNavbarTheme(current_theme);
    setTheme('theme_'+current_theme);
    props.onChangeTheme('theme_'+current_theme);
  },[setNavbarTheme,setTheme]);


  useEffect(() => {
      handleNavbarThemeChange(cookies.theme);
  },[cookies.theme]);

  useEffect(() => {
    handleNavbarThemeChange(cookies.theme);
		async function fetchData (user_id) {
            let user = await firebase.database().ref('/users/' + user_id).once('value');
			return user.val();
        }
    
        firebase.auth().onAuthStateChanged(async function(user) {
			if (user) {
                let data = await fetchData(user.uid);
                setUserData(data);
            }else{
                history.push('/login');
            }
            setIsLoading(false);
        });
    

    },[]);
    

var ButtonSize ={
  width: "50%",
  height: "50%",
  padding: 20,
  
}
    return(

      	<div>
      		<MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
      		<Container style={{textAlign: "center"}}>
          		<Row>
          			<Col lg="6" md="6" xs="12">
						<Row>
							  <SleepScore/>
						</Row>
						  <Row>
						  	<RadialBars/>
						  </Row>
						  <Row>
						  	<Temp/>
						  </Row>
							<Row>
								<BtnSummary/>
							</Row>
        			</Col>
					<Col lg="6" md="6" xs="12">
						<Row>
							<Col lg="12" md="12" xs="12">
								<h1>Ready to Sleep?</h1>
							</Col>
							<Link to="/daily_test"><img src={Btn_gotosleep} alt="Button Go To Sleep _Daily Test" style={ButtonSize}></img></Link>
						</Row>
						<Row>
							<h1>Snor (1 Bar : 1 hr)</h1>
                        	<Bar/>
						</Row>
						<Row>
							<HRSensor/>
						</Row>
						<Row>
							<BtnShare/>
						</Row>
                	</Col>
                </Row>
			</Container>
        </div>
    );
  }



export default SleepSc;
