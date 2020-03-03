import React, { useState, useCallback, useEffect } from 'react';
import { Button, Container, Row } from 'reactstrap';
import logo from '../../images/logo.png';
import '../css/MyTheme.css';
import '../css/Home.css';
import MyLink from '../components/MyLink.js';
import MyNavbar from '../components/navbar/MyNavbar.js';
import firebase from 'firebase';

const Home = (props) => {
  const [auth,setAuth] = useState(firebase.auth().currentUser);
  const [userData,setUserData] = useState({});
  const [theme, setTheme] = useState(props.theme);
  const [navbarTheme, setNavbarTheme] = useState(props.theme === 'theme_dark' ? 'dark' : 'light');

  const handleNavbarThemeChange = useCallback((current_theme) => {
    setNavbarTheme(current_theme);
    setTheme('theme_'+current_theme);
    props.onChangeTheme('theme_'+current_theme);
  },[setNavbarTheme,setTheme]);


  useEffect(() => { setTheme(props.theme)});


  // useEffect(() => { 
  //   async function fetchData() {
  //       if(firebase.auth().currentUser != null) {
  //           let user = await firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value');
  //           setUserData(user.val());

  //       }
  //     }
  //     fetchData();
  // },[firebase]);


  useEffect(() => {
		async function fetchData (user_id) {
			let user = await firebase.database().ref('/users/' + user_id).once('value');
			return user.val();
		}

		async function isRedirect () {
			let redirectResult = await firebase.auth().getRedirectResult();
			console.log("Redirect :",redirectResult);
			if(redirectResult.operationType == 'signIn'){
				let get_user_data = fetchData(redirectResult.user.uid);
				if(get_user_data != null) {
          setUserData(get_user_data);
          setAuth(firebase.auth().currentUser);
				}
			}
		}
		isRedirect();
	},[]);



  return (
    <div>
      <MyNavbar theme={navbarTheme} onChangeTheme={handleNavbarThemeChange} hideThemeSwitch={false}></MyNavbar>
      <div className={"App Home "+theme}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          <Container className={"App-content "+theme}>
              <Row className="Link-padding" style={{display : (auth != null ? 'none' : 'block' )}}>
                  <MyLink className="App-link" destination='/login' text="Login"></MyLink> | <MyLink className="App-link" destination='sign_up' text="Sign Up"></MyLink>
              </Row>
              <Row className="Link-padding" style={{display : (auth != null ? 'block' : 'none' )}}>
                  {auth == null ? '' : 'Hello, '+auth.email}
              </Row>
              <Row>
                  <Button style={{borderWidth: 2, borderRadius: 20 }} className="App-button">GET STARTED</Button>
              </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Home;