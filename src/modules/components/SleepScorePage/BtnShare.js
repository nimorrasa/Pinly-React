import React from "react";
import './formbtn.css';
import './text.css';

class BtnShare extends React.Component {
    render() {
      return (
        <div className="btn-padding-left">
         <button type="button" className="btn-gray" data-toggle="modal" data-target="#Shared">
              SHARE
          </button>
        </div>
      );
    }
  }
  
  export default BtnShare;