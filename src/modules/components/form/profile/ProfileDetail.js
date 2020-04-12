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
                let date = new Date(props.userData.birthdate);
                let array_birthdate = date.toLocaleDateString().split('/');
                let newBirthdate = array_birthdate[1]+'-'+array_birthdate[0]+'-'+array_birthdate[2];
                setDateFormat(newBirthdate);
            }else{
                setDateFormat('');
            }

        },
        [props.userData.birthdate]
    )

    return (
        <Col className="profile card left" lg="6" md="12" xs="12">
            <Row>
                <Col lg="10" md="9" xs="10"></Col>
                <Col lg="2" md="3" xs="2" style={{padding: 0, margin: 0}}>
                    <Button className="button edit_button" onClick={toggleEdit}>Edit</Button>
                </Col>
            </Row>
            <Row className="center">
                <Col lg="12" md="12" xs="12">
                    <img className="profile_button" src={profie_picture} alt="Card image cap" />
                </Col>
                <Col lg="12" md="12" xs="12">
                    <CardText>{props.userData != null ? props.userData.username : 'None'}</CardText>
                </Col>
            </Row>
            <Row className='Profile_step_1'>
                <Row>
                    <Col lg="12" md="12" xs="12">
                        <Row>
                            <Col lg="2" md="2" xs="2">
                                <FontAwesomeIcon icon={faBirthdayCake} />
                            </Col>
                            <Col id="birthdate" lg='10' md="10" xs='10'>
                                <p className="m-0">Birthdate</p>
                                <p>{dateFormat}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="6" md="6" xs="12">
                        <Row>
                            <Col lg="2" md="2" xs="2">
                                <FontAwesomeIcon icon={faWeight} />
                            </Col>
                            <Col id="birthdate" lg='10' md="10" xs='10'>
                                <p className="m-0">Weight</p>
                                <p>{props.userData == null ? 'None' : props.userData.weight+' kg'}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="6" md="6" xs="12">
                        <Row>
                            <Col lg="2" md="2" xs="2">
                                <FontAwesomeIcon icon={faRulerVertical} />
                            </Col>
                            <Col id="birthdate" lg='10' md="10" xs='10'>
                                <p className="m-0">Height</p>
                                <p>{props.userData == null ? 'None' : props.userData.height+' cm'}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="12" md="12" xs="12">
                        <Row>
                            <Col lg="2" md="2" xs="2">
                                <FontAwesomeIcon icon={faStethoscope} />
                            </Col>
                            <Col id="birthdate" lg='10' md="10" xs='10'>
                                <p className="m-0">Disease</p>
                                <p>{props.userData == null ? 'None' : props.userData.disease}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="12" md="12" xs="12">
                        <Row>
                            <Col lg="2" md="2" xs="2">
                                <FontAwesomeIcon icon={faAddressCard} />
                            </Col>
                            <Col id="birthdate" lg='10' md="10" xs='10'>
                                <p className="m-0">Pillow Mac Address</p>
                                <p>{props.userData == null ? 'None' : props.userData.mac_address}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Row>
        </Col>
    );
}
export default ProfileDetail;