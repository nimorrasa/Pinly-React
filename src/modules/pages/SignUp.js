import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FormSignUp  from '../components/form/sign_up/FormSignUp.js';
import logo from '../../images/logo.png';
import MyNavbar from '../components/navbar/MyNavbar.js';

const SignUp = (props) => {
    props.onChangeTheme('theme_light');
    const [userData,setUserData] = useState({
        email : '',
        username : '',
        birthdate : '',
        gender : '',
        disease : ''
    });
    const [userId,setUserId] = useState('');
    const [step,setStep] = useState('sign_up_step_1');
    const [theme,setTheme] = useState('theme_light');
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
        // Do nothing
    },[setNavbarTheme,setTheme]);
  
    const onStepChange = useCallback((step) => { setStep(step); },[setStep]);
    const onSubmit = useCallback((submitData) => {
        setUserData({
            email : submitData.email,
            username : submitData.username,
            birthdate : submitData.bdate+"-"+submitData.bmonth+"-"+submitData.byear,
            weight : submitData.weight,
            height : submitData.height,
            gender : submitData.gender,
            disease : submitData.disease
        })
        setUserId(submitData.userId);
        props.onLogin(submitData.userId);
    },[setUserData,setUserId]);

    useEffect(() => { setTheme('theme_light')});

    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={true}></MyNavbar>
            <div className={"App Sign_up theme_light"}>
                <Row>
                    <Col className="col_left" lg="6" xs="12">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" style={{display: (step == 'sign_up_step_1' ? 'block' : 'none')}}/>
                        </header>
                    </Col>
                    <Col className="col_right" lg="6" xs="12">
                        <h1>Welcome to PINLY</h1>
                        <p>PINLY is an application for sleep monitoring just for you.</p>
                        <FormSignUp firebase={props.firebase} onStepChange={onStepChange} onSubmit={onSubmit}></FormSignUp>
                    </Col>
                    <Col className="col_right blank" lg="6" xs="12" style={{backgroundColor: "rgb(76, 199, 195)", display: (step == 'sign_up_step_2' ? 'block' : 'none')}}>
                    </Col>
                </Row>
            </div>
        </div>
        
    );
}

export default SignUp;