import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MyNavbar from '../components/navbar/MyNavbar.js';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';

const Assistant = (props) => {
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['theme']);
    const [isLoading,setIsLoading] = useState(true);
    const [theme,setTheme] = useState(props.theme);
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
    
    useEffect(() => { setTheme(props.theme)});


  useEffect(() => {
    handleNavbarThemeChange(cookies.theme);
    async function fetchData (user_id) {
        let user = await firebase.database().ref('/users/' + user_id).once('value');
        return user.val();
    }

    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            let data = await fetchData(user.uid);
        }else{
            history.push('/login');
        }
        setIsLoading(false);
    });


},[]);


    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className="loading" style={{textAlign: "center",top: "30vh",height: "50vh",color: "white",display : (!isLoading ? 'none' : 'block' )}}>
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>
            <div className={"App Assist "+theme} style={{display : (isLoading ? 'none' : 'block' )}}>
                Assist
            </div>
        </div>
    );
}

export default Assistant;