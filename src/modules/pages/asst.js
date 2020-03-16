import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from "react-router-dom";
import AsstData from '../components/AssistantPage/AsstData.js';
import firebase from 'firebase';

const Assistant = (props) => {
	const history = useHistory();
	const datas = ['Alcohol','Coffee','Smoke','Tea','Nap','Exercise','Work'];
	const [isLoading,setIsLoading] = useState(true);
	const [showData,setShowData] = useState([]);
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
				result.push(<Row justify-content-md-center="true"><AsstData title={index} detail={assistant[index]}/></Row>)
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
					console.log(data);
					setUserData(data);
					setShowData(data.asst);
				}else{
					history.push('/login');
				}
			
			})
			setIsLoading(false);
		},
		[]
	)

    return (
        <div className={"App Assistant "+theme}>
        <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar> 
			<Container className="container" fluid="true">
				<Row> {/* Centre */}
				<Col>
				<div className="textcenter">
					<div className="textsize">
					<h1>Assistant</h1>
					</div>
				</div>
				</Col>
			</Row>
			{createAsstData(showData)}
			<Row justify-content-md-center="true">
				<button type="button" onClick={goToSleepScore}className="btn-default" data-toggle="modal" data-target="#exampleModalCenter">SHOW SCORE</button>
			</Row>
			</Container>
    	</div>
    );
}

export default Assistant;