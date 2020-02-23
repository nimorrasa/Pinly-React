import React, { useState, useCallback } from 'react';

const Profile = (props) => {

    const [theme,setTheme] = useState(props.theme);

    const handleThemeChange = useCallback((current_theme) => {
        setTheme(current_theme);
      },[setTheme]);

    return (
        <div className={"App Profile "+theme}>
            Profile
        </div>
    );
}

export default Profile;