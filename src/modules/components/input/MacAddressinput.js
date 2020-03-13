import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "reactstrap";
import { isMACAddress } from 'validator';
import '../form/sign_up/FormSignUp.css';

const MacAddressInput = (props) => {
    const [macAddress,setMacAddress] = useState('');
    const [macAddressError,setMacAddressError] = useState('');

    const handleMacAddress = useCallback((event) => { setMacAddress(formatMAC(event.target.value))},[setMacAddress]);

    useEffect(
        () => {
            props.setValue('mac_address' , props.value);
        },
        []
    )

    useEffect(
        () => {
            let errorMacAddress = '';
            if(macAddress && !isMACAddress(macAddress)) errorMacAddress = "Please enter a valid mac address";
            setMacAddressError(errorMacAddress);
            props.updateMacAddressError(errorMacAddress);
        },
        [macAddress]
    )

    function formatMAC(str) {
        var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
            str = str.replace(/[^a-f0-9]/ig, "");
    
        while (r.test(str)) {
            str = str.replace(r, '$1' + ':' + '$2');
        }
        return str.slice(0, 17);
    };

    return (
        <Row id="mac_address"> 
            <Col lg="6" md="10" xs='10'>
            <p className="m-0">Mac Address</p>
            <input
                type="text"
                name="mac_address"
                value={macAddress}
                onChange={handleMacAddress}
                size="17"
                maxLength="25"
                placeholder="Mac Address"
                ref={props.register({required: 'Required'})}
                />
                <div className="error">{macAddressError}</div>
            </Col>
        </Row>
    );
}

export default MacAddressInput;
