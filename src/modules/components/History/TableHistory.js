import React, { useLayoutEffect } from 'react';

import './layout.css';
import { Table } from 'reactstrap';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';

const TableHistory = (props) => {
  return (
    <div className="layout">
         <Button color="secondary" size="lg" id="toggler" block style={{ marginBottom: '1rem' }}>
      28/02/2020
    </Button>
    <UncontrolledCollapse toggler="#toggler">
    <Table striped>
      <thead>
        <tr>
          <th className="WhiteFont">TOTAL</th>
          <th className="WhiteFont">STATE</th>
          <th className="WhiteFont">SNOR</th>
          <th className="WhiteFont">HEART RATE</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="WhiteFont" scope="row">98</th>
          <td className="WhiteFont">GOOD</td>
          <td className="WhiteFont">25</td>
          <td className="WhiteFont">80</td>
        </tr>
      </tbody>

    </Table>
    </UncontrolledCollapse>
    </div>

  );
}

export default TableHistory;