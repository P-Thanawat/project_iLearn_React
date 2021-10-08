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
  const [learnUser, setLearnUser] = useState({})
  const [learnProfile, setLearnProfile] = useState({})
  const [profilePost, setProfilePost] = useState([])
  const [following, setFollowing] = useState([])
  const [follower, setFollower] = useState([])
  const [learnSkill, setLearnSkill] = useState([])
  const [finishedLessonRecord, setFinishedLessonRecord] = useState([])
  const { user } = useContext(AuthContext)


  useEffect(() => {
    const run = async () => {
      const { data: { data: learnUser } } = await axios.get(`/userAccount/${userId}`)
      const { data: { data: learnProfile } } = await axios.get(`/LearnerProfile/${userId}`)
      const { data: { data: profilePost } } = await axios.get(`/profilePost/${learnProfile?.id}`)
      const { data: { data: following } } = await axios.get(`/following/${learnProfile?.id}`)
      const { data: { data: follower } } = await axios.get(`/follower/${learnProfile?.id}`)
      const { data: { data: learnSkill } } = await axios.get(`/learnerSkill/${learnProfile?.id}`)
      const { data: { data: lessonsRecord } } = await axios.get(`/lessonsRecord/byUserAccountId/${userId}`)
      const { data: { data: postComment } } = await axios.get(`/postComment/${profilePost.id}`)

      const finishedLessonRecord = lessonsRecord.filter(item => item.completed === true)

      console.log(`learnUser`, learnUser)
      console.log(`learnProfile`, learnProfile)
      console.log(`profilePost`, profilePost)
      console.log(`following`, following)
      console.log(`follower`, follower)
      console.log(`learnSkill`, learnSkill)
      console.log(`lessonsRecord`, lessonsRecord)
      console.log(`finishedLessonRecord`, finishedLessonRecord)
      console.log(`postComment`, postComment)
      setLearnUser(learnUser)
      setLearnProfile(learnProfile)
      setProfilePost(profilePost)
      setFollowing(following)
      setFollower(follower)
      setLearnSkill(learnSkill)
      setFinishedLessonRecord(finishedLessonRecord)

    }
    run();
  }, [])


  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


  return (
    <div>
      <Header />
      <div className="row">
        <div className="col-6">
          <div className="card p-4 "> {/*AboutMe*/}
            <div className="mb-4 d-flex">
              <div className="">
                <img className='learnerProfilePicture' src={learnUser.profilePicture} alt="" />
              </div>
              <div className="">
                <h2>{learnUser.firstName} {learnUser.lastName}</h2>
                <div className='mt-4'>
                  <div className='badge bg-primary mx-2'>{profilePost.length} post</div> <div className='badge bg-success mx-2'>{following.length} following</div><div className='badge bg-warning text-black mx-2'>{follower.length} follower</div>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <h6>About Me</h6>
              <span>{learnProfile.learnerAboutMe}</span>
            </div>
          </div>
          <div className="card my-4 p-4"> {/*skill*/}
            <span>Skill {learnSkill.map(item => <div key={item.id} className='badge bg-warning text-dark mx-2'>{item.skill}</div>)}</span>

          </div>
          <div className="card"> {/*skill*/}
            {finishedLessonRecord.map(item => (
              <div key={item.id}>
                <div className="card">
                  <div className="row">
                    <div className="col-9">
                      <div className='card ms-2 my-2 p-4' >
                        <div className="row">
                          <div className='col-4'>
                            <div className='badge bg-success'>completed</div>
                            <div className='card mt-3'>
                              <div className="badge bg-warning text-black">{item.endLearnTime.split('-')[0]}</div>
                              <div className="d-flex justify-content-center">
                                <span className='py-2 fw-bold'>{month[item.endLearnTime.split('-')[1]]} {item.endLearnTime.split('-')[2].slice(0, 2)}</span>
                              </div>
                            </div>
                            <div className='d-flex justify-content-center mt-2'>
                              <div className='badge bg-primary'>{(new Date(item.endLearnTime) - new Date(item.startLearnTime)) / 1000 / 60} Minutes</div>
                            </div>
                          </div>
                          <div className="col-8">
                            <p>LESSON: {item.lesson.lessonName}</p>
                            <p>LESSON: {item.lesson.lessonDetail}</p>
                            <button className='btn btn-danger btn-sm float-end'>BOOK ANOTHERS</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 card d-flex justify-content-center align-items-center">
                      <img className='completedLessonLearnerProfilePicture' src={item.lesson.teacherProfile.userAccount.profilePicture} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-6 border"> {/*board*/}
          {user && <div className="card p-4"> {/*post tool*/}
            <div className="d-flex ">
              <img className='postToolUserPostPicture' src={user.profilePicture} alt="" />
              <div className='d-flex flex-column mx-2 w-75'>
                <textarea className='mb-2' type="text" rows="4" cols="50" placeholder={`What's on your mind, ${user.firstName}`} />
                <div className="mb-3">
                  <label className="postLearnProfileFileInput">
                    <input type="file" />
                    PHOTO
                  </label>
                </div>
              </div>
            </div>
          </div>}
          {profilePost.map(item => (
            <div className="card p-4" key={item.id}> {/*post*/}
              <div className="card"> {/*user post*/}
                <div className="d-flex justify-content-start align-items-center">
                  <img className='postUserProfilePicture' src={item.postUser.profilePicture} alt="" />
                  <div className='d-flex flex-column'>
                    <span className='mx-2 fw-bold'>{item.postUser.firstName} {item.postUser.lastName}</span>
                    <span className='mx-2'>{new Date(item.updatedAt).toUTCString().slice(0, 22)}</span>
                  </div>
                </div>
              </div>
              <div className="card my-2"> {/*content post*/}
                <span>{item.postContent}</span>
                {item.postUser.profilePicture && <img className='postContentPicture' src={item.postUser.profilePicture} alt="" />}
              </div>
              <div className="d-flex align-items-center"> {/*like post*/}
                {/* <button className='btn btn-danger'>LIKE</button> */}
                <img style={{ width: '30px' }} src="https://cdn-icons-png.flaticon.com/512/2107/2107845.png" alt="" />
                <img style={{ width: '30px' }} src="https://cdn-icons-png.flaticon.com/512/2107/2107952.png" alt="" />
                <span className='mx-2 fw-bold'>{item.postLike}</span>
              </div>
              <div className="card"> {/*comment post*/}

              </div>
            </div>
          ))
          }
        </div>
      </div >
    </div >
  )
}

export default LearnProfile
