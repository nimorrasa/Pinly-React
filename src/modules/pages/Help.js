import React, { useState, useCallback } from 'react';

const Help = (props) => {

    const [theme,setTheme] = useState(props.theme);

    const handleThemeChange = useCallback((current_theme) => {
        setTheme(current_theme);
      },[setTheme]);

    return (
        <div className={"App Help "+theme}>
            Help
        </div>
    );
}

export default Help;