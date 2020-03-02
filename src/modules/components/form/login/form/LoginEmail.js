import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "reactstrap";
import { validateEmail } from "../../utils.js";
import MyLink from "../../../MyLink.js";
import usePasswordValidator from "../../usePasswordValidator.js";
import facebook_logo from '../../../../../images/facebook-512.png';
import google_logo from '../../../../../images/google-plus-512.png';
import { useHistory } from "react-router-dom";
import '../FormLogin.css';

const LoginEmail = (props) => {
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordShow,setPasswordShow] = useState(false);

    const togglePassword = useCallback(() => { setPasswordShow(!passwordShow); });
    const [password, setPassword, passwordError] = usePasswordValidator({
        min: 8,
        max: 15
    });

    const handleEmail = useCallback((event) => { setEmail(event.target.value)},[setEmail]);
    const handlePassword = useCallback((event) => { setPassword(event.target.value)},[setPassword]);

    useEffect(
        () => {
        if (!email) {
            setEmailError("");
        } else {
            if (validateEmail(email)) {
            setEmailError("");
            } else {
            setEmailError("Please enter a valid email.");
            }
        }
        },
        [email]
    );

    function passVerified(){ 
        return emailError === "" && passwordError === "";
    };


    const onSubmit = values => {
        if(!passVerified()) {
            alert('Please check error before submit!');
            return;
        }

        props.onResult({
            type : 'login_with_email',
            email : values.email,
            password : values.password
        });
    };

    const handleFacebook = useCallback(() => {
        props.onResult({
            type : 'facebook',
        });
    },[]);
    
    const handleGoogle = useCallback(() => {
        props.onResult({
            type : 'google',
        });
    },[]);
    


    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Col className='login' xs='12'>
            <Row id="email"> 
                <Col lg='8' xs='10' style={{paddingRight: "0"}}>
                <p className="m-0">Email</p>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Email"
                    ref={register({
                        required: 'Required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid email address"
                        }
                        })}
                    />
                    <div className="error">{emailError}</div>
                </Col>
            </Row>
            <Row>
            <Col id="password" lg='8' xs='10' style={{paddingRight: "0"}}>
                <p className="m-0">Password</p>
                <input
                type={!passwordShow ? 'password' : 'text'}
                name="password"
                value={password}
                onChange={handlePassword}
                id="password"
                placeholder="password"
                ref={register({required: 'Required'})}
                />
                <div className="error">{passwordError}</div>
                </Col>
                <Col id="password" lg='1' xs='1' style={{paddingLeft: "2px", top: "2px"}}>
                <p className="m-0" style={{color: "transparent"}}>Password</p>
                <span className={"fa fa-fw fa-eye field-icon toggle-password"} onClick={togglePassword}></span>
                </Col>
            </Row>
            <Row style={{padding: "0"}}>
                <Col lg='4' xs='6'>
                    <p>
                        <input
                            type="checkbox"
                            ref={register({})}
                            name="is_remember"
                            style={{width: "10px"}}/>
                            Remember Me
                    </p>
                </Col>
                <Col lg='1' xs='1'>
                </Col>
                <Col lg='5' xs='5' >
                    <MyLink destination='?forgot_password' text='Forgot Password?'></MyLink>
                </Col>
            </Row>
            <Row>
                <Col className="button" lg='5' xs='7'>
                </Col>
                <Col className="button" lg='3' xs='3' style={{paddingRight: "0"}}>
                    <button type="submit">Login</button>
                </Col>
                </Row>
                <Row style={{paddingTop: "10%"}}>
                <Col lg='3' xs='4'>
                    <p>Or login with </p>
                </Col>
                <Col lg='2' xs='3'>
                    <button className="my-button button_image" type="button" onClick={handleFacebook}><img id="facebook_login" src={facebook_logo} width="50" height="50" alt=""/></button>
                </Col>
                <Col lg='2' xs='3'>
                    <button className="my-button button_image" type="button" onClick={handleGoogle}><img id="google_login" src={google_logo} width="50" height="50" alt=""/></button>
                </Col>
                </Row>
            </Col>
        </form>
        </div>
    );
}
export default LoginEmail;