import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { AlertMessageContext } from '../../contexts/AlertMessageContext';

function AlertMessage({ message }) {

  const { showAlertMessage, setShowAlertMessage, messageText, setMessageText } = useContext(AlertMessageContext)


  const handleClose = () => setShowAlertMessage(false);
  const handleShow = () => setShowAlertMessage(true);

  return (
    <>

      <Modal show={showAlertMessage} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{messageText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default AlertMessage
