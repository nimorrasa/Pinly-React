import React, { useState, useCallback, useEffect } from 'react';

const Setting = (props) => {

    const [theme,setTheme] = useState(props.theme);

    useEffect(() => { setTheme(props.theme)});

    return (
        <div className={"App Setting "+theme}>
            Setting
        </div>
    );
}

export default Setting;