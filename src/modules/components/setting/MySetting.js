import React, { useState, useCallback, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './MySetting.css';
import MyLink from '../MyLink.js';
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

const MySetting = (props) => {
    const history = useHistory();
    const [isAuth,setIsAuth] = useState(props.isAuth);
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
      await props.firebase.auth().signOut();
      setIsAuth(false);
      removeCookie('token');
      window.location.reload();
    }

    useEffect(() => {
      setIsAuth(props.isAuth);
    },[setIsAuth]);


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