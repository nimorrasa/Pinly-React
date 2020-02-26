import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FormLogin  from '../components/form/login/FormLogin.js';
import logo from '../../images/logo.png';

const Login = (props) => {
    props.handleThemeChange('light');
    const [theme,setTheme] = useState('theme_light');

    useEffect(() => { setTheme('theme_light')});

    return (
        <div className={"App Login theme_light"}>
            <Row>
                <Col className="col_left" lg="6" xs="12">
                    <h1>Welcome to PINLY</h1>
                    <p>PINLY is an application for sleep monitoring just for you.</p>
                    <FormLogin></FormLogin>
                </Col>
                <Col className="col_right" lg="6" xs="12">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
                </Col>

            </Row>
        </div>
    );
}

export default Login;