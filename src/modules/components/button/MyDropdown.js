import React, { useState, useCallback } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './MyButton.css';
import MyLink from '../MyLink.js';

const MyDropdown = (props) => {
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
        <DropdownToggle tag="button" type="button" className="my-button">
          {props.titleType === 'text' ? props.title : <i className={props.title}></i>}
        </DropdownToggle>
        <DropdownMenu  right={props.alignment === 'right'}>
          {props.items.map((item,key) => <DropdownItem key={key}><MyLink destination={'/'+item.toLowerCase().split(' ').join('_')} text={item}></MyLink></DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
    );
  }

  export default MyDropdown;