import React, { useState, useCallback, useEffect } from 'react';

const Login = (props) => {

    const [theme,setTheme] = useState(props.theme);

    useEffect(() => { setTheme(props.theme)});

    return (
        <div className={"App Login "+theme}>
            Login
        </div>
    );
}

export default Login;