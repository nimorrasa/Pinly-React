import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { Row, Col, CardBody, CardSubtitle, CardTitle, CardText, Button, Card } from "reactstrap";
import firebase from 'firebase';
import { useHistory } from "react-router-dom";
import ProfileForm from '../components/form/profile/ProfileForm.js';
import ProfileDetail from '../components/form/profile/ProfileDetail.js';
import PieChart from '../components/graph/PieChart.js';
import right_chevron from '../../images/icon/right_chevron.png';
import '../css/Profile.css';

const Profile = (props) => {
    const history = useHistory();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ userData, setUserData ] = useState({});
    const [ theme, setTheme ] = useState(props.theme);
    const [ navbarTheme, setNavbarTheme ] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');
    const [ step, setStep ] = useState('view_profile');

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
  
    useEffect(() => { 
        setTheme(props.theme);
    },[props.theme]);

    useEffect(() => {
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
    

    const goToSleep = useCallback(() => { history.push('/sleep_test')},[]);



    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className="loading" style={{textAlign: "center",top: "30vh",height: "50vh",color: "white",display : (!isLoading ? 'none' : 'block' )}}>
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>
            <div className={"App Profile "+theme} style={{display : (isLoading ? 'none' : 'block' )}}>
                <Row>
                    <Col className="profile left" lg="5" sm="6" >
                        <Card>
                            <CardTitle>
                                <Row>
                                    <Col lg="10" md="10" xs="10"></Col>
                                    <Col lg="2" md="2" xs="2">
                                        <Button className="edit_button">Edit</Button>
                                    </Col>
                                </Row>
                            </CardTitle>
                            <CardBody>
                                <ProfileDetail userData={userData}></ProfileDetail>
                            </CardBody>
                        </Card>

                    </Col>
                    <Col lg="2" sm="0" style={{textAlign: "center", paddingTop: "35vh"}}>
                    <img src={right_chevron}/>
                    </Col>
                    <Col className="profile left" lg="5" sm="6">
                        <div className="center">
                        <div><h1>Today</h1></div>
                        <PieChart theme={navbarTheme}></PieChart>
                        <h3>Your sleep score today is 95%</h3>
                        <h3>67% for week</h3>
                        <div>
                            <Row>
                                <Col lg="6" md="6" xs="12"><Button className="App-button moreinfo" onClick={goToSleep}>MORE INFO</Button></Col>
                                <Col lg="6" md="6" xs="12"><Button className="App-button">HISTORY</Button></Col>
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