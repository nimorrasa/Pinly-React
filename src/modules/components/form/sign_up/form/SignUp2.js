import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "reactstrap";
import '../FormSignUp.css';
import { useHistory } from "react-router-dom";
import DiseaseInput from "../../../../components/input/DiseaseInput.js";

const SignUp1 = (props) => {
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
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

    function passVerified(){ 
        alert('Check');
        return weightError === "" && heightError === "";
    };

    const onSubmit = values => {
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

    const backStep = useCallback(() => { props.onChangeStep('sign_up_step_1');});

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Col className='sign_up_2' xs='12'>
          <Row> 
            <Col id="weight" lg='3' xs='4'>
              <p className="m-0">Weight</p>
              <input
                type="number"
                name="weight"
                placeholder="weight"
                required/>
            </Col>
            <Col id="height" lg='3' xs='4'>
            <p className="m-0">Height</p>
            <input
              type="number"
              name="height"
              id="height"
              placeholder="height"
              required/>
            </Col>
          </Row>
          <DiseaseInput register={register}></DiseaseInput>
          <Row>
          <Col id="gender" lg='12' xs='12'>
              <input type="radio" label="Male" defaultChecked={gender === 'Male'} defaultValue="Male" onClick={() => setGender('Male')} /> Male
              <input type="radio" label="Female" defaultChecked={gender === 'Female'} defaultValue="Female" onClick={() => setGender('Female')} /> Female
            </Col>
          </Row>
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
export default SignUp1;