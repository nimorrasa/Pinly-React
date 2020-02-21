import React, { useState, useCallback } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Media
} from 'reactstrap';
import ThemeSwitch from './ThemeSwitch.js';
import MyDropdown from './MyDropdown.js';
import MySetting from './MySetting.js';
import MyButton from './MyButton.js';
import logo from '../images/logo.png';


const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState("light");

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
              <MyButton type="text" title="Home"></MyButton>
            </NavItem>
            <NavItem>
              <MyButton type="text" title="Profile"></MyButton>
            </NavItem>
            <NavItem>
              <MyDropdown theme={theme} alignment="left" titleType="text" title="Sleep Test" items={["sleep score","sleep form"]}></MyDropdown>
            </NavItem>
            <NavItem>
              <MyButton type="text" title="Setting"></MyButton>
            </NavItem>
            <NavItem>
              <MyButton type="icon" title="fa fa-question-circle"></MyButton>
            </NavItem>
          </Nav>
          <Nav className="mr-auto-right" navbar>
            <NavItem>
              <ThemeSwitch is_dark={isDark} onChangeTheme={handleThemeChange}></ThemeSwitch>
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