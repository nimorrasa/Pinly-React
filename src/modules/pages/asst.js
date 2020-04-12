import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import '../components/text.css';
import '../css/Assistant.css';
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from "react-router-dom";
import AsstData from '../components/AssistantPage/AsstData.js';
import firebase from 'firebase';
import AssistantModal from '../components/Modal/AssistantModal.js';

const Assistant = (props) => {
	const history = useHistory();
	const datas = {'asst_alcohol' : 'Alcohol','asst_coffee' : 'Coffee','asst_smoking' : 'Smoke','asst_tea': 'Tea','asst_nap' : 'Nap','asst_exercise' :'Exercise','asst_working' :'Work'};
	const [isLoading,setIsLoading] = useState(true);
	const [showData,setShowData] = useState({
		"asst_coffee" : "No today data yet",
		"asst_smoking" : "No today data yet",
		"asst_tea" : "No today data yet",
		"asst_nap" : "No today data yet",
		"asst_exercise" : "No today data yet",
		"asst_working" : "No today data yet"
	});
	const [userData,setUserData] = useState({});
    const [theme,setTheme] = useState(props.theme);
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
		setNavbarTheme(current_theme);
		setTheme('theme_'+current_theme);
		props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
    
    useEffect(() => { setTheme(props.theme)}, [props.theme]);

	const createAsstData = useCallback(
		(assistant) => {
			let result = [];
			for( let index in assistant) {
				result.push(<Row ><AsstData title={datas[index]} detail={assistant[index]}/></Row>)
			}
			return result;
		},
		[]
	)

	const goToSleepScore = useCallback(() => { history.push('/sleep_score');},[]);

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
					if(data && data.asst) setShowData(data.asst);
				}else{
					history.push('/login');
				}
			
			})
			setIsLoading(false);
		},
		[]
	)

    return (
        <div>
        <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar> 
		<div className={"App Assistant "+theme}>
			<Row> {/* Centre */}
			<Col>
			<div className="textcenter">
				<div className="textsize">
				<h1>Assistant</h1>
				</div>
			</div>
			</Col>
		</Row>
		<Row className="scrollable">
			<Col>
				{createAsstData(showData)}
			</Col>
		</Row>

		<Row >
			<AssistantModal buttonLabel="SHOW SCORE" value={userData}></AssistantModal>
		</Row>
		</div>
    	</div>
    );
}

export default Assistant;