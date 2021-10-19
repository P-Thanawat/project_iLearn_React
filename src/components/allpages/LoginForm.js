import React, { useContext, useEffect, useState } from 'react'
import axios from '../../config/axios'
import { AuthContext } from '../../contexts/AuthContext'
import { setToken } from '../../services/localStorage'
import jwtDecode from "jwt-decode";
import { ModalContext } from '../../contexts/ModalContext';
import { Button, Modal } from 'react-bootstrap';
import { AlertMessageContext } from '../../contexts/AlertMessageContext';

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [buttonText, setButtonText] = useState('Next')
  const [hidePassword, setHidePassword] = useState(true)
  const [remember, setRemember] = useState(false)

  const { setUser } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  const { showLogin, setShowLogin, showRegisterForm, setShowRegisterForm } = useContext(ModalContext)
  const { showAlertMessage, setShowAlertMessage, messageText, setMessageText } = useContext(AlertMessageContext)
  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);

  const handleClickNext = async () => {
    try {
      const { data: { data: checkEmail } } = await axios.post('/checkEmail', { email })
      if (!checkEmail) {
        setMessageText('Email is not found')
        setShowAlertMessage(true)
        setTimeout(() => {
          setShowAlertMessage(false)
        }, 3000);
      }
      if (checkEmail) {
        setButtonText('Log in')
        setHidePassword(false)
      }
      if (hidePassword === false) {
        const result = await axios.post('/login', { email, password, remember })
        console.log(`result`, result)
        setToken(result.data.token)
        setUser(jwtDecode(result.data.token))
        window.location.reload()
      }
    }
    catch (err) {
      console.log(err.message);
    }
  }

  const handleClinkRegister = e => {
    e.preventDefault();
    setShowLogin(false)
    setShowRegisterForm(true)
  }



  return (
    <>

      <Modal show={showLogin} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome Back!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <label htmlFor="" className='input-group-text'>Email Address</label>
            <input type="text" className='form-control' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="input-group mb-3" hidden={hidePassword}>
            <label htmlFor="" className='input-group-text'>Password</label>
            <input type="password" className='form-control' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="d-grid gap-2">
            <button className='form btn btn-success' onClick={handleClickNext}>{buttonText}</button>
          </div>
          <br />
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input className="form-check-input" type="checkbox" onClick={() => setRemember(cur => !cur)} />
            </div>
            <div className="col-4">
              <span className="form-control">Remember me</span>
            </div>
          </div>
          <p>Or sign in using</p>
          <div className="d-flex">
            <span className='btn btn-danger'>google</span>&nbsp;
            <span className='btn btn-primary'>facebook</span>&nbsp;
            <span className='btn btn-warning'>linkedin</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-footer d-flex align-items-center">
            <span  >Or <a href="" className='link-primary' onClick={handleClinkRegister}>CLICK HERE</a> to create your free account.</span>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );

  return (
    <div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="loginForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Welcome Back!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <label htmlFor="" className='input-group-text'>Email Address</label>
                <input type="text" className='form-control' value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="input-group mb-3" hidden={hidePassword}>
                <label htmlFor="" className='input-group-text'>Password</label>
                <input type="password" className='form-control' value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="d-grid gap-2">
                <button className='form btn btn-success' onClick={handleClickNext}>{buttonText}</button>
              </div>
              <br />
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <input className="form-check-input" type="checkbox" onClick={() => setRemember(cur => !cur)} />
                </div>
                <div className="col-4">
                  <span className="form-control" onClick={test}>Remember me</span>
                </div>
              </div>
              <p>Or sign in using</p>
              <div className="d-flex">
                <span className='btn btn-danger'>google</span>&nbsp;
                <span className='btn btn-primary'>facebook</span>&nbsp;
                <span className='btn btn-warning'>linkedin</span>
              </div>

            </div>
            <div className="modal-footer d-flex align-items-center">
              <span  >Or <a href="" className='link-primary ' data-bs-toggle="modal" data-bs-target="#registerForm" >CLICK HERE</a> to create your free account.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
