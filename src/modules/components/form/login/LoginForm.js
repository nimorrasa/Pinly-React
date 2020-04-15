import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import './FormLogin.css';
import { useHistory } from "react-router-dom";
import LoginEmail  from './form/LoginEmail.js';
import SocialRegister  from './form/SocialRegister.js';
import { useCookies } from 'react-cookie';
import { createMacAddress } from '../../../helpers';
import firebase from 'firebase';

const LoginForm = (props) => {
    const [userId,setUserId] = useState(0);

    const handleResult = useCallback( async (result) => {
        let login_userId = null;
        if(result.type=='login_with_email') {
            const response = await firebase.auth().signInWithEmailAndPassword(result.email, result.password);
            login_userId = response.user.uid;
            setUserId(login_userId);
            console.log('email',response);
        }else if(result.type=='google') {
            const response = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
            console.log('google',response);
        }else if(result.type=='facebook') {
            const response = await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
            console.log('facebook',response);
        }
    },[]);

    return <LoginEmail onResult={handleResult}></LoginEmail>
}
export default LoginForm;