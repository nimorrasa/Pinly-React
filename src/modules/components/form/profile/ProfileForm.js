import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, CardBody, CardSubtitle, CardTitle, CardText, Button, Card } from "reactstrap";
import { useHistory } from "react-router-dom";
import DiseaseInput from "../../input/DiseaseInput.js";
import MacAddressInput from '../../input/MacAddressinput';
import BirthdateInput from '../../input/BirthdateInput';
import profie_picture from '../../../../images/button/profie_picture.png';
import { faBirthdayCake, faWeight, faRulerVertical, faStethoscope, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ProfileForm = (props) => {
    const history = useHistory();
    const { handleSubmit, register, setValue, errors } = useForm();

    const onSubmit = values => {
        props.onSuccess({
            birthdate : values.birthdate,
            mac_address : values.mac_address,
            weight : values.weight,
            height : values.height,
            disease : values.disease
        });
        props.onChangeStep('view_profile');
    };

    useEffect(
        () => {
            setValue('birthdate',props.userData.birthdate);
            setValue('weight', props.userData.weight);
            setValue('height', props.userData.height);
            setValue('mac_address',props.userData.mac_address);
        },
        []
    );

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
            <Col lg="10" md="9" xs="10"></Col>
            <Col lg="2" md="3" xs="2" style={{padding: 0, margin: 0}}>
                <Button type="submit" className="edit_button">SAVE</Button>
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
                <Col id="birthdate" lg='10' md="10" xs='10'>
                <BirthdateInput setValue={setValue} register={register} value={props.userData == null ? '' : props.userData.birthdate}></BirthdateInput>
                </Col>
            </Row>
          <Row> 
          <Col lg="2" md="2" xs="2">
                <FontAwesomeIcon icon={faWeight} />
                </Col>
                <Col id="weight" lg='5' md="10" xs='10'>
                    <p className="m-0">Weight</p>
                    <input
                        type="number"
                        name="weight"
                        placeholder="weight"
                        ref={register({required: 'Required'})}/>
                </Col>
                <Col lg="1" md="2" xs="1">
                    <FontAwesomeIcon icon={faRulerVertical} />
                </Col>
            <Col id="height" lg='4' md="10" xs='10'>
                <p className="m-0">Height</p>
                <input
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
                <Col id="disease" lg='10' md="10" xs='10'>
                    <DiseaseInput setValue={setValue} register={register} value={props.userData == null ? '' : props.userData.disease}></DiseaseInput>
                </Col>
            </Row>
            <Row>
                <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faAddressCard} />
                </Col>
                <Col id="mac_address" lg='10' md="10" xs='10'>
                    <MacAddressInput setValue={setValue} register={register} value={props.userData == null ? '' : props.userData.mac_address}></MacAddressInput>
                </Col>
            </Row>
          </Col>
        </form>
        </div>
    );
}
export default ProfileForm;