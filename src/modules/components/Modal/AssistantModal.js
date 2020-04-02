/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import './AssitantModal.css';
import { Row } from 'reactstrap';

const AssistantModal = (props) => {

  const [dateLabel,setDateLabel] = useState('');
  const [dailyResult,setDailyResult] = useState({});

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function getDateFormat(current_date) {
    let array_date = current_date && current_date.substr(0,10).split('-');
    return array_date && array_date.length == 3 && array_date[2]+'/'+array_date[1]+'/'+array_date[0];
  }


  useEffect(
    () => {
      setDateLabel(props.value.current_sleep);
      setDailyResult(props.value.daily_test);
    },
    [props.value]
  )

  return (
    <div>
      <Button className="App-button" color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>Daily Score on {getDateFormat(dateLabel)}</ModalHeader>
        <ModalBody>
          <Table>
            <tbody>
              <tr>
                <th scope="row">Coffee</th>
                <td>{dailyResult && dailyResult.coffee}</td>
              </tr>
              <tr>
                <th scope="row">Alcohol</th>
                <td>{dailyResult && dailyResult.alcohol}</td>
              </tr>
              <tr>
                <th scope="row">Working</th>
                <td>{dailyResult && dailyResult.working}</td>
              </tr>
              <tr>
                <th scope="row">Stress</th>
                <td>{dailyResult && dailyResult.tea}</td>
              </tr>
              <tr>
                <th scope="row">Nap</th>
                <td>{dailyResult && dailyResult.nap}</td>
              </tr>
              <tr>
                <th scope="row">Excercise</th>
                <td>{dailyResult && dailyResult.exercise}</td>
              </tr>
            </tbody>
          </Table>

        </ModalBody>
      </Modal>
    </div>
  );
}

export default AssistantModal;