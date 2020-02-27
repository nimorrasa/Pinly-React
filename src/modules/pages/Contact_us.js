import React, { useState, useCallback, useEffect } from 'react';

const Contact_us = (props) => {

    const [theme,setTheme] = useState(props.theme);

    useEffect(() => { setTheme(props.theme)});

    return (
        <div className={"App Contact_us "+theme}>
            Contact Us
        </div>
    );
}

export default Contact_us;