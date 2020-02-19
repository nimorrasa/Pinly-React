import React, { useState, useCallback } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Media
} from 'reactstrap';
import { ThemeSwitch } from './ThemeSwitch.js';
import { MyDropdown } from './MyDropdown.js';
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
      <Navbar className={'theme_'+theme} expand="md">
        <NavbarBrand href="/">
            <Media className="App-header-logo"  src={logo}></Media>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Setting/">Setting</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Help/">Help</NavLink>
            </NavItem>
            <MyDropdown theme={theme} alignment="left" titleType="text" title="Sleep Test" items={["sleep score","sleep form"]}></MyDropdown>
            <NavItem>
              <NavLink href="/Profile/">Profile</NavLink>
            </NavItem>
          </Nav>
          <Nav className="mr-auto-right" navbar>
            <ThemeSwitch is_dark={isDark} onChangeTheme={handleThemeChange}></ThemeSwitch>
            <MyDropdown theme={theme} alignment="right" titleType="fontawsome" title="fa fa-cog" items={["Language EN/TH","Logout"]}></MyDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;