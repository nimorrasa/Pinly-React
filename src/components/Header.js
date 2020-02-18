import React from 'react';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { MyDropdown } from './MyDropdown.js';
import { ThemeSwitch } from './ThemeSwitch.js';
import { SettingButton } from './SettingButton';
import { Image } from 'react-bootstrap';
import '../css/Header.css';
import logo from '../images/logo.png';

export class Header extends React.Component {

	state = {
	  is_dark: this.props.theme === 'theme_dark',
	  theme: this.props.theme
	}

	handleThemeChange = (new_theme) => {
		const current_theme = new_theme ? 'theme_dark' : 'theme_light';

		this.setState({
		  is_dark: new_theme,
		  theme: current_theme
		});
		this.props.onChangeTheme(current_theme);  
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
					<MyDropdown alignment="left" titleType="text" title="Sleep Test" items={["sleep score","sleep form"]}></MyDropdown>
					<Nav.Link href="#setting">Setting</Nav.Link>
					<Nav.Link href="#help">Help</Nav.Link>
					<Nav.Link href="#link">Profile</Nav.Link>
				</Nav>
				<Nav className="mr-auto-right">
					<ThemeSwitch is_dark={this.state.is_dark} onChangeTheme={this.handleThemeChange}></ThemeSwitch>
					<MyDropdown alignment="right" titleType="fontawsome" title="fa fa-cog" items={["Language EN/TH","Logout"]}></MyDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		);
	}
  }
