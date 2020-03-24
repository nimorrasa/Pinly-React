import React, { useCallback , useEffect } from "react";
import { Row, Col } from "reactstrap";
import '../form/sign_up/FormSignUp.css';
import DatePicker from 'react-date-picker';

const BirthdateInput = (props) => {
  const dateValue = props.getValues && props.getValues().birthdate
  useEffect(() => {
    if(props.value) {
      props.setValue('birthdate', props.value);
    }
    props.register({ name: "birthdate" });
  }, [props.register]);

  const onDateChange = useCallback(
    value => {
      props.setValue("birthdate", value);
    },
    []
  );

  return (
    <Row>
      <Col id="birthdate" lg='6' md="10" xs='10'>
        <p className="m-0">Birthdate</p>
        <DatePicker value={dateValue} onChange={onDateChange} defaultValue={props.value} autoComplete="off" dateFormat="DD-MM-YYYY" />
      </Col>
    </Row>
  );
}

export default BirthdateInput;


