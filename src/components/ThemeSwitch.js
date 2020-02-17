import React from 'react';
import './ThemeSwitch.css';

export class ThemeSwitch extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     value: null,
    //   };
    // }
  
    render() {
      return (
        <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name="toggleSwitch"
          id="toggleSwitch"
        />
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
      );
    }
  }
