import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';
import firebase from 'firebase';
import { useHistory } from "react-router-dom";

const Profile = (props) => {
    const history = useHistory();
    const [isLoading,setIsLoading] = useState(true);
    const [userData,setUserData] = useState({});
    const [theme,setTheme] = useState(props.theme);
    const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

    const handleNavbarThemeChange = useCallback((current_theme) => {
      setNavbarTheme(current_theme);
      setTheme('theme_'+current_theme);
      props.onChangeTheme('theme_'+current_theme);
    },[setNavbarTheme,setTheme]);
  
  
    useEffect(() => { 
        setTheme(props.theme);
    },[props.theme]);

    useEffect(() => {
		async function fetchData (user_id) {
            let user = await firebase.database().ref('/users/' + user_id).once('value');
            // if(user.val() == null) return null;
			return user.val();
        }
    
        firebase.auth().onAuthStateChanged(async function(user) {
			if (user) {
                let data = await fetchData(user.uid);
                setUserData(data);
            }else{
                history.push('/login');
            }
            setIsLoading(false);
        });
    

	},[firebase]);



    return (
        <div>
            <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className="loading" style={{textAlign: "center",top: "30vh",height: "50vh",color: "white",display : (!isLoading ? 'none' : 'block' )}}>
				<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
			</div>
            <div className={"App Profile "+theme} style={{display : (isLoading ? 'none' : 'block' )}}>
                Profile {userData != null ? userData.username : ''}
            </div>
        </div>

    );
}

export default Profile;