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
import { getDetail, get_sleep_data_by_macaddress } from '../helpers';

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
    
        firebase.auth().onAuthStateChanged(async function(user) {
			if (user) {
                let data = await fetchData(user.uid);
                setUserData(data);
            }else{
                history.push('/login');
            }
            setIsLoading(false);
        });
    

    },[firebase]);

    const get_score_weekly = useCallback(
        async (user_id,mac_address) => {
            const sleep_data = await get_sleep_data_by_macaddress(user_id,mac_address);
            
            // console.log(sleep_data)
            let sum_score = 0;
            let count = 0;

            for (const property in sleep_data.doc) {
                count++;
                sum_score += sleep_data.doc[property]['Sleep_Score_Today'];
            }
            
            let score = Math.ceil(sum_score/count);
            console.log(sum_score,count,score);
            setSleepScoreWeekly(score);
        },
        []
    );

    const goToSleepScore = useCallback(() => { history.push('/sleep_score')},[]);

    const goToHistory = useCallback(() => { history.push('/history')},[]);

    const fetchData = useCallback(async (userData) => {
        const res = await getDetail(userData.mac_address);
        const sleepData = res.doc;
        await get_score_weekly(userData.uid,userData.mac_address);

        if(sleepData && sleepData.Sleep_Score_Today > 0) setSleepScoreToday(sleepData.Sleep_Score_Today * 100 / 10);
        setTotalSleep(userData.sleep_period);
        setCurrentSleep(userData.current_sleep);
        setCurrentWakeUp(userData.current_wakeup);
    }, [])

    useEffect(
        () => {
            if (userData) {
                fetchData(userData)
            }
        },
        [userData]
    )



    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className="loading" style={{textAlign: "center",top: "30vh",height: "50vh",color: "white",display : (!isLoading ? 'none' : 'block' )}}>
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>
            <div className={"App Profile "+theme} style={{display : (isLoading ? 'none' : 'block' )}}>
                <Row>
                    <Col className="profile card left" lg="5" sm="6" >
                       <ProfileMain></ProfileMain>
                    </Col>
                    <Col lg="2" sm="0" style={{textAlign: "center", paddingTop: "35vh"}}>
                    <img src={right_chevron}/>
                    </Col>
                    <Col className="profile right" lg="5" sm="6">
                        <div className="center">
                        <div><h1>Today</h1></div>
                        <PieChart theme={navbarTheme} totalSleep={totalSleep} currentSleep={currentSleep} currentWakeUp={currentWakeUp} value={sleepScoreToday}></PieChart>
                        <h3>Your sleep score today is {parseInt(sleepScoreToday)}%</h3>
                        <h3>{sleepScoreWeekly}% for week</h3>
                        <div>
                            <Row>
                                <Col lg="6" md="6" xs="12"><Button className="App-button moreinfo" onClick={goToSleepScore}>MORE INFO</Button></Col>
                                <Col lg="6" md="6" xs="12"><Button className="App-button" onClick={goToHistory}>HISTORY</Button></Col>
                            </Row>
                            <Row>
                                <Button className="App-button">SHARE</Button>
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