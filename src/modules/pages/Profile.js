import React, { useState, useCallback, useEffect } from 'react';
import MyNavbar from '../components/navbar/MyNavbar.js';

const Profile = (props) => {
    let firebase = props.firebase;
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
        async function fetchData() {
            let user = await firebase.database().ref('/users/' + props.userId).once('value');
            setUserData(user.val());
          }
          fetchData();
    },[props.userId]);

    return (
        <div>
            <MyNavbar firebase={props.firebase} theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
            <div className={"App Profile "+theme}>
                Profile {userData.username}
            </div>
        </div>

    );
}

export default Profile;