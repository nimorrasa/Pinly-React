import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MyNavbar from '../components/navbar/MyNavbar.js';
import dailytest from './dailytest';
import { Container, Row, Col } from 'reactstrap';
import '../css/Sleep_score.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import Component ที่ต้องใช้
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
import LoadingScreen from 'react-loading-screen';

//สร้าง component ชื่อ SleepSc โดยให้รับตัวแปรมาเป็น props ด้วย (React Hook)
const SleepSc = (props) => {

	//ประกาศตัวแปรที่จำเป็นต้องใช้ใน component นี้
	const history = useHistory();
	const [cookies, setCookie, removeCookie] = useCookies(['theme']);

	const [sleepScoreToday,setSleepScoreToday] = useState(0);
	const [sleepScoreYesterday,setSleepScoreYesterday] = useState(0);
	const [temp,setTemp] = useState(0);
	const [summaryMics,setSummaryMics] = useState({
		hours : [],
		series : []
	});
	const [hearthRate,setHearthRate] = useState(0);
	const [ userData, setUserData ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);
	const [theme,setTheme] = useState(props.theme);
	const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');
	const [isHoverGoToSleep,setIsHoverGoToSleep] = useState(false);

	const [currentSleep,setCurrentSleep] = useState(new Date());
	const [currentWakeUp,setCurrentWakeUp] = useState(new Date());
	const [totalSleep,setTotalSleep] = useState(0);

	// สร้าง callback function สำหรับการเปลี่ยนแปลง theme
	const handleNavbarThemeChange = useCallback((current_theme) => {
		setNavbarTheme(current_theme);
		setTheme('theme_'+current_theme);
		props.onChangeTheme('theme_'+current_theme);
	},[setNavbarTheme,setTheme]);


	// update theme ด้วย cookie
	useEffect(() => {
		handleNavbarThemeChange(cookies.theme);
	},[cookies.theme]);

	const goToHistory = useCallback(() => { history.push('/history'); },[]);

	// สำหรับตั้งค่าตัวแปรต่างๆก่อนจะ reder html ออกมา โดยจะดึงข้อมูลจาก firebase และ หลังบ้านมาอัพเดทเพื่อนำไปแสดง
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

					let today_data = await fetchDataHardware(get_today_string(),data && data.mac_address);
					if(today_data && today_data.Sleep_Score_Today) setSleepScoreToday(toPercent(today_data.Sleep_Score_Today));
					setTotalSleep(data && data.sleep_period);
					setCurrentSleep(data && data.current_sleep);
					setCurrentWakeUp(data && data.current_wakeup);
					if(today_data && today_data.Heart_Rate) setHearthRate(today_data.Heart_Rate);
					if(today_data && today_data.Temp)  setTemp(today_data.Temp);

					let date = new Date();
					date.setDate(date.getDate() - 1);
					let yesterday_data = await fetchDataHardware(get_date_string(date),data && data.mac_address);
					if(yesterday_data && yesterday_data) setSleepScoreYesterday(toPercent(yesterday_data.Sleep_Score_Today));

					let micData = await fetchDataMic(data && data.mac_address);
					setSummaryMics(micData);

				}else{
					history.push('/login');
				}
				setIsLoading(false);
			});
		

	},[]);

	// จัดฟอเมตค่า Mic
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

	// สำหรับทำ Hover ให้กับปุ่ม Go to sleep
	const onMouseOverGoToSleep = useCallback(() => { setIsHoverGoToSleep(true); },[setIsHoverGoToSleep]);
    const onMouseOutGoToSleep = useCallback(() => { setIsHoverGoToSleep(false); },[setIsHoverGoToSleep]);

	// Render ออกไปเป็น html
    return(
		<LoadingScreen
			bgColor={theme == 'light' ? '#F5F9FD' : '141313'}
			loading={isLoading}
			spinnerColor='#9ee5f8'
			logoSrc='/logo.png'
			text='Loading'
		> 
		<div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className="loading" style={{textAlign: "center",top: "30vh",height: "50vh",color: "white",display : (!isLoading ? 'none' : 'block' )}}>
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>
            <div className={"App Sleep_score "+theme} style={{display : (isLoading ? 'none' : 'block' )}}>
				<Row className="content">
          			<Col lg="6" md="6" xs="12">
					  	<h1 style={{fontSize: "1.8rem"}}>Sleep score</h1>
						<SleepScore sleepScoreToday={sleepScoreToday} sleepScoreYesterday={sleepScoreYesterday}/>
						<PieChart isSleepScore={true} showTime={false} hourSize="37px" timeSize="18px" theme={navbarTheme} totalSleep={totalSleep} currentSleep={currentSleep} currentWakeUp={currentWakeUp} value={sleepScoreToday}></PieChart>
						<HRSensor value={hearthRate}/>
					</Col>
					<Col lg="6" md="6" xs="12">
						<Col lg="12" md="12" xs="12">
							<h1 style={{fontSize: "1.8rem"}}>Ready to Sleep?</h1>
							<Link to="/daily_test"><img src={go_to_sleep} onMouseOver={onMouseOverGoToSleep} onMouseOut={onMouseOutGoToSleep} alt="Button Go To Sleep _Daily Test" style={{ opacity: (isHoverGoToSleep ? "50%" : "100%"), maxHeight: "20vh"}}></img></Link>
						</Col>
						<Col lg="12" md="12" xs="12" className="bar_layout">
							<Bar theme={navbarTheme} values={summaryMics}/>
							<p style={{textAlign: "center"}}>Hour Times (hr)</p>
						</Col>
						<Col lg="12" md="12" xs="12">
							<Temp value={temp}/>
						</Col>
                	</Col>
					<Col md="4" lg="4" xs="12">
					</Col>
					<Col md="4" lg="4" xs="12" style={{padding: 0, textAlign: "center", width: "100%"}}>
						<button style={{fontSize: "2rem"}} type="button" onClick={goToHistory} className="btn-default" data-toggle="modal" data-target="#myModal">
							HISTORY
						</button>
					</Col>
					<Col md="4" lg="4" xs="12">
					</Col>
                </Row>
            </div>
        </div>
		</LoadingScreen>
    );
  }


// export เพื่อให้สามารถเรียกใช้ component นี้ได้ในที่อื่นโดยการ import
export default SleepSc;
