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
      <div class="night-mode-button">
        <input
          type="checkbox"
          class="checkbox"
          id="night-mode"
          value={this.state.input}
          onChange={this.handleChange}
          />
        <label for="night-mode" class="label">
          <i class="fa fa-sun-o"></i>
          <i class="fa fa-moon-o"></i>
          <div class="blob"></div>
        </label>
      </div>
    );
  }
}