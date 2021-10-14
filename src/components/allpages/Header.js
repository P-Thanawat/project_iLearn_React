import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { ModalContext } from '../../contexts/ModalContext';
import '../../css/header.css'


function Header({ page }) {
  const { user } = useContext(AuthContext);
  const { showLogin, setShowLogin, } = useContext(ModalContext)

  return (

    <div className={page === 'home' ? 'indexHeaderHome' : 'indexHeaderOther'}>

      <div className="left">

        <div className="dropdown">
          <div className="hamburger" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
            <div className="rectangle" ></div>
            <div className="rectangle" ></div>
            <div className="rectangle" ></div>
          </div>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><Link to='/findTeacher' className='text-decoration-none'><span className="dropdown-item">Find Lesson</span></Link></li>
            <li><a className="dropdown-item" href="#">Exchange Group</a></li>
            <li><a className="dropdown-item" href="#">Interesting Board</a></li>
          </ul>
        </div>
        <div className="logo">
          <Link to='/'><h1 className='btn text-warning fs-2'>i<ins>Learn</ins></h1></Link>
        </div>
      </div>
      <div className="middle">
        <div className="home">
          <Link to='/'><p className='btn text-light m-0'>Home</p></Link>
        </div>
        <div className="fTeacher">
          <Link to='/findTeacher'><p className='btn text-light m-0'>Find Lesson</p></Link>
        </div>
        <div className="exGroup">
          <Link to='/exchangeGroup'><p className='btn text-light m-0'>Exchange Group</p></Link>
        </div>
        <div className="InBoard d-flex justify-content-center align-items-center">
          <Link to='/board'><p className='btn text-light m-0'>Interesting Board</p></Link>
        </div>
      </div>
      <div className="right">
        <div className="social">
          <i className="fab fa-facebook-square"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter-square"></i>
        </div>
        <div className="messengerss">
          <i className="far fa-comment-dots"></i>
          {user ? <p className='btn text-light'><Link to='/messenger' className='text-decoration-none text-white'>Messenger</Link></p> :
            <p className='btn text-light'>Messenger</p>
          }

        </div>
        <div className="login">
          {user ?
            <img src={user.profilePicture} alt="" className='profilePicturess' /> :
            <i className="far fa-user-circle"></i>}

          {
            user ?
              <div className="btn text-light username me-1" data-bs-toggle="modal" data-bs-target="#userDropDown">{user.firstName}</div> :
              <p className="btn text-light" onClick={() => setShowLogin(true)}>Log in / Sign up</p>
          }

        </div>
      </div>
    </div>

  )
}

export default Header
