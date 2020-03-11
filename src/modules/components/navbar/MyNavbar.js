import React, { useState, useCallback, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Link,
} from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Media
} from 'reactstrap';
import ThemeSwitch from '../toggle_switch/ThemeSwitch.js';
import MyDropdown from '../button/MyDropdown.js';
import MySetting from '../setting/MySetting.js';
import MyButton from '../button/MyButton.js';
import logo from '../../../images/logo.png';
import firebase from 'firebase';


const MyNavbar = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isDark, setIsDark] = useState((props.theme === 'dark'));
	const [theme, setTheme] = useState(props.theme);

	const toggle = () => setIsOpen(!isOpen);

	const [isAuth,setIsAuth] = useState(false);

	const handleThemeChange = useCallback((new_theme) => {
		const current_theme = new_theme ? 'dark' : 'light';
		setIsDark(new_theme);
		setTheme(current_theme);
		props.onChangeTheme(current_theme);
	},[setIsDark,setTheme]);

	useEffect(() => {
		async function fetchData (user_id) {
				let user = await firebase.database().ref('/users/' + user_id).once('value');
				return user.val();
			}
		
			firebase.auth().onAuthStateChanged(async function(user) {
				if (user) {
						let data = await fetchData(user.uid);
						setIsAuth(true);
					}else{
						setIsAuth(false)
					}
				});
			

			},[]);

	return (
		<div>
		<Navbar bg={theme} light={theme === 'light'} dark={theme === 'dark'}  expand="md">
			<NavbarBrand href="/">
				<Media className="App-header-logo"  src={logo}></Media>
			</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
			<Nav className="mr-auto" navbar>
				<NavItem>
				<Link to='/home'><MyButton type="text" title="Home"></MyButton></Link>
				</NavItem>
				<NavItem style={{display : (isAuth ? 'block' : 'none')}}>
				<Link to='/profile'><MyButton type="text" title="Profile"></MyButton></Link>
				</NavItem>
				<NavItem style={{display : (isAuth ? 'block' : 'none')}}>
				<Link to='/sleep_test'><MyButton type="text" title="Sleep Test"></MyButton></Link>
				</NavItem>
				<NavItem>
				<Link to='/contact_us'><MyButton type="text" title="Contact"></MyButton></Link>
				</NavItem>
				<NavItem>
				<MyDropdown theme={theme} alignment="left" titleType="icon" title="fa fa-question-circle" items={(isAuth ? ["How to Registeration","How to Sleeptest","Assistant"] : ["How to Registeration","How to Sleeptest"])}></MyDropdown>
				</NavItem>
			</Nav>
			<Nav className="mr-auto-right" navbar>
				<NavItem style={{display: (props.hideThemeSwitch ? 'none' : 'block')}}>
				<ThemeSwitch isDark={isDark} onChangeTheme={handleThemeChange}></ThemeSwitch>
				</NavItem>
				<NavItem>
				<MySetting theme={theme}></MySetting>
				</NavItem>
			</Nav>
			</Collapse>
		</Navbar>
		</div>
	);
}

export default MyNavbar;