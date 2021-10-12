import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../../contexts/ModalContext';
import { Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

function TopupCredit() {
  const { showTopup, setShowTopup, setShowAddCreditCard } = useContext(ModalContext)
  const [selectedCredit, setSelectedCredit] = useState(0)
  const [promotionCode, setPromotionCode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [IsShowOther, setIsShowOther] = useState(false)
  const { user } = useContext(AuthContext)
  const [creditCardData, setCreditCardData] = useState([])

  useEffect(() => {
    const run = async () => {
      if (user) {
        const { data: { data: creditCardData } } = await axios.get(`/creditCard/${user.id}`)
        console.log(`creditCardData`, creditCardData)
        setCreditCardData(creditCardData)
      }
    }
    run()
  }, [])



  const handleClose = () => setShowTopup(false);
  const handleShow = () => setShowTopup(true);

  const handleSelectCredit = (value) => {
    setIsShowOther(false)
    setSelectedCredit(value)
  }

  const handleAddCreditCard = () => {
    handleClose()
    setShowAddCreditCard(true)
  }

  const handlePurchase = async () => {
    handleClose()
    await axios.put('/userAccount/topup', { credit: selectedCredit })
  }

  return (
    <>

      <Modal show={showTopup} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Top up Credit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-8"> {/*left*/}
              <div className="card p-4"> {/*select price*/}
                <h4>Purchase Credit</h4>
                <div className="d-flex">
                  <button onClick={() => handleSelectCredit(20)} className={`btn btn-${(selectedCredit === 20 && !IsShowOther) ? 'success' : 'secondary'} m-2`} style={{ width: '100px', height: '50px' }}>$20</button>
                  <button onClick={() => handleSelectCredit(30)} className={`btn btn-${(selectedCredit === 30 && !IsShowOther) ? 'success' : 'secondary'} m-2`} style={{ width: '100px', height: '50px' }}>$30</button>
                  <button onClick={() => handleSelectCredit(50)} className={`btn btn-${(selectedCredit === 50 && !IsShowOther) ? 'success' : 'secondary'} m-2`} style={{ width: '100px', height: '50px' }}>$50</button>
                  <button onClick={() => handleSelectCredit(100)} className={`btn btn-${(selectedCredit === 100 && !IsShowOther) ? 'success' : 'secondary'} m-2`} style={{ width: '100px', height: '50px' }}>$100</button>
                </div>
                <div className="d-flex">
                  <button onClick={() => handleSelectCredit(200)} className={`btn btn-${(selectedCredit === 200 && !IsShowOther) ? 'success' : 'secondary'} m-2`} style={{ width: '100px', height: '50px' }}>$200</button>
                  <button onClick={() => handleSelectCredit(500)} className={`btn btn-${(selectedCredit === 500 && !IsShowOther) ? 'success' : 'secondary'} m-2`} style={{ width: '100px', height: '50px' }}>$500</button>
                  <button onClick={() => handleSelectCredit(1000)} className={`btn btn-${(selectedCredit === 1000 && !IsShowOther) ? 'success' : 'secondary'} m-2`} style={{ width: '100px', height: '50px' }}>$1000</button>
                  <button onClick={() => setIsShowOther(true)} className={`btn btn-${IsShowOther ? 'success' : 'secondary'} m-2`} style={{ width: '100px', height: '50px' }}>Other</button>
                </div>
                {IsShowOther &&
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Other</span>
                    <input value={selectedCredit} onChange={e => setSelectedCredit(e.target.value)} type="text" class="form-control" placeholder="Input credit" aria-label="Username" aria-describedby="addon-wrapping" />
                  </div>
                }
              </div>
              <div className="card my-2"> {/*promotion code*/}
                <div className="input-group input-group-lg">
                  <span className="input-group-text" id="inputGroup-sizing-lg">Promotion Code</span>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                </div>
              </div>
              <div className="card p-3">
                <h4 className='mb-3'>Payment Method</h4>
                <div className="d-flex justify-content-start align-items-center my-2">
                  <button onClick={() => setPaymentMethod('ibanking')} className={`btn border mx-2 ${paymentMethod === 'ibanking' ? 'btn-success' : ''}`}>iBanking</button>
                  <button onClick={() => setPaymentMethod('creditcard')} className={`btn border mx-2 ${paymentMethod === 'creditcard' ? 'btn-success' : ''}`} type="button">
                    Credit Card
                  </button>
                  {paymentMethod === 'creditcard' &&
                    <select class="form-select" style={{ width: '200px' }} aria-label="Default select example">
                      <option selected>Select Your Credit Card</option>
                      {creditCardData.map(item => (
                        <option key={item.id} value={item.cardNumber}>{item.cardNumber}</option>
                      ))}
                    </select>
                  }
                </div>
                <div className='m-2'>
                  <button onClick={handleAddCreditCard} className='btn btn-danger float-start'>ADD New Credit Card</button>
                </div>
              </div>
            </div>
            <div className="col-4">{/*right*/}
              <div className="card p-2 pt-4">
                <h5>iLearn Credit: </h5>
                <hr />
                <div className="row">
                  <p className='col-6'>Sub-Total</p>
                  <p className='col-6 fw-bold'>{`$${selectedCredit} USD`}</p>
                </div>
                <div className="row">
                  <p className='col-6'>Processing fee</p>
                  <p className='col-6 fw-bold'>{`$${selectedCredit * 0.05} USD`}</p>
                </div>
                <hr />
                <div className="row">
                  <p className='col-6'>Total</p>
                  <p className='col-6 fw-bold'>{`$${selectedCredit * 1.05} USD`}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePurchase}>
            PURCHASE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TopupCredit
