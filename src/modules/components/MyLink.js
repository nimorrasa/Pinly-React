import React from 'react';
import { Link } from 'react-router-dom';

const MyLink = (props) => {

    return (
        <Link style={{textDecoration: "none"}} to={props.destination}>{props.text}</Link>
    );
  }

  export default MyLink;