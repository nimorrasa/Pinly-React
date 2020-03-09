import React, { Fragment } from "react";
import { MDBBtn } from "mdbreact";
import './formbtn.css';
import './text.css';

class BtnSummary extends React.Component {
    render() {
      return (
        <div >
          <button type="button" class="btn-default" data-toggle="modal" data-target="#myModal">
            SUMMARY
          </button>

          <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  {/*<h4 class="modal-title" id="myModalLabel">Modal title</h4>*/}
                </div>
                <div class="modal-body">
                  TOTALS SLEEP SCORE : "Disconnect to Database"
                </div>
                <div class="modal-footer">
                <button type="button" class="btn-default">READ</button>
                  <button type="button" class="btn-gray" data-dismiss="modal">Close</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default BtnSummary;