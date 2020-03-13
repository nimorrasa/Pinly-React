
import React, { useState, useCallback, useEffect } from 'react';
import './layout.css';
import { Table } from 'reactstrap';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';

const TableHistory_7 = (props) => {

  
  const [theme,setTheme] = useState(props.theme);
  const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

  const handleNavbarThemeChange = useCallback((current_theme) => {
    setNavbarTheme(current_theme);
    setTheme('theme_'+current_theme);
    props.onChangeTheme('theme_'+current_theme);
  },[setNavbarTheme,setTheme]);
  
  return (
    <div className="layout">
         <Button color="secondary" size="lg" id="toggler7" block style={{ marginBottom: '1rem' }}>
      05/03/2020
    </Button>
    <UncontrolledCollapse toggler="#toggler7">
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
        <tr>
          <th scope="row">98</th>
          <td >12 hrs</td>
          <td >BAD</td>
          <td >27 c</td>
          <td >55 bpm</td>
        </tr>
      </tbody>

    </Table>
    </UncontrolledCollapse>
    </div>

  );
}

export default TableHistory_7;