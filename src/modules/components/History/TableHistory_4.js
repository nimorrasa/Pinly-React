import React, { useLayoutEffect } from 'react';

import './layout.css';
import { Table } from 'reactstrap';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';

const TableHistory_4 = (props) => {
  return (
    <div className="layout">
         <Button color="secondary" size="lg" id="toggler4" block style={{ marginBottom: '1rem' }}>
      02/03/2020
    </Button>
    <UncontrolledCollapse toggler="#toggler4">
    <Table striped>
      <thead>
        <tr>
          <th className="WhiteFont">SLEEP SCORE</th>
          <th className="WhiteFont">TOTAL SLEEP HOUR</th>
          <th className="WhiteFont">SNOR</th>
          <th className="WhiteFont">TEMPERATURE</th>
          <th className="WhiteFont">HEART RATE</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="WhiteFont" scope="row">98</th>
          <td className="WhiteFont">12 hrs</td>
          <td className="WhiteFont">BAD</td>
          <td className="WhiteFont">27 c</td>
          <td className="WhiteFont">55 bpm</td>
        </tr>
      </tbody>

    </Table>
    </UncontrolledCollapse>
    </div>

  );
}

export default TableHistory_4;