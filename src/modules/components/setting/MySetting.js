import React, { useState, useCallback, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './MySetting.css';
import MyLink from '../MyLink.js';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";
import firebase from 'firebase';

const MySetting = (props) => {
    const history = useHistory();
    const [isAuth,setIsAuth] = useState(firebase.auth().currentUser != null);
    const [dropdownOpen,setDropdownOpen] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();

    const toggle = () => setDropdownOpen(!dropdownOpen);

    const onMouseEnter = useCallback(() => {
      setDropdownOpen(true);
    },[setDropdownOpen]);
  
    const onMouseLeave = useCallback(() => {
      setDropdownOpen(false);
    },[setDropdownOpen]);

    async function handleLogout() {
      await firebase.auth().signOut();
      setIsAuth(false);
      removeCookie('token');
      window.location.reload();
    }

    useEffect(() => {
      async function fetchData (user_id) {
          let user = await firebase.database().ref('/users/' + user_id).once('value');
          return user.val();
        }
      
        firebase.auth().onAuthStateChanged(async function(user) {
          if (user) {
              let data = await fetchData(user.uid);
              setIsAuth(true);
            }else{
              setIsAuth(false)
            }
          });
        
  
    },[firebase]);
  
    return (
      <Dropdown className={props.theme} onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave} isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle tag="button" type="button" className="my-button my-setting">
          <i className="fa fa-cog"></i>
        </DropdownToggle>
        <DropdownMenu  right>
          <DropdownItem className='my-language'>Language <MyLink destination='/home?lang=th' text='TH'></MyLink>/<MyLink destination='/home?lang=en' text='EN'></MyLink></DropdownItem>
          <DropdownItem style={{display : (isAuth ? 'block' : 'none' )}}><a onClick={handleLogout}>Logout</a></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  export default MySetting;