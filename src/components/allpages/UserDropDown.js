import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { removeToken } from '../../services/localStorage';
import '../../css/userDropDown.css'

function UserDropDown() {
  const { user } = useContext(AuthContext);
  console.log(`user`, user)

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  }
  return (
    <div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="userDropDown" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex justify-content-center align-items-center">
                <img src={user.profilePicture} alt="profilePicture" className='profilePicture' />
                <p className='badge bg-primary text-wrap'>{user.studentPoint}</p>
              </div>

              <p>{user.firstName} {user.lastName}</p>
              <p>{user.email}</p>
              <p className='btn btn-success' data-bs-dismiss="modal"><Link to={`/learnProfile/${user.id}`}>My Profile</Link></p>
              <p className='btn btn-success'>Account Setting</p>
              <p className='btn btn-success' onClick={handleLogout}>Log out</p>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default UserDropDown
