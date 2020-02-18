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
  const [theme, setTheme] = useState("theme_light");

  const toggle = () => setIsOpen(!isOpen);

  useCallback(() => {
    function handleThemeChange(new_theme) {
        const current_theme = new_theme ? 'theme_dark' : 'theme_light';
        setIsDark(new_theme);
        setTheme(current_theme);
    }

  });


//   const handleThemeChange = (new_theme) => {
//         const current_theme = new_theme ? 'theme_dark' : 'theme_light';

//         this.setState({
//         is_dark: new_theme,
//         theme: current_theme
//         });
//         this.props.onChangeTheme(current_theme);  
//     }

  return (
    <div>
      <Navbar color="light" light expand="md">
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
            <MyDropdown alignment="left" titleType="text" title="Sleep Test" items={["sleep score","sleep form"]}></MyDropdown>
            <NavItem>
              <NavLink href="/Profile/">Profile</NavLink>
            </NavItem>
          </Nav>
          <Nav className="mr-auto-right" navbar>
            <ThemeSwitch is_dark={isDark} onChangeTheme={handleThemeChange}></ThemeSwitch>
            <MyDropdown alignment="right" titleType="fontawsome" title="fa fa-cog" items={["Language EN/TH","Logout"]}></MyDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;