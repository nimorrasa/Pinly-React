import React, { useState, useCallback, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './MySetting.css';
import MyLink from '../MyLink.js';
import { useCookies } from 'react-cookie';

const MySetting = (props) => {
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
      removeCookie('token');
    }

    useEffect(() => {
      setIsAuth(props.isAuth);
    });


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