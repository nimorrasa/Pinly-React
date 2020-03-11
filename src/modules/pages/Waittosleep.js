import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';
import IconWaittosleep from '../../images/icon/ic_waitsleep.png'
import '../css/App.css';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';

var colorheader ={
  color: '#ffffff',
  padding: 20
}
const Waittosleep = (props) => {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['theme']);
  const [ userData, setUserData ] = useState({});

  useEffect(() => {
		async function fetchData (user_id) {
            let user = await firebase.database().ref('/users/' + user_id).once('value');
			return user.val();
        }
    
        firebase.auth().onAuthStateChanged(async function(user) {
			if (user) {
                let data = await fetchData(user.uid);
                setUserData(data);
            }else{
                history.push('/login');
            }
        });
    

    },[]);
    

  return (
    <div className="Bg-color">
    
    <a href ="wake_up"> <div className="align-items-center">
    <div className="textcenter">
        <img src={IconWaittosleep} alt="Icon Wait to Sleep"></img>
            <div className="textsize">
            <h1 style={colorheader}>Please close your phone's screen.</h1>
            <h1 style={colorheader}>So the system can better measure and assess the quality og your sleep.</h1>
            </div>
    </div>
    </div></a>
    
    </div>
      );
    }
    
    export default Waittosleep;