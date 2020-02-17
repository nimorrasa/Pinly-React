import React from 'react';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { ThemeSwitch } from './ThemeSwitch.js';
import { SettingButton } from './SettingButton';
import { Image } from 'react-bootstrap';
import '../css/Header.css';
import logo from '../images/logo.png';

export class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        theme: 'theme_dark',
      };
    }
    render() {
      return (
        <Navbar bg={this.state.theme} variant={this.state.theme} expand="lg">
          <Navbar.Brand href="#home">
          <Image src={logo} className="App-header-logo" rounded/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown
                title="Sleep Test"
                id="basic-nav-dropdown"
                components={{ DropdownIndicator:() => null }}
                >
                <NavDropdown.Item href="#action/3.1">Sleep score</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Sleep form</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#setting">Setting</Nav.Link>
              <Nav.Link href="#help">Help</Nav.Link>
              <Nav.Link href="#link">Profile</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">
                <ThemeSwitch></ThemeSwitch>
              </Nav.Link>
              <Nav.Link>
                <SettingButton></SettingButton>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
