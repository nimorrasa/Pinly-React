import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, CardBody, CardSubtitle, CardTitle, CardText, Button, Card } from "reactstrap";
import { useHistory } from "react-router-dom";
import profie_picture from '../../../../images/button/profie_picture.png';
import { faBirthdayCake, faWeight, faRulerVertical, faStethoscope, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ProfileDetail = (props) => {
    const [dateFormat,setDateFormat] = useState('');
    const history = useHistory();
    const toggleEdit = useCallback(() => { props.onChangeStep('edit_profile');});

    useEffect(
        () => {
            if(props.userData.birthdate != null) {
                let array_birthdate = props.userData.birthdate.substring(0, 10).split('-');
                let newBirthdate = array_birthdate[2]+'-'+array_birthdate[1]+'-'+array_birthdate[0];
                setDateFormat(newBirthdate);
            }else{
                setDateFormat('');
            }

        },
        [props.userData.birthdate]
    )

    return (
        <div>
        <Row>
            <Col lg="10" md="9" xs="10"></Col>
            <Col lg="2" md="3" xs="2" style={{padding: 0, margin: 0}}>
                <Button className="button edit_button" onClick={toggleEdit}>Edit</Button>
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
                <Col id="birthdate" lg='6' md="6" xs='10'>
                    <p className="m-0">Birthdate</p>
                    <p>{dateFormat}</p>
                </Col>
            </Row>
          <Row> 
          <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faWeight} />
                </Col>
                <Col id="weight" lg='4' md="4" xs='14'>
                    <p className="m-0">Weight</p>
                    <p>{props.userData == null ? 'None' : props.userData.weight+' kg'}</p>
                </Col>
                <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faRulerVertical} />
                </Col>
            <Col id="height" lg='4' md="4" xs='4'>
            <p className="m-0">Height</p>
            <p>{props.userData == null ? 'None' : props.userData.height+' cm'}</p>
            </Col>
            </Row>
          <Row>
                <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faStethoscope} />
                </Col>
                <Col id="disease" lg='6' md="6" xs='10'>
                    <p className="m-0">Disease</p>
                    <p>{props.userData == null ? 'None' : props.userData.disease}</p>
                </Col>
            </Row>
            <Row>
                <Col lg="2" md="2" xs="2">
                    <FontAwesomeIcon icon={faAddressCard} />
                </Col>
                <Col id="mac_address" lg='6' md="6" xs='10'>
                    <p className="m-0">Pillow Mac Address</p>
                    <p>{props.userData == null ? 'None' : props.userData.mac_address}</p>
                </Col>
            </Row>
          </Col>
        </div>
    );
}
export default ProfileDetail;