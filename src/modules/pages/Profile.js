import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { Row, Col, CardBody, CardSubtitle, CardTitle, CardText, Button, Card } from "reactstrap";
import firebase from 'firebase';
import { useHistory } from "react-router-dom";
import ProfileMain from '../components/form/profile/ProfileMain.js';
import PieChart from '../components/graph/PieChart.js';
import right_chevron from '../../images/icon/right_chevron.png';
import '../css/Profile.css';
import { useCookies } from 'react-cookie';
import { getDetail, get_sleep_data_by_macaddress, get_today_string, toPercent } from '../helpers';

const Profile = (props) => {
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['theme']);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ userData, setUserData ] = useState(null);
    const [ theme, setTheme ] = useState(props.theme);
    const [sleepScoreToday,setSleepScoreToday] = useState(0);
    const [sleepScoreWeekly,setSleepScoreWeekly] = useState(0);
    const [currentSleep,setCurrentSleep] = useState(new Date());
    const [currentWakeUp,setCurrentWakeUp] = useState(new Date());
    const [totalSleep,setTotalSleep] = useState(0);
    const [ navbarTheme, setNavbarTheme ] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');
    const [ step, setStep ] = useState('view_profile');

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
            // if(user.val() == null) return null;
			return user.val();
        }

        async function fetchDataScore (mac_address) {
            let res = await getDetail(get_today_string(),mac_address);
            return res;
        }


        async function fetchDataWeekly (user_id,mac_address) {
            const sleep_data = await get_sleep_data_by_macaddress(user_id,mac_address);
            return sleep_data;
        }
    
        firebase.auth().onAuthStateChanged(async function(user) {
			if (user) {
                let data = await fetchData(user.uid);
                setUserData(data);

                let hardwares = await fetchDataScore(data && data.mac_address);
                if(hardwares.doc && hardwares.doc.Sleep_Score_Today > 0) setSleepScoreToday(toPercent(hardwares.doc.Sleep_Score_Today));
                setTotalSleep(data && data.sleep_period);
                setCurrentSleep(data && data.current_sleep);
                setCurrentWakeUp(data && data.current_wakeup);

                let weeklyScore = await fetchDataWeekly(user.uid, data && data.mac_address);
                if(weeklyScore.doc) setSleepScoreWeekly(toPercent(getWeekly(weeklyScore.doc)));
            }else{
                history.push('/login');
            }
            setIsLoading(false);
        });
    

    },[firebase]);

    function getWeekly(datas) {
        let sum_score = 0;
        let count = 0;
        for (const property in datas) {
            count++;
            sum_score += datas[property]['Sleep_Score_Today'];
        }
        return count == 0 ? 0 : Math.ceil(sum_score/count);
    }

    const goToSleepScore = useCallback(() => { history.push('/sleep_score')},[]);

    const goToHistory = useCallback(() => { history.push('/history')},[]);

    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className="loading" style={{textAlign: "center",top: "30vh",height: "50vh",color: "white",display : (!isLoading ? 'none' : 'block' )}}>
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>
            <div className={"App Profile "+theme} style={{display : (isLoading ? 'none' : 'block' )}}>
                <Row>
                    {/* <Col className="profile card left" lg="6" md="12" xs="12" > */}
                    <ProfileMain></ProfileMain>
                    {/* </Col> */}
                    <Col className="profile right" lg="6" md="12" xs="12">
                        <div className="center">
                        <div><h1>Today</h1></div>
                        <PieChart isSleepScore={false} showTime={true} theme={navbarTheme} totalSleep={totalSleep} currentSleep={currentSleep} currentWakeUp={currentWakeUp} value={sleepScoreToday}></PieChart>
                        <h3>Your sleep score today is {parseInt(sleepScoreToday)}%</h3>
                        <h3>{sleepScoreWeekly}% for week</h3>
                        <div>
                            <Row>
                                <Col lg="6" md="6" xs="12"><Button className="App-button button moreinfo" onClick={goToSleepScore}>MORE INFO</Button></Col>
                                <Col lg="6" md="6" xs="12"><Button className="App-button button " onClick={goToHistory}>HISTORY</Button></Col>
                            </Row>
                        </div>
                        </div>
                    </Col>
                </Row>
                        
                
                
            </div>
        </div>

    );
}

export default Profile;