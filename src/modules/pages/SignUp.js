import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FormSignUp  from '../../modules/components/form/FormSignUp.js';

const SignUp = (props) => {

    const [theme,setTheme] = useState('theme_light');

    useEffect(() => { setTheme(props.theme)});

    return (
        <div className={"App Sign_up theme_light"}>
            <Container>
                <Row>
                    <Col className="col_left" xs="6"></Col>
                    <Col className="col_right" xs="6">
                        <h1>Welcome to PINLY</h1>
                        <p>PINLY is an application for sleep monitoring just for you.</p>
                        <FormSignUp></FormSignUp>
                    </Col>
                </Row>

            </Container>
            
        </div>
    );
}

export default SignUp;