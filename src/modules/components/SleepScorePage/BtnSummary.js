import React, { Fragment } from "react";
// import { MDBBtn } from "mdbreact";
import './formbtn.css';
import '../../css/text.css';

class BtnSummary extends React.Component {
    render() {
      return (
        <div >
          <button type="button" className="btn-default" data-toggle="modal" data-target="#myModal">
            SUMMARY
          </button>

          <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  {/*<h4 className="modal-title" id="myModalLabel">Modal title</h4>*/}
                </div>
                <div className="modal-body">
                  TOTALS SLEEP SCORE : "Disconnect to Database"
                </div>
                <div className="modal-footer">
                <button type="button" className="btn-default">READ</button>
                  <button type="button" className="btn-gray" data-dismiss="modal">Close</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default BtnSummary;