import React from 'react';
import '../css/ThemeSwitch.css';

export class ThemeSwitch extends React.Component {
  state = {
    input: false
  };

  handleChange = event => {
    const value = this.state.input;
    const current_value = !value;
    this.setState({
      input: current_value
    });
    this.props.onChangeTheme(current_value);   
  };

  render() {
    return (
      <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        name="toggleSwitch"
        id="toggleSwitch"
        value={this.state.input}
        onChange={this.handleChange}
      />
      <label className="toggle-switch-label" htmlFor="toggleSwitch">
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
    );
  }
}