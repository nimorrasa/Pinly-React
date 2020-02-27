import React, { useState, useCallback } from 'react';
import Firebase from './Firebase.js';

const Auth = () => {

    const [state, setState] = useState(() => { const user = Firebase.auth().currentUser return { initializing: !user, user, } })
    function onChange(user) {
        setState({ initializing: false, user })
    }

    React.useEffect(() => {
        // listen for auth state changes
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
        // unsubscribe to the listener when unmounting
        return () => unsubscribe()
    }, [])

    return state
}

export default Auth;