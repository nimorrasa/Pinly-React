import React, { useState, useCallback } from 'react';

const Login = (props) => {

    const [theme,setTheme] = useState(props.theme);

    const handleThemeChange = useCallback((current_theme) => {
        setTheme(current_theme);
      },[setTheme]);

    return (
        <div className={"App Login "+theme}>
            Login
        </div>
    );
}

export default Login;