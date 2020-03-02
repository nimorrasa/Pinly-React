import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "reactstrap";
import { validateEmail } from "../../utils";
import '../FormLogin.css';
import { useHistory } from "react-router-dom";
import BirthDateInput from '../../../input/BirthdateInput.js';
import DiseaseInput from "../../../input/DiseaseInput";
import GenderRadio from "../../../input/GenderRadio";

const SocialRegister = (props) => {
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const [weight, setWeight] = useState(0);
    const [weightError, setWeightError] = useState("");
    
    const [height, setHeight] = useState(0);
    const [heightError, setHeightError] = useState("");

    const [gender,setGender] = useState(false);

    useEffect(
        () => {
        if (!weight) {
            setWeightError("");
        } else {
            if (weight > 0) {
                setWeightError("");
            } else {
                setWeightError("Weight must be more than 0.");
            }
        }
        },
        [weight]
    );

    useEffect(
        () => {
        if (!height) {
            setHeightError("");
        } else {
            if (height > 0) {
                setHeightError("");
            } else {
                setHeightError("Height must be more than 0.");
            }
        }
        },
        [height]
    );

    const backStep = useCallback(() => { props.onChangeStep('login_with_email'); },[]);
    const handleUsername = useCallback((event) => { console.log(event.target.value); setUsername(event.target.value)},[setUsername]);

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

    function passVerified(){ 
      return usernameError === "" && weightError === "" && heightError === "";
    };

    const onSubmit = values => {
      if(!passVerified()) {
            alert('Please check error before submit!');
            return;
        }
        props.onSuccess({
          userId : props.userId,
          username : values.username,
          bdate : values.bdate,
          bmonth : values.bmonth,
          byear : values.byear,
          weight : values.weight,
          height : values.height,
          gender : values.is_male ? 'Male' : 'Female',
          disease : values.disease
        });
        history.push("/home");
    };

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Col className='social_login' xs='12'>
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
                        message: "invalid username"
                    }
                    })}/>
                  <div className="error">{usernameError}</div>
              </Col>
            </Row>
            <BirthDateInput register={register}></BirthDateInput>
          <Row> 
            <Col id="weight" lg='3' xs='4'>
              <p className="m-0">Weight</p>
              <input
                type="number"
                name="weight"
                placeholder="weight"
                ref={register({required: 'Required'})}/>
            </Col>
            <Col id="height" lg='3' xs='4'>
            <p className="m-0">Height</p>
            <input
              type="number"
              name="height"
              id="height"
              placeholder="height"
              ref={register({required: 'Required'})}/>
            </Col>
          </Row>
          <DiseaseInput register={register}></DiseaseInput>
          <GenderRadio register={register}></GenderRadio>
          <Row>
            <Col className="button" lg='3' xs='3'>
              <button type="button" onClick={backStep}>Back</button>
            </Col>
            <Col className="button" lg='3' xs='3'>
              <button type="submit">Submit</button>
            </Col>
          </Row>
          </Col>
        </form>
        </div>
    );

}
export default SocialRegister;