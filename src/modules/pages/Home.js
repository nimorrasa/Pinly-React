import React, { useState, useCallback, useEffect } from 'react';
import { Button, Container, Row } from 'reactstrap';
import logo from '../../images/logo.png';
import '../css/MyTheme.css';
import '../css/Home.css';
import MyLink from '../components/MyLink.js';
import MyNavbar from '../components/navbar/MyNavbar.js';
import firebase from 'firebase';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['theme']);
  const [isLoading,setIsLoading] = useState(true);
  const [auth,setAuth] = useState(firebase.auth().currentUser);
  const [userData,setUserData] = useState({});
  const [theme, setTheme] = useState(cookies.theme);
  const [navbarTheme, setNavbarTheme] = useState(cookies.theme === 'theme_dark' ? 'dark' : 'light');

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
        setAuth(user);
        let user_data = await fetchData(user.uid);
        setUserData(user_data);
        history.push('/sleep_score');
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
      <div className={"App Home "+theme} style={{display : (isLoading ? 'none' : 'block' )}}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          <Container className={"App-content "+theme}>
              <Row className="Link-padding" style={{display : (auth != null ? 'none' : 'block' )}}>
                  <MyLink className="App-link" destination='/login' text="Login"></MyLink> | <MyLink className="App-link" destination='sign_up' text="Sign Up"></MyLink>
              </Row>
              <Row className="Link-padding" style={{display : (auth != null ? 'block' : 'none' )}}>
                  {auth == null ? '' : 'Hello, '+auth.email}
              </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Home;