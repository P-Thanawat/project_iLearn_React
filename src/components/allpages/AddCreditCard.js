import React, { useContext, useState } from 'react'
import { ModalContext } from '../../contexts/ModalContext';
import { Button, Modal } from 'react-bootstrap';
import { AlertMessageContext } from '../../contexts/AlertMessageContext';
import axios from '../../config/axios';

function AddCreditCard() {
  const { showAddCreditCard, setShowAddCreditCard } = useContext(ModalContext)
  const { setShowAlertMessage, setMessageText } = useContext(AlertMessageContext)
  const [cardNumber, setCardNumber] = useState('')
  const [expiration, setExpiration] = useState('')
  const [securityCode, setSecurityCode] = useState('')



  const handleClose = () => setShowAddCreditCard(false);
  const handleShow = () => setShowAddCreditCard(true);

  const handleAdd = async () => {
    handleClose()
    setCardNumber('')
    setExpiration('')
    setSecurityCode('')
    await axios.post('/creditCard', { cardNumber, expiration, securityCode, confirmCard: false })
    setMessageText('Add Credit Card Successful')
    setShowAlertMessage(true)
  }

  const handleSetCardNumber = e => {
    if (e.target.value.length <= 16) {
      setCardNumber(e.target.value)
      // if (e.target.value.length === 4 || e.target.value.length === 9 || e.target.value.length === 14) setCardNumber(cur => cur + '-')
    }
  }

  const handleExpiration = e => {
    if (e.target.value.length <= 4) {
      setExpiration(e.target.value)
      // if (e.target.value.length === 2) setExpiration(cur => cur + '/')
    }
  }

  const handleSecurityCode = e => {
    if (e.target.value.length <= 3) {
      setSecurityCode(e.target.value)
    }
  }
  return (
    <>

      <Modal show={showAddCreditCard} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Credit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group flex-nowrap mb-3">
            <span className="input-group-text" id="addon-wrapping">Card Number</span>
            <input value={cardNumber} onChange={handleSetCardNumber} type="text" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX" aria-label="Username" aria-describedby="addon-wrapping" />
          </div>
          <div className="input-group flex-nowrap my-3">
            <span className="input-group-text" id="addon-wrapping">Expiration</span>
            <input value={expiration} onChange={handleExpiration} type="text" className="form-control" placeholder="MM/YY" aria-label="Username" aria-describedby="addon-wrapping" />
          </div>
          <div className="input-group flex-nowrap mt-3">
            <span className="input-group-text" id="addon-wrapping">Security Code</span>
            <input value={securityCode} onChange={handleSecurityCode} type="text" className="form-control" placeholder="XXX" aria-label="Username" aria-describedby="addon-wrapping" />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleAdd}>
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCreditCard
