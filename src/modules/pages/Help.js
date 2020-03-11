import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { useCookies } from 'react-cookie';

const Help = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['theme']);
    const [theme,setTheme] = useState(props.theme);
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
    
    useEffect(() => {
        handleNavbarThemeChange(cookies.theme);
    },[cookies.theme]);
    
    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className={"App Help "+theme}>
                Help
            </div>
        </div>
    );
}

export default Help;