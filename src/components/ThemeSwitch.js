import React from 'react';
import '../css/ThemeSwitch.css';

export class ThemeSwitch extends React.Component {
  state = {
    input: this.props.is_dark,
  };

  handleChange = event => {
    const value = this.state.input;
    const current_value = !value;
    // const current_theme = current_value ? 'dark_theme' : 'light_theme';
    this.setState({
      input: current_value,
      // theme: current_theme
    });
    this.props.onChangeTheme(current_value);   
  };

  render() {
    return (
      <button className="icon-button">
        <input
          type="checkbox"
          className="checkbox"
          id="night-mode"
          value={this.state.input}
          onChange={this.handleChange}
          defaultChecked={this.state.input}
          />
        <label htmlFor="night-mode" className="label">
          <i className="fa fa-sun-o"></i>
          <i className="fa fa-moon-o"></i>
          <div className="blob"></div>
        </label>
      </button>
    );
  }
}