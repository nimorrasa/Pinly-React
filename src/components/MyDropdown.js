import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class MyDropdown extends React.Component {

    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
      this.state = {
        dropdownOpen: false
      };
    }
  
    toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }
  
    onMouseEnter() {
      this.setState({dropdownOpen: true});
    }
  
    onMouseLeave() {
      this.setState({dropdownOpen: false});
    }
  
    render() {

      const items = this.props.items;
      return (
        <Dropdown className={"d-inline-block "+this.props.theme} onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.props.titleType === 'text' ? this.props.title : <i className={this.props.title}></i>}
          </DropdownToggle>
          <DropdownMenu  right={this.props.alignment === 'right'}>
            {this.props.items.map((item,key) => <DropdownItem key={key}>{item}</DropdownItem>)}
          </DropdownMenu>
        </Dropdown>
      );
    }
  }