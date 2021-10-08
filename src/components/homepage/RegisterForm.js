import axios from '../../config/axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import { showLearnerFormContext } from '../../contexts/ShowLeanerFormContext'
import { AlertMessageContext } from '../../contexts/AlertMessageContext'
import { ModalContext } from '../../contexts/ModalContext'
import { Button, Modal } from 'react-bootstrap';

function RegisterForm() {

  const [typeAccount, setTypeAccount] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [livingArea, setLivingArea] = useState('')
  const { showLearnerForm, setShowLearnerForm } = useContext(showLearnerFormContext)
  const { showAlertMessage, setShowAlertMessage, messageText, setMessageText } = useContext(AlertMessageContext)
  const { showRegisterForm, setShowRegisterForm } = useContext(ModalContext)

  useEffect(() => {
    setTypeAccount('')
    setFirstName('')
    setLastName('')
    setBirthDate('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setProfilePicture('')
    setLivingArea('')

  }, [showRegisterForm])

  const handleClose = () => setShowRegisterForm(false);
  const handleShow = () => setShowRegisterForm(true);


  const handleProfilePicture = e => {
    e.preventDefault();
    setProfilePicture(e.target.files[0])
  }

  const handleRegister = async e => {
    e.preventDefault();
    setShowRegisterForm(false)
    const formData = new FormData();
    typeAccount && formData.append('typeAccount', typeAccount) //null is changed to 'null', so it has to be checked beforehand
    firstName && formData.append('firstName', firstName)
    lastName && formData.append('lastName', lastName)
    birthDate && formData.append('birthDate', birthDate)
    email && formData.append('email', email)
    password && formData.append('password', password)
    confirmPassword && formData.append('confirmPassword', confirmPassword)
    profilePicture && formData.append('profilePicture', profilePicture) //picture
    livingArea && formData.append('livingArea', livingArea)

    await axios.post('/register', formData)
      .then(res => {
        console.log(`res`, res)
        console.log('register successful')
        setMessageText('Register Successful')
        setShowAlertMessage(true);
        setTimeout(() => {
          setShowAlertMessage(false);
        }, 2000);
        // if (typeAccount === 'learner') setShowLearnerForm(true)
        // if(typeAccount === 'teacher')setShowLearnerForm(true)

      })
      .catch(err => {
        console.log(err)
      })

  }

  return (
    <>

      <Modal show={showRegisterForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CREATE YOUR ACCOUNT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className={`btn btn-${typeAccount === 'teacher' ? 'success' : 'secondary'} me-3`} onClick={() => setTypeAccount('teacher')}>Teacher</div>
            <div className={`btn btn-${typeAccount === 'learner' ? 'success' : 'secondary'} me-3`} onClick={() => setTypeAccount('learner')}>Learner</div>
          </div>
          <form onSubmit={handleRegister}>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>First Name</label>
              <input type="text" className='form-control' value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Last Name</label>
              <input type="text" className='form-control' value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Birth Date</label>
              <input type="date" className='form-control' value={birthDate} onChange={e => setBirthDate(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Email</label>
              <input type="text" className='form-control' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Password</label>
              <input type="password" className='form-control' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Confirm Password</label>
              <input type="password" className='form-control' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>ProfilePicture</label>
              <input type="file" className='form-control' onChange={handleProfilePicture} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Living Area</label>
              <input type="text" className='form-control' value={livingArea} onChange={e => setLivingArea(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary float-end" data-bs-dismiss="modal">Register</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
  return (
    <div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="registerForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">CREATE YOUR ACCOUNT</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <div className={`btn btn-${typeAccount === 'teacher' ? 'success' : 'secondary'} me-3`} onClick={() => setTypeAccount('teacher')}>Teacher</div>
                <div className={`btn btn-${typeAccount === 'learner' ? 'success' : 'secondary'} me-3`} onClick={() => setTypeAccount('learner')}>Learner</div>
              </div>
              <form onSubmit={handleRegister}>
                <div className="input-group mb-3">
                  <label htmlFor="" className='input-group-text'>First Name</label>
                  <input type="text" className='form-control' value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="" className='input-group-text'>Last Name</label>
                  <input type="text" className='form-control' value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="" className='input-group-text'>Birth Date</label>
                  <input type="date" className='form-control' value={birthDate} onChange={e => setBirthDate(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="" className='input-group-text'>Email</label>
                  <input type="text" className='form-control' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="" className='input-group-text'>Password</label>
                  <input type="password" className='form-control' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="" className='input-group-text'>Confirm Password</label>
                  <input type="password" className='form-control' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="" className='input-group-text'>ProfilePicture</label>
                  <input type="file" className='form-control' onChange={handleProfilePicture} />
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="" className='input-group-text'>Living Area</label>
                  <input type="text" className='form-control' value={livingArea} onChange={e => setLivingArea(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary float-end" data-bs-dismiss="modal">Register</button>
              </form>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
