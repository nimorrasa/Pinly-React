import React, { useState, useCallback } from 'react';
import '../css/ThemeSwitch.css';

const ThemeSwitch = (props) => {

  const [isDark,setIsDark] = useState(props.isDark);

  const handleChange = () => {
    let new_theme = !isDark;
    setIsDark(new_theme);
    props.onChangeTheme(new_theme)
  };

  return (
    <button className="icon-button">
      <input
        type="checkbox"
        className="checkbox"
        id="night-mode"
        value={isDark}
        onChange={handleChange}
        defaultChecked={isDark}
        />
      <label htmlFor="night-mode" className="label">
        <i className="fa fa-sun-o"></i>
        <i className="fa fa-moon-o"></i>
        <div className="blob"></div>
      </label>
    </button>
  );
}

export default ThemeSwitch;