import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MyNavbar from '../components/navbar/MyNavbar.js';
import dailytest from './dailytest';
import { Container, Row, Col } from 'reactstrap';
import '../css/Sleep_score.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import Component and Function
import PieChart from '../components/graph/PieChart.js';
import Bar from '../components/SleepScorePage/Bar';
import SleepScore from '../components/SleepScorePage/SleepScore';  //show content SleepScore
import go_to_sleep from '../components/SleepScorePage/btngotosleep.png';
import BtnSummary from '../components/SleepScorePage/BtnSummary';
import BtnShare from '../components/SleepScorePage/BtnShare';
import HRSensor from '../components/SleepScorePage/HRSensor';
import Temp from '../components/SleepScorePage/Temp';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';
import { Route, Switch,BrowserRouter, Link } from 'react-router-dom';
import { get_mic_summary, getDetail, get_today_string, toPercent, get_date_string } from '../helpers';

//Create Component - JSX 
const SleepSc = (props) => {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['theme']);

  const [sleepScoreToday,setSleepScoreToday] = useState(0);
  const [sleepScoreYesterday,setSleepScoreYesterday] = useState(0);
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
  const [isHoverGoToSleep,setIsHoverGoToSleep] = useState(false);

  const [currentSleep,setCurrentSleep] = useState(new Date());
  const [currentWakeUp,setCurrentWakeUp] = useState(new Date());
  const [totalSleep,setTotalSleep] = useState(0);

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

		async function fetchDataHardware (date,mac_address) {
			let hardwares = await getDetail(date,mac_address);
			return !hardwares.doc ? null : hardwares.doc;
		}
		
		async function fetchDataMic (mac_address) {
			let date = get_today_string();
			let mics = await get_mic_summary(date,mac_address);
			return !mics.doc ? null : formatMicData(mics.doc);
		}
    
        firebase.auth().onAuthStateChanged(async function(user) {
			if (user) {
				let data = await fetchData(user.uid);
				setUserData(data);

				let today_data = await fetchDataHardware(get_today_string(),data.mac_address);
				if(today_data && today_data.Sleep_Score_Today) setSleepScoreToday(toPercent(today_data.Sleep_Score_Today));
                setTotalSleep(data.sleep_period);
                setCurrentSleep(data.current_sleep);
                setCurrentWakeUp(data.current_wakeup);



				let date = new Date();
				date.setDate(date.getDate() - 1);

				// console.log(date);
				let yesterday_data = await fetchDataHardware(get_date_string(date),data.mac_address);
				if(yesterday_data && yesterday_data.doc) setSleepScoreYesterday(toPercent(yesterday_data.Sleep_Score_Today));

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

	const onMouseOverGoToSleep = useCallback(() => { setIsHoverGoToSleep(true); },[setIsHoverGoToSleep]);
    const onMouseOutGoToSleep = useCallback(() => { setIsHoverGoToSleep(false); },[setIsHoverGoToSleep]);

    return(
<div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className="loading" style={{textAlign: "center",top: "30vh",height: "50vh",color: "white",display : (!isLoading ? 'none' : 'block' )}}>
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>
            <div className={"App Sleep_score "+theme} style={{display : (isLoading ? 'none' : 'block' )}}>
				<Row className="content">
          			<Col lg="6" md="6" xs="6">
						<Row style={{paddingLeft: "25%"}}>
							<SleepScore sleepScoreToday={sleepScoreToday} sleepScoreYesterday={sleepScoreYesterday}/>
						</Row>
						  <Row style={{paddingLeft: "25%"}}>
						  <PieChart timeSize="10px" theme={navbarTheme} totalSleep={totalSleep} currentSleep={currentSleep} currentWakeUp={currentWakeUp} value={sleepScoreToday}></PieChart>
						  </Row>
						  <Row style={{paddingLeft: "30%"}}>
						  	<Temp value={temp}/>
						  </Row>
        			</Col>
					<Col lg="6" md="6" xs="6">
						<Row style={{textAlign: "center"}}>
							<Col lg="12" md="12" xs="12">
								<h1>Ready to Sleep?</h1>
								<Link to="/daily_test"><img src={go_to_sleep} onMouseOver={onMouseOverGoToSleep} onMouseOut={onMouseOutGoToSleep} alt="Button Go To Sleep _Daily Test" style={{ opacity: (isHoverGoToSleep ? "50%" : "100%"), maxHeight: "22vh"}}></img></Link>
							</Col>
						</Row>
						<Row style={{textAlign: "center"}}>
							<Col lg="12" md="12" xs="12">
								{/* <h1 style={{textAlign: "left"}}>Snore Level (dB)</h1> */}
								<Bar values={summaryMics}/>
								<strong style={{textAlign: "center"}}>Hour Times (hr)</strong>
							</Col>
						</Row>
						<Row style={{paddingLeft: "20%"}}>
							<HRSensor value={hearthRate}/>
						</Row>
                	</Col>
                </Row>
				<Row className="button">
					<Col md="4" lg="4" xs="4">
					</Col>
					<Col md="4" lg="4" xs="4" style={{padding: 0, textAlign: "center", width: "100%"}}>
						<button type="button" onClick={goToHistory} className="btn-default" data-toggle="modal" data-target="#myModal">
							HISTORY
						</button>
					</Col>
					<Col md="4" lg="4" xs="4">
					</Col>
				</Row>
            </div>
        </div>
    );
  }



export default SleepSc;
