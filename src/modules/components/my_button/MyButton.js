import React from 'react';
import '../css/MyButton.css';

const MyButton = (props) => {

    return (
    <button tag="button" type="button" className="my-button">{props.title}</button>
    );
}

  export default MyButton;