import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';
import IconWaittosleep from '../../images/icon/ic_waitsleep.png'
import '../css/App.css';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';
import { log_data } from '../helpers';

var colorheader ={
  color: '#ffffff',
  padding: 20,
  fontSize: "1.7rem"
}
const Waittosleep = (props) => {
	const history = useHistory();
	const [cookies, setCookie, removeCookie] = useCookies(['theme']);
	const [ userData, setUserData ] = useState({});

	useEffect (
		() => {
			props.onChangeTheme('theme_dark');
		},
		[]
	);

	const submitWakeUp = useCallback(
		async () => {
			let timestamp = new Date();
			let userId = userData.uid;
			let current_sleep = new Date(userData.current_sleep);
			let sleepData = {};
			sleepData.current_wakeup = timestamp;
			sleepData.sleep_status = 2;
			sleepData.sleep_period = Math.round(( timestamp - current_sleep ) / 60000);

			try {
				const database = await firebase.database();
				const result = await database.ref('/users').child(userId).update(sleepData);
				log_data(userId,userData.mac_address,2,timestamp);
				alert('Success');	
				history.push("/wake_up");  
			} catch(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorMessage);
			}
		},
		[userData]
	)


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
		<Container className="Bg-color" style={{paddingTop: "5vh"}}>
			<a onClick={submitWakeUp}> <div className="align-items-center">
			<div className="textcenter">
				<img className="wait_to_sleep_img" src={IconWaittosleep} alt="Icon Wait to Sleep"></img>
					<div className="textsize">
						<h1 style={colorheader}>Please close your Device's screen.</h1>
						<h1 style={colorheader}>So the system can better measure and assess the quality of your sleep.</h1>
					</div>
			</div>
			</div></a>
		</Container>
	);
}

export default Waittosleep;