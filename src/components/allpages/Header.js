import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import '../../css/header.css'
import UserDropDown from './UserDropDown';


function Header() {
  const { user } = useContext(AuthContext);

  return (

    <div className="indexHeader">

      <div className="left">
        <div className="hamburger" data-bs-toggle="modal" data-bs-target="#hamburger">
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
        </div>
        <div className="logo">
          <h1><Link to='/'>i<ins>Learn</ins></Link></h1>
        </div>
      </div>
      <div className="middle">
        <div className="home">
          <p><Link to='/'>Home</Link></p>
        </div>
        <div className="fTeacher">
          <p><Link to='/findTeacher'>Find Teacher</Link></p>
        </div>
        <div className="exGroup">
          <p><Link to='/exchangeGroup'>Exchange Group</Link></p>
        </div>
        <div className="InBoard">
          <p><Link to='/board'>Interesting Board</Link></p>
        </div>
      </div>
      <div className="right">
        <div className="social">
          <Link to='learnProfile'><i className="fab fa-facebook-square"></i></Link>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter-square"></i>
        </div>
        <div className="messengerss">
          <i className="far fa-comment-dots"></i>
          <p data-bs-toggle="modal" data-bs-target="#messengerBox">Messenger</p>
        </div>
        <div className="login">
          <i className="far fa-user-circle"></i>

          {
            user ?
              <p className="" data-bs-toggle="modal" data-bs-target="#userDropDown">{user.firstName}</p> :
              <p className="" data-bs-toggle="modal" data-bs-target="#loginForm">Log in / Sign up</p>
          }

        </div>
      </div>
    </div>

  )
}

export default Header
