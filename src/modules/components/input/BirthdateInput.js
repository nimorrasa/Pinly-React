import React, { useCallback , useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import '../form/sign_up/FormSignUp.css';
import DatePicker from 'react-date-picker';

const BirthdateInput = (props) => {
  const [dateValue,setDateValue] = useState(props.getValues && props.getValues().birthdate)
  useEffect(() => {
    if(props.value) {
      setDateValue(new Date(props.value));
      props.setValue('birthdate', new Date(props.value));
    }
    props.register({ name: "birthdate" });
  }, [props.register]);

  const onDateChange = useCallback(
    value => {
      setDateValue(value);
      props.setValue("birthdate", value);
    },
    []
  );

  return (
    <Row>
      <Col id="birthdate" lg='6' md="10" xs='10'>
        <p className="m-0">Birthdate</p>
        <DatePicker value={dateValue} onChange={onDateChange} defaultValue={props.value} autoComplete="off" format="dd-MM-y" />
      </Col>
    </Row>
  );
}

export default BirthdateInput;


