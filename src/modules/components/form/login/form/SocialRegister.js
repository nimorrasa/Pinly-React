import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "reactstrap";
import { validateEmail } from "../../utils";
import '../FormLogin.css';
import { useHistory } from "react-router-dom";
import BirthDateInput from '../../../../components/input/BirthdateInput.js';
import DiseaseInput from "../../../input/DiseaseInput";

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
          if (validateEmail(username)) {
          setUsernameError("");
          } else {
          setUsernameError("Please enter a valid username.");
          }
      }
      },
      [username]
  );

    function passVerified(){ 
        alert('Check');
        return usernameError === "" && weightError === "" && heightError === "";
    };

    const onSubmit = values => {
      console.log(values); return;
        if(!passVerified()) {
            alert('Please fix');
            return;
        }

        console.log(values); 
        alert('ddd');
        history.push("/home");
        // setUserData({
        //   username : data.username,
        //   email : data.email,
        //   birthdate : data.bdate+'-'+data.bmonth+'-'+data.byear,
        //   gender : userData.gender,
        //   weight : userData.weight,
        //   height : userData.height
        // });
        // setStep('sign_up_step_2');
        
    };
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Col className='social_login' xs='12'>
          <Row id="username"> 
            <Col xs='6'>
              <p className="m-0">Username</p>
              <input
                  type="email"
                  name="username"
                  value={username}
                  onChange={handleUsername}
                  placeholder="username"
                  ref={register({
                    required: 'Required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "invalid email address"
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
                ref={register({required: 'Required'})}
                />
            </Col>
            <Col id="height" lg='3' xs='4'>
            <p className="m-0">Height</p>
            <input
              type="number"
              ref={register({required: 'Required'})}
              name="height"
              id="height"
              placeholder="height"
              required/>
            </Col>
          </Row>
          <DiseaseInput register={register}></DiseaseInput>
          <Row>
          <Col id="gender" lg='12' xs='12'>
              <input
                type="radio"
                name="is_male"
                label="Male"
                ref={register({required: 'Required'})}
                defaultChecked={gender === 'Male'}
                defaultValue="Male"
                onClick={() => setGender('Male')}/>
                Male
              <input
                type="radio"
                name="is_female"
                label="Female"
                ref={register({required: 'Required'})}
                defaultChecked={gender === 'Female'}
                defaultValue="Female"
                onClick={() => setGender('Female')}/>
                Female
            </Col>
          </Row>
          <Row>
            <Col className="button" lg='3' xs='3'>
              <button type="submit" onClick={backStep}>Back</button>
            </Col>
            <Col className="button" lg='3' xs='3'>
              <button type="submit" onClick={onSubmit}>Submit</button>
            </Col>
          </Row>
          </Col>
        </form>
        </div>
    );
}
export default SocialRegister;