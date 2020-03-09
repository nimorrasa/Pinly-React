import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, CardBody, CardSubtitle, CardTitle, CardText, Button, Card } from "reactstrap";
import { useHistory } from "react-router-dom";
import profie_picture from '../../../../images/button/profie_picture.png';
import { faBirthdayCake, faWeight, faRulerVertical, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ProfileDetail = (props) => {
    const history = useHistory();
    const toggleEdit = useCallback(() => { props.onChangeStep('edit_profile');});

    return (
        <div>
        <Col className='Profile_step_1' xs='12'>
            <div className="center">
                <Button className="profile_button" onClick={toggleEdit}><img width="100%" src={profie_picture} alt="Card image cap" /></Button>
                <CardText>{props.userData != null ? props.userData.username : 'None'}</CardText>
            </div>
            <Row>
                <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faBirthdayCake} />
                </Col>
                <Col id="bdate" lg='6' md="6" xs='10'>
                    <p className="m-0">Birthdate</p>
                    <p>{props.userData == null ? 'None' : props.userData.birthdate}</p>
                </Col>
            </Row>
          <Row> 
          <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faWeight} />
                </Col>
                <Col id="bdate" lg='4' md="4" xs='14'>
                    <p className="m-0">Weight</p>
                    <p>{props.userData == null ? 'None' : props.userData.weight}</p>
                </Col>
                <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faRulerVertical} />
                </Col>
            <Col id="height" lg='4' md="4" xs='4'>
            <p className="m-0">Height</p>
            <p>{props.userData == null ? 'None' : props.userData.height}</p>
            </Col>
            </Row>
          <Row>
                <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faStethoscope} />
                </Col>
                <Col id="bdate" lg='6' md="6" xs='10'>
                    <p className="m-0">Disease</p>
                    <p>{props.userData == null ? 'None' : props.userData.disease}</p>
                </Col>
            </Row>
          </Col>
        </div>
    );
}
export default ProfileDetail;