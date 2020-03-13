import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "reactstrap";
import { validateEmail } from "../../utils.js";
import usePasswordValidator from "../../usePasswordValidator.js";
import BirthDateInput from '../../../../components/input/BirthdateInput.js';
import MacAddressInput from '../../../../components/input/MacAddressinput.js';
import '../FormSignUp.css';

const SignUp1 = (props) => {
    const { handleSubmit, register, setValue, getValues,  errors } = useForm();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [passwordShow,setPasswordShow] = useState(false);

    const [macAddressError,setMacAddressError] = useState('');

    const togglePassword = useCallback(() => { setPasswordShow(!passwordShow); });
    const [password, setPassword, passwordError] = usePasswordValidator({
        min: 8,
        max: 15
    });

    const handleUsername = useCallback((event) => { setUsername(event.target.value)},[setUsername]);
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
        return emailError === "" && usernameError === "" && passwordError === "" && confirmPasswordError === "";
    };

    const nextStep = values => {
        if(!passVerified() || values.birthdate == null) {
            alert('Please check error before submit!');
            return;
        }

        props.onSuccess({
            email : values.email,
            username : values.username,
            password : values.password,
            birthdate : values.birthdate,
            mac_address : values.mac_address,
        });
        props.onChangeStep('sign_up_step_2');
    };

    
  const handleErrorMacAddressError = useCallback(
    (value) => {
      setMacAddressError(value);
    },
    []
  )

    return (
        <div>
        <form onSubmit={handleSubmit(nextStep)}>
            <Col className='sign_up_1' xs='12'>
                <Row id="username"> 
                <Col lg="6" md="6" xs='10'>
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
                <Col lg="6" md="6" xs='10'>
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
                <Col id="password" lg='6' md="6" xs='10'>
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
                <div id="password" style={{width: "3%"}}>
                <p className="m-0" style={{color: "transparent"}}>Password</p>
                <span className={"fa fa-fw fa-eye field-icon toggle-password"} onClick={togglePassword}></span>
                </div>
                <Col id="confirm_password" lg='5' md="5" xs='10'>
                <p className="m-0">Confirm Password</p>
                <input
                    type={!passwordShow ? 'password' : 'text'}
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    placeholder="Confirm password"
                    ref={register({required: 'Required'})}
                />
                <div className="error">{confirmPasswordError}</div>
                </Col>
            </Row>
            <BirthDateInput register={register} setValue={setValue} getValues={getValues}></BirthDateInput>
            <MacAddressInput updateMacAddressError={handleErrorMacAddressError} register={register} setValue={setValue}></MacAddressInput>
            <Row>
                <Col className="button" lg='3' md="3" xs='3'>
                <button type="submit">Next</button>
                </Col>
            </Row>
            </Col>
        </form>
        </div>
    );
}
export default SignUp1;