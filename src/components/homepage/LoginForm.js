import React, { useContext, useEffect, useState } from 'react'
// import { useHistory } from 'react-router'
import axios from '../../config/axios'
import { AuthContext } from '../../contexts/AuthContext'
import { setToken } from '../../services/localStorage'
import jwtDecode from "jwt-decode";

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [buttonText, setButtonText] = useState('Next')
  const [hidePassword, setHidePassword] = useState(true)
  const [remember, setRemember] = useState(false)

  const { setUser } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  // const history = useHistory()

  const handleClickNext = async () => {
    const { data: { data: checkEmail } } = await axios.post('/checkEmail', { email })
    if (checkEmail) {
      setButtonText('Log in')
      setHidePassword(false)
    }
    if (hidePassword === false) {
      alert('sent')
      const result = await axios.post('/login', { email, password, remember })
      console.log(`result`, result)
      setToken(result.data.token)
      setUser(jwtDecode(result.data.token))
      window.location.reload()
    }
  }
  return (
    <div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="loginForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Welcome Back!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Email address</p>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
              <input type="text" value={password} onChange={e => setPassword(e.target.value)} hidden={hidePassword} />
              <button onClick={handleClickNext}>{buttonText}</button>
              <br />
              <div className='d-flex'>
                <input type="checkbox" onClick={() => setRemember(cur => !cur)} />
                <p>Remember me</p>
              </div>
              <p>Or sign in using</p>
              <div className="d-flex">
                <p>google</p>&nbsp;
                <p>facebook</p>&nbsp;
                <p>linkedin</p>
              </div>

            </div>
            <div className="modal-footer">
              <p data-bs-toggle="modal" data-bs-target="#registerForm">Or click here to create your free account.</p>
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
