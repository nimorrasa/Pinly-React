import React, { useLayoutEffect } from 'react';

import './layout.css';
import { Table } from 'reactstrap';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';

const TableHistory_1 = (props) => {
  return (
    <div className="layout">
         <Button color="secondary" size="lg" id="toggler1" block style={{ marginBottom: '1rem' }}>
      28/02/2020
    </Button>
    <UncontrolledCollapse toggler="#toggler1">
    <Table striped>
      <thead>
        <tr>
          <th >SLEEP SCORE</th>
          <th >TOTAL SLEEP HOUR</th>
          <th >SNOR</th>
          <th >TEMPERATURE</th>
          <th >HEART RATE</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">98</th>
          <td >12 hrs</td>
          <td >BAD</td>
          <td >27 c</td>
          <td >55 bpm</td>
        </tr>
      </tbody>

    </Table>
    </UncontrolledCollapse>
    </div>

  );
}

export default TableHistory_1;