import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FormSignUp  from '../components/form/sign_up/FormSignUp.js';
import logo from '../../images/logo.png';

const SignUp = (props) => {
    props.handleThemeChange('light');
    const [theme,setTheme] = useState('theme_light');

    useEffect(() => { setTheme('theme_light')});

    return (
        <div className={"App Sign_up theme_light"}>
            <Row>
                <Col className="col_left" lg="6" xs="12">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
                </Col>
                <Col className="col_right" lg="6" xs="12">
                    <h1>Welcome to PINLY</h1>
                    <p>PINLY is an application for sleep monitoring just for you.</p>
                    <FormSignUp></FormSignUp>
                </Col>
            </Row>
        </div>
    );
}

export default SignUp;