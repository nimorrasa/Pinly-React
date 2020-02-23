import React, { useState, useCallback } from 'react';

const SignUp = (props) => {

    const [theme,setTheme] = useState(props.theme);

    const handleThemeChange = useCallback((current_theme) => {
        setTheme(current_theme);
      },[setTheme]);

    return (
        <div className={"App Sign_up "+theme}>
            Sign Up
        </div>
    );
}

export default SignUp;