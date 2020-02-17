import React from 'react';
import { Dropdown } from 'react-bootstrap';

export class SettingButton extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     value: null,
    //   };
    // }
  
    render() {
      return (
        <Dropdown>
        <Dropdown.Toggle id="dropdown-custom-components" variant="link">
          <i className="fa fa-cog"></i>
        </Dropdown.Toggle>
    
        <Dropdown.Menu >
          <Dropdown.Item eventKey="1">Red</Dropdown.Item>
          <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
          <Dropdown.Item eventKey="3" active>
            Orange
          </Dropdown.Item>
          <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      );
    }
  }
