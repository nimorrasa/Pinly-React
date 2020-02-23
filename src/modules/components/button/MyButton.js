import React from 'react';
import './MyButton.css';

const MyButton = (props) => {

    if(props.type === 'icon') {
      return (
        <button tag="button" type="button" className="my-button"><i className={props.title}></i></button>
        );
    }
    
    return (
      <button tag="button" type="button" className="my-button">{props.title}</button>
    );

}

  export default MyButton;