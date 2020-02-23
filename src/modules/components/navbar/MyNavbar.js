import React, { useState, useCallback } from 'react';
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


const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState((props.theme === 'dark'));
  const [theme, setTheme] = useState(props.theme);

  const toggle = () => setIsOpen(!isOpen);

  const handleThemeChange = useCallback((new_theme) => {
    const current_theme = new_theme ? 'dark' : 'light';
    setIsDark(new_theme);
    setTheme(current_theme);
    props.onChangeTheme(current_theme);
  },[setIsDark,setTheme]);

  return (
    <div>
      <Navbar className={'theme_'+theme} bg={theme} light={theme === 'light'} dark={theme === 'dark'}  expand="md">
        <NavbarBrand href="/">
            <Media className="App-header-logo"  src={logo}></Media>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to='/home'><MyButton type="text" title="Home"></MyButton></Link>
            </NavItem>
            <NavItem>
              <Link to='/profile'><MyButton type="text" title="Profile"></MyButton></Link>
            </NavItem>
            <NavItem>
              <MyDropdown theme={theme} alignment="left" titleType="text" title="Sleep Test" items={["sleep score","sleep form"]}></MyDropdown>
            </NavItem>
            <NavItem>
              <Link to='/setting'><MyButton type="text" title="Setting"></MyButton></Link>
            </NavItem>
            <NavItem>
              <Link to='/help'><MyButton type="icon" title="fa fa-question-circle"></MyButton></Link>
            </NavItem>
          </Nav>
          <Nav className="mr-auto-right" navbar>
            <NavItem>
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