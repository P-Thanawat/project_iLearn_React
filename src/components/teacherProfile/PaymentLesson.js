import React, { useContext, useState } from 'react'
import { ModalContext } from '../../contexts/ModalContext'
import { Button, Modal } from 'react-bootstrap';
import axios from '../../config/axios';
import { AlertMessageContext } from '../../contexts/AlertMessageContext';

function PaymentLesson() {
  const { showPayment, setShowPayment, paymentData: { learnData, lesson, user, lessonPrice }, setPaymentData, setShowTopup } = useContext(ModalContext)
  const { setMessageText, setShowAlertMessage } = useContext(AlertMessageContext)
  const [paymentMethod, setPaymentMethod] = useState('')

  const handleClose = () => setShowPayment(false);
  const handleShow = () => setShowPayment(true);

  const handlePay = async () => {
    try {
      handleClose()

      if (paymentMethod === 'credit') {
        const { data: { data: userAccount } } = await axios.get(`/userAccount/${user.id}`)
        if (userAccount.credit > lessonPrice) {
          await axios.put('/userAccount/topup', { credit: -(+lessonPrice) })
        }
        else {
          setMessageText('Your Credit is not enough')
          setShowAlertMessage(true)
          setTimeout(() => {
            setShowAlertMessage(false)
          }, 3000);
          return;
        }
      }



      for (let i = 0; i <= learnData.length - 1; i++) {
        await axios.post('/lessonsRecord', { startLearnTime: learnData?.[i]?.start, endLearnTime: learnData?.[i]?.end, completed: false, userAccountId: user?.id, lessonsId: lesson?.[0]?.id })
        await axios.post('userMessenger', { message: `Learner: ${user.firstName} ${user.lastName} have booked your lesson ${lesson[0].lessonName}. Start Learn Time is ${learnData?.[i]?.start} and End Learn Time is ${learnData?.[i]?.end}.`, messageFrom: 1, messageTo: lesson?.[0]?.teacherProfile?.userAccountId })
      }
      await axios.post('userMessenger', { message: 'I have just booked your lesson, Thank you.', messageFrom: user.id, messageTo: lesson?.[0]?.teacherProfile?.userAccountId })
      setMessageText('You have just sent booking request to teacher')
      setShowAlertMessage(true)
      setTimeout(() => {
        setShowAlertMessage(false)
      }, 3000);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  const handleTopup = () => {
    handleClose()
    setShowTopup(true)
  }
  return (
    <>
      <Modal show={showPayment} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`Lesson Price: $${lessonPrice}`}</p>
          <div className="d-flex justify-content-start align-items-center">
            <span>Payment Method: </span>
            <button onClick={() => setPaymentMethod('credit')} className={`btn border mx-2 ${paymentMethod === 'credit' ? 'btn-success' : ''}`}>Credit</button>
            <button onClick={() => setPaymentMethod('banking')} className={`btn border mx-2 ${paymentMethod === 'banking' ? 'btn-success' : ''}`}>iBanking</button>
          </div>
          <div className='mt-2'>
            <button onClick={handlePay} className='btn btn-primary float-end'>Pay</button>
            <button onClick={handleTopup} className='btn btn-secondary float-end mx-2'>Top up Credit</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PaymentLesson
