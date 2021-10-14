import axios from '../../config/axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import { showLearnerFormContext } from '../../contexts/ShowLeanerFormContext'
import { AlertMessageContext } from '../../contexts/AlertMessageContext'
import { ModalContext } from '../../contexts/ModalContext'
import { Button, Modal } from 'react-bootstrap';

function RegisterForm() {

  const initialRegister = {
    typeAccount: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: '',
    livingArea: '',
  }
  // const [typeAccount, setTypeAccount] = useState('')
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [birthDate, setBirthDate] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  // const [profilePicture, setProfilePicture] = useState('')
  // const [livingArea, setLivingArea] = useState('')
  const [registerData, setRegisterData] = useState(initialRegister)
  const { showLearnerForm, setShowLearnerForm } = useContext(showLearnerFormContext)
  const { showAlertMessage, setShowAlertMessage, messageText, setMessageText } = useContext(AlertMessageContext)
  const { showRegisterForm, setShowRegisterForm } = useContext(ModalContext)
  const [error, setError] = useState({})

  useEffect(() => {
    // setTypeAccount('')
    // setFirstName('')
    // setLastName('')
    // setBirthDate('')
    // setEmail('')
    // setPassword('')
    // setConfirmPassword('')
    // setProfilePicture('')
    // setLivingArea('')
    setRegisterData(initialRegister)

  }, [showRegisterForm])

  const handleClose = () => setShowRegisterForm(false);
  const handleShow = () => setShowRegisterForm(true);


  const handleProfilePicture = e => {
    e.preventDefault();
    // setProfilePicture(e.target.files[0])
    setRegisterData(cur => ({ ...cur, [e.target.name]: e.target.files[0] }))
  }





  const handleRegister = async e => {
    e.preventDefault();
    if (!registerData.firstName) setError(cur => ({ ...cur, 'firstName': 'First name is required.' }))
    if (!registerData.lastName) setError(cur => ({ ...cur, 'lastName': 'Last name is required.' }))
    if (!registerData.birthDate) setError(cur => ({ ...cur, 'birthDate': 'Birthdate is required.' }))
    if (!registerData.email) setError(cur => ({ ...cur, 'email': 'Email is required.' }))
    if (!registerData.password) setError(cur => ({ ...cur, 'password': 'Password is required.' }))
    if (!registerData.confirmPassword) setError(cur => ({ ...cur, 'confirmPassword': 'Confirm Password is required.' }))
    if (!registerData.livingArea) setError(cur => ({ ...cur, 'livingArea': 'Living Area  is required.' }))


    if (Object.keys(error).length) return;

    setShowRegisterForm(false)
    const formData = new FormData();
    registerData.typeAccount && formData.append('typeAccount', registerData.typeAccount) //null is changed to 'null', so it has to be checked beforehand
    registerData.firstName && formData.append('firstName', registerData.firstName)
    registerData.lastName && formData.append('lastName', registerData.lastName)
    registerData.birthDate && formData.append('birthDate', registerData.birthDate)
    registerData.email && formData.append('email', registerData.email)
    registerData.password && formData.append('password', registerData.password)
    registerData.confirmPassword && formData.append('confirmPassword', registerData.confirmPassword)
    registerData.profilePicture && formData.append('profilePicture', registerData.profilePicture) //picture
    registerData.livingArea && formData.append('livingArea', registerData.livingArea)

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



  const handleChangeOnchange = e => {
    //*validation
    if (!e.target.value) {
      if (e.target.name === 'firstName') setError(cur => ({ ...cur, [e.target.name]: 'First name is required.' }))
      if (e.target.name === 'lastName') setError(cur => ({ ...cur, [e.target.name]: 'Last name is required.' }))
      if (e.target.name === 'birthDate') setError(cur => ({ ...cur, [e.target.name]: 'Birthdate is required.' }))
      if (e.target.name === 'email') setError(cur => ({ ...cur, [e.target.name]: 'Email is required.' }))
      if (e.target.name === 'password') setError(cur => ({ ...cur, [e.target.name]: 'Password is required.' }))
      if (e.target.name === 'confirmPassword') setError(cur => ({ ...cur, [e.target.name]: 'Confirm Password is required.' }))
      if (e.target.name === 'livingArea') setError(cur => ({ ...cur, [e.target.name]: 'Living Area  is required.' }))
    }
    // if (e.target.value) setError(cur => ({ ...cur, [e.target.name]: "" }))
    if (e.target.value) {
      setError(cur => {
        const newError = { ...cur }
        delete newError[e.target.name];
        return newError;
      })
    }
    if (e.target.name === "confirmPassword" && registerData.password !== e.target.value) setError(cur => ({ ...cur, [e.target.name]: 'Password is not match.' }))

    setRegisterData(cur => ({ ...cur, [e.target.name]: e.target.value }))
  }
  return (
    <>

      <Modal show={showRegisterForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CREATE YOUR ACCOUNT</Modal.Title>       </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <button name='typeAccount' className={`btn btn-${registerData.typeAccount === 'teacher' ? 'success' : 'secondary'} me-3`} onClick={e => setRegisterData(cur => ({ ...cur, [e.target.name]: 'teacher' }))} > Teacher</button>
            <button name='typeAccount' className={`btn btn-${registerData.typeAccount === 'learner' ? 'success' : 'secondary'} me-3`} onClick={e => setRegisterData(cur => ({ ...cur, [e.target.name]: 'learner' }))} > Learner</button>
          </div>
          <form onSubmit={handleRegister}>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>First Name</label>
              <input name='firstName' type="text" className={`form-control ${error?.firstName ? 'is-invalid' : ''}`} value={registerData.firstName} onChange={handleChangeOnchange} />
              {error.firstName && <div className='invalid-feedback'>{error?.firstName}</div>}
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Last Name</label>
              <input name='lastName' type="text" className={`form-control ${error?.lastName ? 'is-invalid' : ''}`} value={registerData.lastName} onChange={handleChangeOnchange} />
              {error.lastName && <div className='invalid-feedback'>{error?.lastName}</div>}
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Birth Date</label>
              <input name='birthDate' type="date" className={`form-control ${error?.birthDate ? 'is-invalid' : ''}`} value={registerData.birthDate} onChange={handleChangeOnchange} />
              {error.birthDate && <div className='invalid-feedback'>{error?.birthDate}</div>}
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Email</label>
              <input name='email' type="text" className={`form-control ${error?.email ? 'is-invalid' : ''}`} value={registerData.email} onChange={handleChangeOnchange} />
              {error.email && <div className='invalid-feedback'>{error?.email}</div>}
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Password</label>
              <input name='password' type="password" className={`form-control ${error?.password ? 'is-invalid' : ''}`} value={registerData.password} onChange={handleChangeOnchange} />
              {error.password && <div className='invalid-feedback'>{error?.password}</div>}
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Confirm Password</label>
              <input name='confirmPassword' type="password" className={`form-control ${error?.confirmPassword ? 'is-invalid' : ''}`} value={registerData.confirmPassword} onChange={handleChangeOnchange} />
              {error.confirmPassword && <div className='invalid-feedback'>{error?.confirmPassword}</div>}
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>ProfilePicture</label>
              <input name='profilePicture' type="file" className={`form-control`} onChange={handleProfilePicture} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Living Area</label>
              <input name='livingArea' type="text" className={`form-control ${error?.livingArea ? 'is-invalid' : ''}`} value={registerData.livingArea} onChange={handleChangeOnchange} />
              {error.livingArea && <div className='invalid-feedback'>{error?.livingArea}</div>}
            </div>
            <button type="submit" className="btn btn-primary float-end" data-bs-dismiss="modal">Register</button>
          </form>
        </Modal.Body>
      </Modal >
    </>
  );
}
export default RegisterForm
