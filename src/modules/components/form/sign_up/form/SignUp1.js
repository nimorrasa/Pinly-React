import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "reactstrap";
import { validateEmail } from "../../utils.js";
import usePasswordValidator from "../../usePasswordValidator.js";
import BirthDateInput from '../../../../components/input/BirthdateInput.js';
import '../FormSignUp.css';

const SignUp1 = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [passwordShow,setPasswordShow] = useState(false);

    const togglePassword = useCallback(() => { setPasswordShow(!passwordShow); });
    const [password, setPassword, passwordError] = usePasswordValidator({
        min: 8,
        max: 15
    });

    const handleUsername = useCallback((event) => { console.log(event.target.value); setUsername(event.target.value)},[setUsername]);
    const handleEmail = useCallback((event) => { setEmail(event.target.value)},[setEmail]);
    const handlePassword = useCallback((event) => { setPassword(event.target.value)},[setPassword]);
    const handleConfirmPassword = useCallback((event) => { setConfirmPassword(event.target.value)},[setConfirmPassword]);


    useEffect(
        () => {
        if (!username) {
            setUsernameError("");
        } else {
            if (username.length <= 30) {
            setUsernameError("");
            } else {
            setUsernameError("Username cannot be longer than 30 characters");
            }
        }
        },
        [username]
    );
  
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

    // useEffect(
    //     () => {
    //     if (!password) {
    //         setPasswordError("");
    //     } else {
    //         if (validatePassword(password)) {
    //             setPasswordError("");
    //         } else {
    //             setPasswordError("Please enter a valid password.");
    //         }
    //     }
    //     },
    //     [password]
    // );

    useEffect(
        () => {
        if (!confirmPassword || !password) {
            setConfirmPasswordError("");
        } else {
            if (password !== confirmPassword) {
            setConfirmPasswordError("The passwords must match.");
            } else {
            setConfirmPasswordError("");
            }
        }
        },
        [password, confirmPassword]
    );

    function passVerified(){ 
        alert('Check');
        console.log(emailError,usernameError , passwordError , confirmPasswordError)
        console.log(emailError === "",usernameError === "" , passwordError === "" , confirmPasswordError === "")
        return emailError === "" && usernameError === "" && passwordError === "" && confirmPasswordError === "";
    };

    const nextStep = values => {
        if(!passVerified()) {
            alert('Please fix');
            return;
        }

        props.onSuccess({
            email : values.email,
            username : values.username,
            password : values.password,
            bdate : values.bdate,
            bmonth : values.bmonth,
            byear : values.byear,
        });
        props.onChangeStep('sign_up_step_2');
    };

    return (
        <div>
        <form onSubmit={handleSubmit(nextStep)}>
            <Col className='sign_up_1' xs='12'>
                <Row id="username"> 
                <Col xs='6'>
                <p className="m-0">Username</p>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsername}
                    placeholder="username"
                    ref={register({
                        required: 'Required',
                        pattern: {
                            message: "invalid username address"
                        }
                        })}
                    />
                    <div className="error">{usernameError}</div>
                </Col>
            </Row>
            <Row id="email"> 
                <Col xs='6'>
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
                <Col id="password" lg='5' xs='6' style={{paddingRight: "0"}}>
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
                <Col id="confirm_password" lg='5' xs='6'>
                <p className="m-0">Confirm Password</p>
                <input
                type={!passwordShow ? 'password' : 'text'}
                name=""
                value={confirmPassword}
                onChange={handleConfirmPassword}
                placeholder="Confirm password"
                ref={register({required: 'Required'})}
                />
                <div className="error">{confirmPasswordError}</div>
                </Col>
            </Row>
                <BirthDateInput register={register}></BirthDateInput>
            <Row>
                <Col className="button" lg='3' xs='3'>
                <button type="submit">Next</button>
                </Col>
            </Row>
            </Col>
        </form>
        </div>
    );
}
export default SignUp1;