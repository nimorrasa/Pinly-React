import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import '../css/App.css';
//import components 
import btn_tea from '../../modules/components/DailyTestPage/btn_tea.png';
import btn_smk from '../../modules/components/DailyTestPage/btn_smk.png';
import btn_al from '../../modules/components/DailyTestPage/btn_al.png';
import btn_cf from '../../modules/components/DailyTestPage/btn_cf.png';

import TapBar from '../components/DailyTestPage/TapBar';
import { useCookies } from 'react-cookie';
import firebase from 'firebase';
import { log_data } from '../helpers';
import { Container, Row, Col } from 'reactstrap';
import DailyButton from '../components/DailyTestPage/DailyButton.js';
import { Alert } from 'reactstrap';

const dailytest = (props) => {
    const history = useHistory();
	const { handleSubmit, register, setValue , getValues, errors } = useForm();

	const [visible, setVisible] = useState(false);

	const onDismiss = useCallback(() => {
		setVisible(false);
		history.push("/wait_to_sleep");  
	},[]);

	const [ isLoading, setIsLoading ] = useState(true);
	const [userData,setUserData] = useState({});
	const [cookies, setCookie, removeCookie] = useCookies(['theme']);
	const [theme,setTheme] = useState(props.theme);
	const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

	const handleNavbarThemeChange = useCallback(
		(current_theme) => {
			setNavbarTheme(current_theme);
			setTheme('theme_'+current_theme);
			props.onChangeTheme('theme_'+current_theme);
		},
		[setNavbarTheme,setTheme]
	);

	const toggleAlert = useCallback(
		() => {
			setVisible(true);
		},
		[]
	);

	useEffect(() => {
		if(visible) {
			const timer = setTimeout(() => {
				setVisible(false);
				history.push("/wait_to_sleep");  
			  }, 3000);
			  return () => clearTimeout(timer);
		}
	}, [visible]);

	const submitSleep = useCallback(
		async (newData) => {
			let timestamp = new Date();
			let userId = userData.uid;
			let sleepData = {};
			let daily_test = {};
			daily_test.alcohol = newData.alcohol;
			daily_test.coffee = newData.coffee;
			daily_test.smoking = newData.smoking;
			daily_test.tea = newData.tea;
			daily_test.nap = newData.nap;
			daily_test.working = newData.working;
			daily_test.exercise = newData.exercise;
			sleepData.current_sleep = timestamp;
			sleepData.sleep_status = 1;
			sleepData.sleep_period = 0;

			try {
				const database = await firebase.database();
				const result1 = await database.ref('/users').child(userId).update(sleepData);
				const result2 = await database.ref('/users').child(userId).child('daily_test').update(daily_test);
				log_data(userId,userData.mac_address,1,timestamp);
				toggleAlert();	
			} catch(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorMessage);
			}
		},
		[userData]
	)

	useEffect(
		() => {
			async function fetchData (user_id) {
				let user = await firebase.database().ref('/users/' + user_id).once('value');
				return user.val();
			}
		
			firebase.auth().onAuthStateChanged(async function(user) {
				if (user) {
					let data = await fetchData(user.uid);
					setUserData(data);
					if(data.sleep_status == 1) history.push('/wait_to_sleep');
					setIsLoading(false);
				}
			});
		},
		[]
	);
    

	useEffect(
		() => {
			handleNavbarThemeChange(cookies.theme);
		},
		[cookies.theme]
	);

	return (
		<div>
			<MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>  
			<div className="loading" style={{textAlign: "center",top: "30vh",height: "50vh",color: "white",display : (!isLoading ? 'none' : 'block' )}}>
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>    
			<form onSubmit={handleSubmit(submitSleep)}  style={{display : (isLoading ? 'none' : 'block' )}}>
				<Container>
					<Row style={{textAlign: "center"}}>
						<Col lg="3" md="1" xs="1">
						</Col>
						<Col lg="6" md="10" xs="10">
							<Alert style={{textAlign: "center"}} color="primary" isOpen={visible} toggle={onDismiss} fade={false}>
								Good Dream!
							</Alert>
						</Col>
						<Col lg="3" md="1" xs="1">
						</Col>
					</Row>
					<Row>
						<Col lg="9" md="12" xs="`12">
							<div className="row">
								<Col lg="6" md="6" xs="12"><DailyButton name="coffee" title="Coffee" unit="cups" image={btn_cf} setValue={setValue} register={register} /></Col>
								<Col lg="6" md="6" xs="12"><DailyButton name="alcohol" title="Alcohol Drink" unit="bottle" image={btn_al} setValue={setValue} register={register} /></Col>
								<Col lg="6" md="6" xs="12"><DailyButton name="smoking" title="Smoking" unit="rolls" image={btn_smk} setValue={setValue} register={register} /></Col>
								<Col lg="6" md="6" xs="12"><DailyButton name="tea" title="Tea" unit="levels" image={btn_tea} setValue={setValue} register={register} /></Col>
							</div>
						</Col>
						<Col lg="3" md="12" xs="12" style={{paddingTop: "10px"}}>
							<div className="row">
								<Col lg="12" md="4" xs="12"><TapBar unit="Mins" name="nap" title="Nap" setValue={setValue} register={register} /></Col>
								<Col lg="12" md="4" xs="12"><TapBar unit="Mins" name="working" title="Work" setValue={setValue} register={register} /></Col>
								<Col lg="12" md="4" xs="12"><TapBar unit="Mins" name="exercise" title="Exercise" setValue={setValue} register={register} /></Col>
							</div>
						</Col>
					</Row>
					<Row style={{textAlign: "center"}}> 
						<Col lg="12" md="12" xs="12">
							<a href="/wait_to_sleep"><button className="button btn-default" style={{color: 'white'}}>Continue</button></a>
						</Col>
					</Row>
				</Container>
			</form>
		</div>
	);

}
    
export default dailytest;
