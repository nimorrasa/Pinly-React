import React, { useState, useCallback, useEffect } from 'react';
import './layout.css';

const AsstData = (props) => {

    const [title,setTitle] = useState(props.title);
    const [detail,setDetail] = useState(props.detail);

    var colorLightNR ={
        color: '#3cc7c3',
        fontSize: 40
    } 

    useEffect(
        () => {
            console.log(props.title,props.detail);
            setTitle(props.title);
            setDetail(props.detail);
        },
        [props.title,props.detail]
    )

    return (
        <div>
            <h1 style={colorLightNR}>{title} : </h1>
            <h3>{detail}</h3>
        </div>
    );
}

export default AsstData;