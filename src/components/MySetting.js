import React, { useState, useCallback } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../css/MySetting.css';

const MySetting = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen,setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);
    const submenuToggle = () => setIsOpen(!isOpen);

    const onMouseEnter = useCallback(() => {
      setDropdownOpen(true);
    },[setDropdownOpen]);
  
    const onMouseLeave = useCallback(() => {
      setDropdownOpen(false);
    },[setDropdownOpen]);

    const onMouseEnterSubmenu = useCallback(() => {
      setIsOpen(true);
    },[setIsOpen]);
  
    const onMouseLeaveSubmenu = useCallback(() => {
      setIsOpen(false);
    },[setIsOpen]);
  

    return (
      <Dropdown className={props.theme} onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave} isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle tag="button" type="button" className="my-button my-setting">
          <i className="fa fa-cog"></i>
        </DropdownToggle>
        <DropdownMenu  right>
          <DropdownItem className='my-language'>Language <a>TH</a>/<a>EN</a></DropdownItem>
          <DropdownItem><a>Voice Over</a></DropdownItem>
          <DropdownItem><a>Logout</a></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  export default MySetting;