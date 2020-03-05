import React, { useCallback , useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useForm } from 'react-hook-form'
import '../form/sign_up/FormSignUp.css';
import DatePicker from 'reactstrap-date-picker';

const BirthdateInput = (props) => {
  // const { setValue } = useForm()

  useEffect(() => {
    props.register({ name: "birthdate" });
  }, [props.register]);

  const onDateChange = useCallback(
    value => {
      props.setValue("birthdate", value);
    },
    [props.setValue]
  );


  return (
    <Row>
      <Col lg="2" md="2" xs="2">
        <i class="fa fa-birthday-cake" aria-hidden="true"></i>
      </Col>
      <Col id="bdate" lg='6' md="6" xs='10'>
        <p className="m-0">Birthdate</p>
        <DatePicker onChange={onDateChange}/>
      </Col>
    </Row>
  );
}

export default BirthdateInput;


