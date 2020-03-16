import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { getDetail } from '../helpers';
import firebase from 'firebase';

import TableHistory from '../components/History/TableHistory.js'
var colorheader ={
  padding: 20
}
const history = (props) => {
	const history = useHistory();
	const [theme,setTheme] = useState(props.theme);
	const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

	const [isLoading,setIsLoading] = useState(true);
	const [userData,setUserData] = useState({});
	const [hardwareData,setHardwareData] = useState([]);

	const handleNavbarThemeChange = useCallback((current_theme) => {
		setNavbarTheme(current_theme);
		setTheme('theme_'+current_theme);
		props.onChangeTheme('theme_'+current_theme);
		},[setNavbarTheme,setTheme]);


	const getWeeklyDate = useCallback(
		() => {
			let res = [];
			var current_date = new Date();
			current_date.setHours(0,0,0);
			for(let i = 7; i>0 ; i--) {
				res[current_date.toISOString().substr(0,10)] = [];
				current_date.setDate(current_date.getDate() - 1);
			}
			return res;
		},
		[]
	)



		const createTable = useCallback((datas) => {
			let table = [];
			for (let data in datas) {
				let content = datas[data];
				table.push(<Row justify-content-md-center="true"><TableHistory toggleLabel={`toggle_${data}`} date={data} data={content}/></Row>)
			}
		return table;
	})

	useEffect(() => {	setTheme(props.theme); },[props.theme])

	useEffect(
		() => {
			async function fetchData (user_id) {
				let user = await firebase.database().ref('/users/' + user_id).once('value');
				// if(user.val() == null) return null;
				return user.val();
			}


			async function fetchHardwardDetail (date,mac_address) {
				const sleep_data = await getDetail(date,mac_address);
				return sleep_data;
			}

			firebase.auth().onAuthStateChanged(async function(user) {
				if (user) {
					let data = await fetchData(user.uid);
					setUserData(data);

					let weekly = getWeeklyDate();

					for (let date in weekly) {
						let weeklyScore = await fetchHardwardDetail(date, data.mac_address);
						weekly[date] = weeklyScore.doc;
					}
					if(weekly) setHardwareData(weekly);
				}else{
					history.push('/login');
				}
			
			})
			setIsLoading(false);
		},
		[]
	);
	return (
		<div className={"App history "+theme}>
			<MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar> 
		<div className="textcenter">
		<Container className="container" fluid="true">
			<Row> {/* Centre */}
			<Col>
				<div className="textsize">
				<h1 style={colorheader}>History</h1>
				</div>
			</Col>
			</Row>
			{createTable(hardwareData)}

		</Container>
		</div>
		</div>
	);
}

export default history;