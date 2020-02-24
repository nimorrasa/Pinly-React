import React, { useState, useCallback, useEffect } from 'react';

const Profile = (props) => {

    const [theme,setTheme] = useState(props.theme);

    useEffect(() => { setTheme(props.theme)});

    return (
        <div className={"App Profile "+theme}>
            Profile
        </div>
    );
}

export default Profile;