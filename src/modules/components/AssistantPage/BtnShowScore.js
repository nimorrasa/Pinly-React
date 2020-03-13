import React, { Fragment } from "react";

import './formbtn.css';

class BtnShowScore extends React.Component {
    render() {
      return (
        <div >

        <button type="button" className="btn-default" data-toggle="modal" data-target="#exampleModalCenter">SHOW SCORE</button>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Daily Test Score</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              </div>
              <div class="modal-footer">
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
  
  export default BtnShowScore;