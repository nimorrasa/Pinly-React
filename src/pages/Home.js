import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import MyNavbar from '../components/MyNavbar.js';
import logo from '../images/logo.png';

export class Home extends React.Component {
    state = {
      theme: 'theme_dark'
    }

    handleThemeChange = (new_theme) => {
        this.setState({
          theme: new_theme
        });
    }

    render() {
      return (
        <div className={"App Home "+this.state.theme}>
        <MyNavbar theme={this.state.theme} onChangeTheme={this.handleThemeChange}></MyNavbar>
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
