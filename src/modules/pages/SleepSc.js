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
import { get_mic_summary } from '../helpers';

//Create Component - JSX 
const SleepSc = (props) => {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['theme']);

  const [sleepScoreToday,setSleepScoreToday] = useState(70);
  const [sleepScoreYesterday,setSleepScoreYesterday] = useState(50);
  const [temp,setTemp] = useState(25);
  const [summaryMics,setSummaryMics] = useState({
	  hours : [],
	  series : []
  });
  const [hearthRate,setHearthRate] = useState(85);
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

  const goToHistory = useCallback(() => { history.push('/history'); },[]);

  useEffect(() => {
    handleNavbarThemeChange(cookies.theme);
		async function fetchData (user_id) {
            let user = await firebase.database().ref('/users/' + user_id).once('value');
			return user.val();
		}
		

		async function fetchDataMic (mac_address) {
			let date = (new Date()).toISOString();
			date = date.substring(0, 10);
			let mics = await get_mic_summary(date,mac_address);
			console.log(mics);
			return !mics.doc ? null : formatMicData(mics.doc);
		}
    
        firebase.auth().onAuthStateChanged(async function(user) {
			if (user) {
				let data = await fetchData(user.uid);
				setUserData(data);
				let micData = await fetchDataMic(data.mac_address);
				setSummaryMics(micData);

            }else{
                history.push('/login');
            }
            setIsLoading(false);
        });
    

	},[]);

	function formatMicData (array) {
		let hours = [];
		let series = [];

		console.log(array)

		for (let index = 0; index < array.length; index++) {
			const element = array[index];
			hours.push(element['Hour_num']);
			series.push(element['Mic']);
		}
		return {
			hours : hours,
			series : series
		};
	}

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
							<SleepScore sleepScoreToday={sleepScoreToday} sleepScoreYesterday={sleepScoreYesterday}/>
						</Row>
						  <Row>
						  	<RadialBars value={sleepScoreToday}/>
						  </Row>
						  <Row>
						  	<Temp value={temp}/>
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
                        	<Bar values={summaryMics}/>
						</Row>
						<Row>
							<HRSensor value={hearthRate}/>
						</Row>
                	</Col>
                </Row>
				<Row>
					<Col md="12" lg="12" xs="12">
						<button type="button" onClick={goToHistory} className="btn-default" data-toggle="modal" data-target="#myModal">
							SUMMARY
						</button>
					</Col>
				</Row>
			</Container>
        </div>
    );
  }



export default SleepSc;
