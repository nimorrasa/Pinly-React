import React, { useCallback , useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useForm } from 'react-hook-form'
import '../form/sign_up/FormSignUp.css';
import DatePicker from 'reactstrap-date-picker';

const BirthdateInput = (props) => {
  useEffect(() => {
    props.setValue('birthdate',props.value);
    props.register({ name: "birthdate" });
  }, [props.register]);

  const onDateChange = useCallback(
    value => {
      console.log(value, '<DS<AADS<SDA')
      props.setValue("birthdate", value);
    },
    [props.setValue]
  );

  return (
    <Row>
      <Col id="birthdate" lg='6' md="10" xs='10'>
        <p className="m-0">Birthdate</p>
        <DatePicker onChange={onDateChange} autoComplete="off" defaultValue={props.value} dateFormat="DD-MM-YYYY" />
      </Col>
    </Row>
  );
}

export default BirthdateInput;


