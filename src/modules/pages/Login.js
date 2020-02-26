import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FormLogin  from '../components/form/login/FormLogin.js';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

const Login = (props) => {
    props.handleThemeChange('light');
    const [theme,setTheme] = useState('theme_light');

    useEffect(() => { setTheme('theme_light')});

    return (
        <div className={"App Login theme_light"}>
            <Row>
                <Col className="col_left" lg="6" xs="12">
                    <h2 id="label" class="m-0 p-0"><b>LOGIN</b></h2>
					<h4 className="general_section m-0 p-0">Don't have on account? <Link style={{textDecoration: 'none'}} to="/sign_up"><span style={{color: "#3cc7c3"}}>Create your account</span></Link></h4>
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