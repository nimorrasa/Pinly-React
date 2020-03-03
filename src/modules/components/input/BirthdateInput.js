import React, { useState , useEffect } from "react";
import { Row, Col } from "reactstrap";
import '../form/sign_up/FormSignUp.css';
import DatePicker from 'reactstrap-date-picker';

const BirthdateInput = (props) => {
  const [birthDate, setBirthDate] = useState(new Date().toISOString());

  return (
    <Row>
      <Col id="bdate" lg='6' md="6" xs='10'>
        <p className="m-0">Birthdate</p>
        <DatePicker
          value={birthDate}
          onChange={date => setBirthDate(date)}
        />
         <input
                style={{display: "none"}}
                name="birthdate"
                type="text"
                value={birthDate}
                ref={props.register()}/>
      </Col>
    </Row>
  );
}

export default BirthdateInput;


