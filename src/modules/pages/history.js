import React, { useState, useCallback, useEffect } from 'react';

//import Component ที่ต้องใช้
import MyNavbar from '../components/navbar/MyNavbar.js';
import '../components/text.css';
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { getDetail } from '../helpers';
import firebase from 'firebase';
import TableHistory from '../components/History/TableHistory.js'

// ตัวแปรสำหรับตั้งค่า css
var colorheader ={
  padding: 20
}

//สร้าง component ชื่อ history โดยให้รับตัวแปรมาเป็น props ด้วย (React Hook)
const history = (props) => {
	//ประกาศตัวแปรที่จำเป็นต้องใช้ใน component นี้
	const history = useHistory();
	const [theme,setTheme] = useState(props.theme);
	const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

	const [isLoading,setIsLoading] = useState(true);
	const [userData,setUserData] = useState({});
	const [hardwareData,setHardwareData] = useState([]);

	// สร้าง callback function สำหรับการเปลี่ยนแปลง theme
	const handleNavbarThemeChange = useCallback((current_theme) => {
		setNavbarTheme(current_theme);
		setTheme('theme_'+current_theme);
		props.onChangeTheme('theme_'+current_theme);
		},[setNavbarTheme,setTheme]);


	// จัดฟอแมตข้อมูลการนอนรายสัปดาห์
	const getWeeklyDate = useCallback(
		() => {
			let res = [];
			var current_date = new Date();
			// current_date.setHours(0,0,0);
			for(let i = 7; i>0 ; i--) {
				res[current_date.toISOString().substr(0,10)] = [];
				current_date.setDate(current_date.getDate() - 1);
			}
			return res;
		},
		[]
	)


	// function สำหรับแปลงข้อมูลการนอนเป็นตารางสำหรับเอาไปเรียกใช้
	const createTable = useCallback((datas) => {
			let table = [];
			for (let data in datas) {
				let content = datas[data];
				// console.log(content);
				table.push(<Row justify-content-md-center="true"><TableHistory theme={theme} toggleLabel={`toggle_${data}`} date={data} data={content}/></Row>)
			}
		return table;
	})

	// อัพเดท theme เมื่อมีการเปลี่ยนแปลง
	useEffect(() => {	setTheme(props.theme); },[props.theme])

	// สำหรับตั้งค่าตัวแปรต่างๆก่อนจะ reder html ออกมา โดยจะดึงข้อมูลจาก firebase และ หลังบ้านมาอัพเดทเพื่อนำไปแสดง
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

	// Render ออกไปเป็น html
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
			<Row className="scrollable" style={{height: "70vh",overflowY : "scroll"}}>
				<Col>
				{createTable(hardwareData)}
				</Col>
			</Row>


		</Container>
		</div>
		</div>
	);
}

// export เพื่อให้สามารถเรียกใช้ component นี้ได้ในที่อื่นโดยการ import
export default history;