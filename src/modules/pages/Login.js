import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FormLogin  from '../components/form/login/FormLogin.js';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';

const Login = (props) => {
    const history = useHistory();
    props.onChangeTheme('theme_light');
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
        if(firebase.auth().currentUser != null) {
            setUserId(firebase.auth().currentUser.uid);
        }
    });

    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={true}></MyNavbar>
            <div className={"App Login theme_light"}>
                <Row>
                    <Col className="col_left" lg="6" xs="12">
                        <h2 id="label" className="m-0 p-0"><b>LOGIN</b></h2>
                        <h4 className="general_section m-0 p-0">Don't have on account? <Link style={{textDecoration: 'none'}} to="/sign_up"><span style={{color: "#3cc7c3"}}>Create your account</span></Link></h4>
                        <FormLogin firebase={firebase} onChangeStep={onStepChange} onLogin={handleUserId}></FormLogin>
                    </Col>
                    <Col className="col_right" lg="6" xs="12">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                        </header>
                    </Col>

                </Row>
            </div>
        </div>

    );
}

export default Login;