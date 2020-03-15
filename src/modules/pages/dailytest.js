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
import { log_data } from '../helpers';

const dailytest = (props) => {
    const history = useHistory();
	const { handleSubmit, register, setValue , getValues, errors } = useForm();

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

	const submitSleep = useCallback(
		async (newData) => {
			let timestamp = new Date();
			let userId = userData.uid;
			let sleepData = {};
			let daily_test = {};
			daily_test.alcohol = newData.alcohol;
			daily_test.caffeine = newData.caffeine;
			daily_test.smoking = newData.smoking;
			daily_test.stress = newData.stress;
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
