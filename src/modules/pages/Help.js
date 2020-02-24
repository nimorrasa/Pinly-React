import React, { useState, useCallback, useEffect } from 'react';

const Help = (props) => {

    const [theme,setTheme] = useState(props.theme);

    useEffect(() => { setTheme(props.theme)});

    return (
        <div className={"App Help "+theme}>
            Help
        </div>
    );
}

export default Help;