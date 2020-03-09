import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, CardBody, CardSubtitle, CardTitle, CardText, Button, Card } from "reactstrap";
import { useHistory } from "react-router-dom";
import DiseaseInput from "../../input/DiseaseInput.js";
import GenderRadio from "../../input/GenderRadio";
import BirthdateInput from '../../input/BirthdateInput';
import profie_picture from '../../../../images/button/profie_picture.png';
import { faBirthdayCake, faWeight, faRulerVertical, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ProfileForm = (props) => {
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
    const toggleEdit = useCallback(() => { props.onChangeStep('view_profile');});

    return (
        <div>
        <Row>
            <Col lg="10" md="10" xs="10"></Col>
            <Col lg="2" md="2" xs="2">
                <Button className="edit_button" onClick={toggleEdit}>SAVE</Button>
            </Col>
        </Row>
        <Col className='Profile_step_1' xs='12'>
            <div className="center">
                <Button className="profile_button"><img width="100%" src={profie_picture} alt="Card image cap" /></Button>
                <CardText>{props.userData != null ? props.userData.username : 'None'}</CardText>
            </div>
            <Row>
                <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faBirthdayCake} />
                </Col>
                <Col id="bdate" lg='6' md="6" xs='10'>
                <BirthdateInput register={register} value={props.userData == null ? '' : props.userData.birthdate}></BirthdateInput>
                </Col>
            </Row>
          <Row> 
          <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faWeight} />
                </Col>
                <Col id="bdate" lg='4' md="4" xs='14'>
                    <p className="m-0">Weight</p>
                    <input
                        value={props.userData == null ? '' : props.userData.weight}
                        type="number"
                        name="weight"
                        placeholder="weight"
                        ref={register({required: 'Required'})}/>
                </Col>
                <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faRulerVertical} />
                </Col>
            <Col id="height" lg='4' md="4" xs='4'>
                <p className="m-0">Height</p>
                <input
                    value={props.userData == null ? '' : props.userData.height}
                    type="number"
                    name="height"
                    id="height"
                    placeholder="height"
                    ref={register({required: 'Required'})}/>
            </Col>
            </Row>
          <Row>
                <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faStethoscope} />
                </Col>
                <DiseaseInput register={register} value={props.userData == null ? '' : props.userData.disease}></DiseaseInput>
            </Row>
          </Col>
        </div>
    );
}
export default ProfileForm;