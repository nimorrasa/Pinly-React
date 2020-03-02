import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';

const Help = (props) => {

    const [theme,setTheme] = useState(props.theme);
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
    
    useEffect(() => { setTheme(props.theme)});

    return (
        <div>
            <MyNavbar firebase={props.firebase} theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className={"App Help "+theme}>
                Help
            </div>
        </div>
    );
}

export default Help;