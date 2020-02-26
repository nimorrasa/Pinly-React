import React from 'react';
import { Link } from 'react-router-dom';

const MyLink = (props) => {

    return (
        <Link className="my-link" style={{textDecoration: "none", paddingLeft: "5px", paddingRight: "5px"}} to={props.destination}>{props.text}</Link>
    );
  }

  export default MyLink;