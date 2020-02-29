import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import '../form/sign_up/FormSignUp.css';
import { useForm } from "react-hook-form";

const BirthdateInput = (props) => {
  const [birthDate, setBirthDate] = useState("");
  const [birthDateError, setBirthDateError] = useState("");

  const [birthMonth, setBirthMonth] = useState("");
  const [birthMonthError, setBirthMonthError] = useState("");

  const [birthYear, setBirthYear] = useState("");
  const [birthYearError, setBirthYearError] = useState("");

  const dates = []

  for (let i=1; i<=31; i++) {
    dates.push(i)
  }

  const months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"]

  const years = []

  for (let i=2020; i>=1999; i--) {
    years.push(i)
  }

  return (
        <Row> 
        <Col id="bdate" lg='2' xs='2'>
        <p className="m-0">Birthdate</p>
        <select
            defaultValue='1'
            name="bdate"
            min='1'
            max='31'
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
            ref={props.register({required: 'Required'})}
            >
            {dates.map((value, index) => {
            return <option key={value}>{value}</option>;
            })}
        </select>
        <div className="error">{birthDateError}</div>
        </Col>
        <Col id="mdate" lg='3' xs='4'>
        <p className="m-0" style={{color: "transparent"}}>Birthdate</p>
        <select
            defaultValue='1'
            name="bmonth"
            value={birthMonth}
            onChange={e => setBirthMonth(e.target.value)}
            ref={props.register({required: 'Required'})}
            min='12'
            max='31'>
            {months.map((value, index) => {
            return <option key={index+1}>{value}</option>;
            })}
        </select>
        <div className="error">{birthMonthError}</div>
        </Col>
        <Col id="ydate" lg='3' xs='4'>
        <p className="m-0" style={{color: "transparent"}}>Birthdate</p>
        <select
            defaultValue='1'
            name="byear"
            value={birthYear}
            onChange={e => setBirthYear(e.target.value)}
            ref={props.register({required: 'Required'})}
            min='12'
            max='31'>
            {years.map((value, index) => {
            return <option key={value}>{value}</option>;
            })}
        </select>
        <div className="error">{birthYearError}</div>
        </Col>
    </Row>
  );
}

export default BirthdateInput;
