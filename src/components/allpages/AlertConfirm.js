import React, { useContext } from 'react'
import { ModalContext } from '../../contexts/ModalContext';
import { Button, Modal } from 'react-bootstrap';

function AlertConfirm() {
  const { showAlertConfirm, setShowAlertConfirm, setAnswer } = useContext(ModalContext)


  const handleClose = () => setShowAlertConfirm(false);
  const handleShow = () => setShowAlertConfirm(true);

  return (
    <>

      <Modal show={showAlertConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure!</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlertConfirm
