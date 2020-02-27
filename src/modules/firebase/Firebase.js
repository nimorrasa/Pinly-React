import firebase from 'firebase';

const Firebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDrxhu2KYBgknHjT1Zo-R2SFW3yr2mux0k",
        authDomain: "pinly-sleepwebapp.firebaseapp.com",
        databaseURL: "https://pinly-sleepwebapp.firebaseio.com",
        projectId: "pinly-sleepwebapp",
        storageBucket: "pinly-sleepwebapp.appspot.com",
        messagingSenderId: "426484043132",
        appId: "1:426484043132:web:2b599a1e72ede7949aa8f9",
        measurementId: "G-4L3DPF086S"
    };
    
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    return firebase;
}

export default Firebase;