import React, { useState, useCallback } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './MySetting.css';
import { Link } from 'react-router-dom';

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
          <DropdownItem className='my-language'>Language <Link to='/home?lang=th'>TH</Link>/<Link to='/home?lang=en'>EN</Link></DropdownItem>
          <DropdownItem><Link to='/voice_over'>Voice Over</Link></DropdownItem>
          <DropdownItem><Link to='/home?action=logout'>Logout</Link></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  export default MySetting;