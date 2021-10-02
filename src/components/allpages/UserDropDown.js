import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { removeToken } from '../../services/localStorage';

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
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{user.studentPoint}</p>
              <p>{user.firstName} {user.lastName}</p>
              <p>{user.email}</p>
              <p className='btn btn-success' data-bs-dismiss="modal"><Link to={`/learnProfile/${user.id}`}>My Profile</Link></p>
              <p className='btn btn-success'>Account Setting</p>
              <p className='btn btn-success' onClick={handleLogout}>Log out</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default UserDropDown
