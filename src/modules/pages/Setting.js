import React, { useState, useCallback } from 'react';

const Setting = (props) => {

    const [theme,setTheme] = useState(props.theme);

    const handleThemeChange = useCallback((current_theme) => {
        setTheme(current_theme);
      },[setTheme]);

    return (
        <div className={"App Setting "+theme}>
            Setting
        </div>
    );
}

export default Setting;