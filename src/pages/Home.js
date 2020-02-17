import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Header } from '../components/Header.js';
import logo from '../images/logo.png';

export class Home extends React.Component {
  
    render() {
      return (
        <div className="App Home">
        <Header></Header>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <div>
            <Container className="App-content">
                <Row className="Link-padding">
                     <a className="App-link" href="#login">Login</a> | <a className="App-link" href="#sign_up">Sign Up</a>
                </Row>
                <Row>
                    <Button style={{borderWidth: 2, borderRadius: 20 }} className="App-button">GET STARTED</Button>
                </Row>
            </Container>
          </div>
        </div>
      );
    }
  }
