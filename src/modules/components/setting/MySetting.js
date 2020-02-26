import React, { useState, useCallback } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './MySetting.css';
import MyLink from '../MyLink.js';

const MySetting = (props) => {
  const [dropdownOpen,setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);

    const onMouseEnter = useCallback(() => {
      setDropdownOpen(true);
    },[setDropdownOpen]);
  
    const onMouseLeave = useCallback(() => {
      setDropdownOpen(false);
    },[setDropdownOpen]);


    return (
      <Dropdown className={props.theme} onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave} isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle tag="button" type="button" className="my-button my-setting">
          <i className="fa fa-cog"></i>
        </DropdownToggle>
        <DropdownMenu  right>
          <DropdownItem className='my-language'>Language <MyLink destination='/home?lang=th' text='TH'></MyLink>/<MyLink destination='/home?lang=en' text='EN'></MyLink></DropdownItem>
          <DropdownItem><MyLink destination='/home?action=logout' text='Logout'></MyLink></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  export default MySetting;