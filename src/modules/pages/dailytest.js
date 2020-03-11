import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import { Container, Row, Col } from 'reactstrap';
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

const dailytest = (props) => {
      const [cookies, setCookie, removeCookie] = useCookies(['theme']);
      const [theme,setTheme] = useState(props.theme);
      const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');
  
      const handleNavbarThemeChange = useCallback((current_theme) => {
        setNavbarTheme(current_theme);
        setTheme('theme_'+current_theme);
        props.onChangeTheme('theme_'+current_theme);
      },[setNavbarTheme,setTheme]);
    
      useEffect(() => {
          handleNavbarThemeChange(cookies.theme);
      },[cookies.theme]);
  
      return (
          <div>
              <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>      
        <div className="container-fluid text-center">
         <div className="row">
             <div className="col-md-8">
                  <div className="row">
                  <div className="col"><BtnCaffeine/></div>
                   <div className="col"><BtnAlcohol/></div>
                        <div className="w-100"></div>
                  <div className="col"><BtnSmoking/></div>
                  <div className="col"><BtnStress/></div>
                  </div>
                  </div>
            <div className="col-md-4" > <div className="layoutcenter"><TapBar_Nap/><TapBar_Work/><TapBar_Exer/></div></div>
            </div>


         <div className="container-fluid text-center"> 
         <br></br> 
         <BtnConti/>
         <br></br> 
         </div>
        </div>
        </div>



    );
  }
    
    export default dailytest;