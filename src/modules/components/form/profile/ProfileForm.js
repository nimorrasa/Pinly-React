import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, CardBody, CardSubtitle, CardTitle, CardText, Button, Card } from "reactstrap";
import './FormProfile.css';
import { useHistory } from "react-router-dom";
import DiseaseInput from "../../input/DiseaseInput.js";
import GenderRadio from "../../input/GenderRadio";
import BirthdateInput from '../../input/BirthdateInput';
import profie_picture from '../../../../images/button/profie_picture.png';

const ProfileForm = (props) => {
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
    const [weight, setWeight] = useState(0);
    const [weightError, setWeightError] = useState("");
    
    const [height, setHeight] = useState(0);
    const [heightError, setHeightError] = useState("");

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
        return weightError === "" && heightError === "";
    };

    const onSubmit = values => {
        if(!passVerified()) {
            alert('Please check error before submit!');
            return;
        }        
        props.onSuccess({
            weight : values.weight,
            height : values.height,
            gender : values.is_male ? 'Male' : 'Female',
            disease : values.disease
        });
    };

    const backStep = useCallback(() => { props.onChangeStep('sign_up_step_1');});

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Col className='sign_up_2' xs='12'>
            <div className="center">
                <Button className="profile_button"><img width="100%" src={profie_picture} alt="Card image cap" /></Button>
                {/* <input type="file"></input> */}
                <CardText>{props.userData != null ? props.userData.username : ''}</CardText>
            </div>
            <Row>
                
                <BirthdateInput register={register}></BirthdateInput>
            </Row>
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
export default ProfileForm;