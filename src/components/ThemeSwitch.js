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
      <div>
        <input
          type="checkbox"
          class="checkbox"
          id="night-mode"
          value={this.state.input}
          onChange={this.handleChange}
          defaultChecked={this.state.input}
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