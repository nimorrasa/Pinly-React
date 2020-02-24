import React, { useState, useCallback, useEffect } from 'react';

const SleepScore = (props) => {

    const [theme,setTheme] = useState(props.theme);

    useEffect(() => { setTheme(props.theme)});

    return (
        <div className={"App Sleep_score "+theme}>
            Sleep Score
        </div>
    );
}

export default SleepScore;