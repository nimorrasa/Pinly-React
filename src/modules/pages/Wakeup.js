import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';

import './SleepSc';

var colorheader ={
  color: '#ffffff',
  padding: 20
}

const Wakeup = (props) => {
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
    <div className="Bg-color" style={{paddingTop: "10vh"}}>
    <div className="textcenter">
    <a href="/sleep_score"><Container className="container" fluid="true">
        <Row> {/* Centre */}
        <Col>
            <div className="textsize">
            <h1 style={colorheader}>Please touch "anywhere".</h1>
            <h1 style={colorheader}>To see results And assessing your sleep.</h1>
            <br></br></div>
        </Col>
      </Row>
    </Container></a>
    </div>
    </div>
      );
    }
    
    export default Wakeup;