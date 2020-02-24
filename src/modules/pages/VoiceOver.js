import React, { useState, useCallback, useEffect } from 'react';

const VoiceOver = (props) => {

    const [theme,setTheme] = useState(props.theme);

    useEffect(() => { setTheme(props.theme)});

    return (
        <div className={"App VoiceOver "+theme}>
            Voice Over
        </div>
    );
}

export default VoiceOver;