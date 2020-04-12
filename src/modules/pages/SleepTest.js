import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MyNavbar from '../components/navbar/MyNavbar.js';
import { Link } from 'react-router-dom';
import { Row, Col, CardBody, Card, CardTitle, CardText, Button, Media } from "reactstrap";
import '../css/SleepTest.css';
import sleep_score from '../../images/button/sleep_score.png';
import go_to_sleep from '../../images/button/go_to_sleep.png';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';

const SleepTest = (props) => {
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['theme']);
    const [ userData, setUserData ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);
    const [theme,setTheme] = useState(props.theme);
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');
    const [isHoverSleepScore,setIsHoverSleepScore] = useState(false);
    const [isHoverGoToSleep,setIsHoverGoToSleep] = useState(false);

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);

    const onMouseOverSleepScore = useCallback(() => { setIsHoverSleepScore(true); },[setIsHoverSleepScore]);
    const onMouseOutSleepScore = useCallback(() => { setIsHoverSleepScore(false); },[setIsHoverSleepScore]);

    const onMouseOverGoToSleep = useCallback(() => { setIsHoverGoToSleep(true); },[setIsHoverGoToSleep]);
    const onMouseOutGoToSleep = useCallback(() => { setIsHoverGoToSleep(false); },[setIsHoverGoToSleep]);
    
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

    useEffect(() => { setTheme(props.theme)});
    var ButtonSize ={
        width: "100%",
        height: "100%",
        padding: 20,
    }

    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className="loading" style={{textAlign: "center",top: "30vh",height: "50vh",color: "white",display : (!isLoading ? 'none' : 'block' )}}>
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>
            <div className={"App Sleep_test "+theme} style={{display : (isLoading ? 'none' : 'block' )}}>
                <Row>
                    <Col lg="6" md="6" xs="12">
                        <Card>
                            <CardTitle>Show sleep score</CardTitle>
                            <CardBody>
                                <Link to="/sleep_score">
                                    <a href="sleep_score" onMouseOver={onMouseOverSleepScore} onMouseOut={onMouseOutSleepScore} style={{opacity : (isHoverSleepScore ? '50%' : '100%')}}><img className="button sleep_test_button" src={sleep_score}></img></a>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6" md="6" xs="12">
                        <Card>
                            <CardTitle>Ready to Sleep?</CardTitle>
                            <CardBody style={{objectFit: "contain"}}>
                                <Link to="/daily_test">
                                    <a href="daily_test" onMouseOver={onMouseOverGoToSleep} onMouseOut={onMouseOutGoToSleep} style={{opacity : (isHoverGoToSleep ? '50%' : '100%')}}><img className="button sleep_test_button"  src={go_to_sleep}></img></a>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default SleepTest;
