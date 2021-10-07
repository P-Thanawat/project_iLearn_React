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
    // <div>
    //   <Header />
    //   <div className="leftLearnProfile">
    //     <div className="personalLearnProfile">
    //       <div className="topPersonalLearnProfile d-flex">
    //         <div className="topLeftPersonalLearnProfile">
    //           <img src={learnUser.profilePicture} alt="" />
    //         </div>
    //         <div className="topRightPersonalLearnProfile">
    //           <h3>{learnUser.firstName} {learnUser.lastName}</h3>
    //           <div className="d-flex">
    //             <p>0 post &nbsp;</p>
    //             <p>0 following &nbsp;</p>
    //             <p>0 follower &nbsp;</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="bottomPersonalLearnProfile">
    //         <p>About Me</p>
    //       </div>
    //     </div>
    //   </div>

    // </div>
    <div>
      <div className="row">
        <div className="col-6">
          <div className="card"> {/*AboutMe*/}
            <div className="row">
              <div className="col-4">image</div>
              <div className="col-8">
                <h4>name</h4>
                <span>0 post 0 following 0 follower</span>
              </div>
            </div>
            <div className="card">
              <h6>About Me</h6>
              <span>personal information</span>
            </div>
          </div>
          <div className="card"> {/*skill*/}
            <span>tag skill 1</span>
            <span>tag skill 2</span>
            <span>tag skill 3</span>
          </div>
          <div className="card"> {/*skill*/}
            <div className="row">
              <div className="col-8">
                <span>completed date + time</span>
                <span>lesson time</span>
              </div>
              <div className="col-4">
                <span>img</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6"> {/*board*/}
          <div className="card">
            <div className="row">
              <div className="col-3">
                <span>img</span>
                <span>post name</span>
              </div>
              <div className="col-9">
                <span>text content</span>
                <span>picture content</span>
                <div>
                  <span>like</span>
                  <span>like amount</span>
                  <span>comment</span>
                  <span>send button</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnProfile
