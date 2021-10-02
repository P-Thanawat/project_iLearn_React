import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import { showLearnerFormContext } from '../../contexts/ShowLeanerFormContext'

function RegisterForm() {
  const [typeAccount, setTypeAccount] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [livingAra, setLivingAra] = useState('')
  const { showLearnerForm, setShowLearnerForm } = useContext(showLearnerFormContext)


  const handleProfilePicture = e => {
    e.preventDefault();
    setProfilePicture(e.target.files[0])
  }

  const handleRegister = async e => {
    e.preventDefault();
    alert('sent')
    const formData = new FormData();
    typeAccount && formData.append('typeAccount', typeAccount)
    firstName && formData.append('firstName', firstName)
    lastName && formData.append('lastName', lastName)
    birthDate && formData.append('birthDate', birthDate)
    email && formData.append('email', email)
    password && formData.append('password', password)
    confirmPassword && formData.append('confirmPassword', confirmPassword)
    profilePicture && formData.append('profilePicture', profilePicture)
    livingAra && formData.append('livingAra', livingAra)

    await axios.post('/register', formData)
      .then(res => {
        console.log(`res`, res)
        if (typeAccount === 'learner') setShowLearnerForm(true)
        // if(typeAccount === 'teacher')setShowLearnerForm(true)

      })
      .catch(err => {
        console.log(err)
      })

  }
  return (
    <div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="registerForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="btn btn-success" onClick={() => setTypeAccount('teacher')}>teacher</div>
              <div className="btn btn-success" onClick={() => setTypeAccount('learner')}>Learner</div>
              <form onSubmit={handleRegister}>
                <label htmlFor="">first Name</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <label htmlFor="">last Name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                <label htmlFor="">birth Date</label>
                <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
                <label htmlFor="">Email</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <label htmlFor="">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <label htmlFor="">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <label htmlFor="">profilePicture</label>
                <input type="file" onChange={handleProfilePicture} />
                <label htmlFor="">living Area</label>
                <input type="text" value={livingAra} onChange={e => setLivingAra(e.target.value)} />
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Register</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
