import React, { Fragment } from "react";
import './formbtn.css';
import './text.css';

class BtnConti extends React.Component {    
    render() {

      return (
        <div> 
            <a href="/wait_to_sleep"><button className="btn-default">Continue ></button></a>
        </div>
      );
    }
  }
  
  export default BtnConti;