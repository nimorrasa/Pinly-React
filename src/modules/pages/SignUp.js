import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FormSignUp  from '../components/form/sign_up/FormSignUp.js';
import logo from '../../images/logo.png';

const SignUp = (props) => {
    const [step,setStep] = useState('sign_up_step_1');
    props.handleThemeChange('light');
    const [theme,setTheme] = useState('theme_light');

    const onStepChange = useCallback((step) => { setStep(step)},[setStep]);

    useEffect(() => { setTheme('theme_light')});

    return (
        <div className={"App Sign_up theme_light"}>
            <Row>
                <Col className="col_left" lg="6" xs="12" style={{display: (step == 'sign_up_step_1' ? 'block' : 'none')}}>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
                </Col>
                <Col className="col_right" lg="6" xs="12">
                    <h1>Welcome to PINLY</h1>
                    <p>PINLY is an application for sleep monitoring just for you.</p>
                    <FormSignUp onStepChange={onStepChange}></FormSignUp>
                </Col>
                <Col className="col_right blank" lg="6" xs="12" style={{backgroundColor: "rgb(76, 199, 195)", display: (step == 'sign_up_step_2' ? 'block' : 'none')}}>
                </Col>
            </Row>
        </div>
    );
}

export default SignUp;