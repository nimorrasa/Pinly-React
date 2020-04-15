import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FormLogin  from '../components/form/login/FormLogin.js';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';
import LoadingScreen from 'react-loading-screen'

const Login = (props) => {
    const history = useHistory();
    const [isLoading,setIsLoading] = useState(true);
    const [userId,setUserId] = useState('');
    const [step,setStep] = useState('login_with_email');
    const [theme,setTheme] = useState('theme_light');
    const [navbarTheme, setNavbarTheme] = useState('light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
    //   setNavbarTheme(current_theme);
    //   setTheme('theme_'+current_theme);
    //   props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
    const onStepChange = useCallback((step) => { setStep(step)},[setStep]);
    const handleUserId = useCallback((newUserId) => {
        props.onLogin(newUserId);
        setUserId(newUserId);
    },['setUserId']);

    useEffect(() => {
		async function fetchData (user_id) {
			let user = await firebase.database().ref('/users/' + user_id).once('value');
			return user.val();
        }
        
        props.onChangeTheme('theme_light');
    
        firebase.auth().onAuthStateChanged(async function(user) {
            if (user) {
                let userData = await fetchData (user.uid);
                setUserId(user);
            }
            setIsLoading(false);
        });
    
	},[]);


    return (
        <LoadingScreen
            loading={isLoading}
            bgColor={theme == 'theme_light' ? '#F5F9FD' : '141313'}
            spinnerColor='#9ee5f8'
            logoSrc='/logo.png'
            text='Loading'
        > 
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={true}></MyNavbar>
            <div className="loading" style={{textAlign: "center",top: "30vh",height: "50vh",color: "white",display : (!isLoading ? 'none' : 'block' )}}>
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>
            <div className={"App Login theme_light"} style={{display : (isLoading ? 'none' : 'block' )}}>
                <Row>
                    <Col className="col_left" lg="6" xs="12">
                        <h2 id="label" className="m-0 p-0"><b>LOGIN</b></h2>
                        <h4 className="general_section m-0 p-0">Don't have on account? <Link style={{textDecoration: 'none'}} to="/sign_up"><span style={{color: "#3cc7c3"}}>Create your account</span></Link></h4>
                        <FormLogin isLoading={isLoading} setIsLoading={setIsLoading} firebase={firebase} onChangeStep={onStepChange} onLogin={handleUserId}></FormLogin>
                    </Col>
                    <Col className="col_right" lg="6" xs="12">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                        </header>
                    </Col>

                </Row>
            </div>
        </div>
        </LoadingScreen>

    );
}

export default Login;