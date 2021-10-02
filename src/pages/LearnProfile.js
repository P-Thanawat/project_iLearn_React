import axios from '../config/axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import Header from '../components/allpages/Header'
import { AuthContext } from '../contexts/AuthContext'
import '../css/learnerProfile.css'

function LearnProfile() {
  const userId = window.location.href.split('/')[window.location.href.split('/').length - 1]
  const [learnUser, setLearnUser] = useState('')
  useEffect(() => {
    const run = async () => {
      const { data: { data: learnerProfile } } = await axios.get(`/userAccount/${userId}`)
      console.log(`learnerProfile`, learnerProfile)
      setLearnUser(learnerProfile)
    }
    run();
  }, [])
  return (
    <div>
      <Header />
      <div className="leftLearnProfile">
        <div className="personalLearnProfile">
          <div className="topPersonalLearnProfile d-flex">
            <div className="topLeftPersonalLearnProfile">
              <img src={learnUser.profilePicture} alt="" />
            </div>
            <div className="topRightPersonalLearnProfile">
              <h3>{learnUser.firstName} {learnUser.lastName}</h3>
              <div className="d-flex">
                <p>0 post &nbsp;</p>
                <p>0 following &nbsp;</p>
                <p>0 follower &nbsp;</p>
              </div>
            </div>
          </div>
          <div className="bottomPersonalLearnProfile">
            <p>About Me</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LearnProfile
