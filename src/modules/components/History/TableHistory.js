
import React, { useState, useCallback, useEffect } from 'react';
import './layout.css';
import { Table } from 'reactstrap';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';

const TableHistory = (props) => {

	const [toggleLabel,setToggleLabel] = useState(props.toggleLabel);
	const [dateLabel,setDateLabel] = useState('');
	const [datas,setDatas] = useState([]);
	const [theme,setTheme] = useState(props.theme);
	const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

	const handleNavbarThemeChange = useCallback((current_theme) => {
		setNavbarTheme(current_theme);
		setTheme('theme_'+current_theme);
		props.onChangeTheme('theme_'+current_theme);
	},[setNavbarTheme,setTheme]);

	useEffect(
		() => {
			let date = props.date.split('-');
			let date_string = date[2]+'/'+date[1]+'/'+date[0];
			setDateLabel(date_string);
			setDatas(props.data);
		},
		[props.date,props.data]
	)

	const createRow = useCallback((datas) => {

		return (
			<tr>
			<th scope="row">{datas['Sleep_Score_Today']}</th>
			<td >{datas['Time_Hr']} hrs {datas['Time_Min']} min</td>
			<td >{datas['Mic']}</td>
			<td >{datas['Temp']} c</td>
			<td >{datas['Heart_Rate']} bpm</td>
			</tr>
		);
	})

	const createTable = useCallback((datas) => {
		if(!datas) return "No Data";
		return (
			<Table striped>
			<thead>
			<tr>
				<th >SLEEP SCORE</th>
				<th >TOTAL SLEEP HOUR</th>
				<th >SNOR</th>
				<th >TEMPERATURE</th>
				<th >HEART RATE</th>
			</tr>
			</thead>
			<tbody>
			{createRow(datas)}
			</tbody>
	
			</Table>
		);
	})


	return (
	<div className="layout">
			<Button color="secondary" size="lg" id={toggleLabel} block style={{ marginBottom: '1rem' }}>
		{dateLabel}
	</Button>
	<UncontrolledCollapse toggler={`#${toggleLabel}`} >
		{createTable(datas)}
	</UncontrolledCollapse>
	</div>

	);
}

export default TableHistory;