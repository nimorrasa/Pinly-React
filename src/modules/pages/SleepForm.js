import React, { useState, useCallback, useEffect } from 'react';

const SleepForm = (props) => {

    const [theme,setTheme] = useState(props.theme);

    useEffect(() => { setTheme(props.theme)});

    return (
        <div className={"App Sleep_test "+theme}>
            Sleep Test
        </div>
    );
}

export default SleepForm;