import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { removeToken } from '../../services/localStorage';
import '../../css/userDropDown.css'
import { ShowLessonFormContext } from '../../contexts/showLessonFormContext';
import { TeacherFormContext } from '../../contexts/showTeacherFormContext';
import { ModalContext } from '../../contexts/ModalContext';



function UserDropDown({ teacherProfile }) {
  const { user } = useContext(AuthContext);
  const { showLessonForm, setShowLessonForm } = useContext(ShowLessonFormContext)
  const { showTeacherForm, setShowTeacherForm } = useContext(TeacherFormContext)
  const { showAvailableChoose, setShowAvailableChoose } = useContext(ModalContext)
  console.log(`user`, user)
  console.log(`teacherProfile`, teacherProfile)
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
              <div className="d-flex justify-content-center align-items-center mb-4 ms-5 mt-3">
                <div className="d-flex justify-content-center align-items-center">
                  <img src={user.profilePicture} alt="profilePicture" className='profilePicture' />
                  <div className='d-flex flex-column '>
                    <p className='badge bg-warning text-black text-wrap m-0 p-1'>{user.studentPoint} XP</p>
                    <p className='badge bg-secondary text-light text-wrap m-0 p-1'>{user.typeAccount}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <p className='text-primary m-0'>{user.firstName} {user.lastName}</p>
              </div>
              <div className="d-flex justify-content-center align-items-center mb-4">
                <p className='text-secondary m-0'>{user.email}</p>
              </div>
              {user.typeAccount === 'learner' && <Link to={`/learnProfile/${user.id}`}><p onClick={() => setTimeout(() => { window.location.reload() }, 1000)} className='btn btn-secondary form-control' data-bs-dismiss="modal">My Profile</p></Link>}
              {user.typeAccount === 'teacher' && <Link to={`/teacherProfile/${teacherProfile.id}`}><p onClick={() => setTimeout(() => { window.location.reload() }, 1000)} className='btn btn-secondary form-control' data-bs-dismiss="modal">My Profile</p></Link>}
              {(user.typeAccount === 'teacher' && !teacherProfile) && <p className='btn btn-secondary form-control text-light' data-bs-dismiss="modal" onClick={() => setShowTeacherForm(true)}>Add Teacher Profile</p>}
              {(user.typeAccount === 'teacher' && teacherProfile) && <p className='btn btn-secondary form-control text-light' data-bs-dismiss="modal" onClick={() => setShowLessonForm(true)}>Add Lesson</p>}
              <p className='btn btn-secondary form-control' onClick={() => setShowAvailableChoose(true)}>Account Setting</p>
              <p className='btn btn-danger form-control m-0' onClick={handleLogout}>Log out</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default UserDropDown
