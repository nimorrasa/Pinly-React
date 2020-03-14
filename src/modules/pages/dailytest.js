import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import '../css/App.css';
//import components 
import BtnCaffeine from '../components/DailyTestPage/BtnCaffeine';
import BtnSmoking from '../components/DailyTestPage/BtnSmoking';
import BtnAlcohol from '../components/DailyTestPage/BtnAlcohol';
import BtnStress from '../components/DailyTestPage/BtnStress';

import TapBar_Nap from '../components/DailyTestPage/TapBar_Nap';
import TapBar_Work from '../components/DailyTestPage/TapBar_Work';
import TapBar_Exer from '../components/DailyTestPage/TapBar_Exer';

import BtnConti from '../components/DailyTestPage/BtnConti';
import { useCookies } from 'react-cookie';
import firebase from 'firebase';

const dailytest = (props) => {
    const history = useHistory();
	const { handleSubmit, register, setValue , getValues, errors } = useForm();

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

	const submitSleep = useCallback(
		async (newData) => {
			let timestamp = new Date();
			let userId = userData.uid;
			let sleepData = {};
			sleepData.alcohol_drink = newData.alcohol;
			sleepData.caffeine = newData.caffeine;
			sleepData.smoking = newData.smoking;
			sleepData.stress = newData.stress;
			sleepData.nap = newData.nap;
			sleepData.working = newData.working;
			sleepData.exercise = newData.exercise;
			sleepData.current_sleep = timestamp;
			sleepData.sleep_status = 1;
			sleepData.sleep_period = 0;

			try {
				const database = await firebase.database();
				const result = await database.ref('/users').child(userId).update(sleepData);
				alert('Success');	
				history.push("/wait_to_sleep");  
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
			<form onSubmit={handleSubmit(submitSleep)}>
				<div className="container-fluid text-center">
					<div className="row">
						<div className="col-md-8">
							<div className="row">
								<div className="col"><BtnCaffeine setValue={setValue} register={register} /></div>
								<div className="col"><BtnAlcohol setValue={setValue} register={register} /></div>
								<div className="w-100"></div>
								<div className="col"><BtnSmoking setValue={setValue} register={register} /></div>
								<div className="col"><BtnStress setValue={setValue} register={register} /></div>
							</div>
						</div>
						<div className="col-md-4" >
							<div className="layoutcenter">
								<TapBar_Nap setValue={setValue} register={register} />
								<TapBar_Work setValue={setValue} register={register} />
								<TapBar_Exer setValue={setValue} register={register} />
							</div>
						</div>
					</div>
					<div className="container-fluid text-center"> 
						<br></br> 
						<BtnConti register={register} />
						<br></br> 
					</div>
				</div>
			</form>
		</div>
	);

}
    
export default dailytest;
