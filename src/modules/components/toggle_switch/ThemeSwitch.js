import React, { useState, useCallback, useEffect } from 'react';
import './ThemeSwitch.css';

const ThemeSwitch = (props) => {

  const [isDark,setIsDark] = useState(false);

  const handleChange = () => {
    let new_theme = !isDark;
    setIsDark(new_theme);
    props.onChangeTheme(new_theme)
  };

  useEffect(() => {
    setIsDark(props.isDark)
  }, [props.isDark])

  return (
    <button className="icon-button">
      <input
        style={{width: "auto"}}
        type="checkbox"
        className="checkbox"
        id="night-mode"
        defaultValue={isDark}
        onChange={handleChange}
        checked={isDark}
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