import axios from '../config/axios'
import React, { useContext, useEffect, useState } from 'react'
import '../css/teacherProfile.css'
import Header from '../components/allpages/Header'
import LessonCard from '../components/teacherProfile/LessonCard'
import ReviewCard from '../components/teacherProfile/ReviewCard'
import StatisticChart from '../components/teacherProfile/StatisticChart'
import ChooseLesson from '../components/teacherProfile/ChooseLesson'
import BookingLesson from '../components/teacherProfile/BookingLesson'
import { SendDataFromTeacherContext } from '../contexts/SendDataFromTeacherContext'
import { ModalContext } from '../contexts/ModalContext'
import { AuthContext } from '../contexts/AuthContext'
import { AlertMessageContext } from '../contexts/AlertMessageContext'
import { useHistory } from "react-router-dom";
import { DataForMessengerContext } from '../contexts/DataForMessenger'

function TeacherProfile() {

  const [teacher, setTeacher] = useState({})
  const [userAccount, setUserAccount] = useState({})
  const [language, setLanguage] = useState([])
  const [specialist, setSpecialist] = useState([])
  // const [lessons, setLessons] = useState([])
  const { lessons, setLessons } = useContext(SendDataFromTeacherContext)
  const [lessonOption, setLessonOption] = useState([])
  const [reviews, setReviews] = useState([])
  const [avgPoint, setAvgPoint] = useState(0)
  const [lessonRecord, setLessonRecord] = useState([])
  const [percentComplete, setPercentComplete] = useState([])
  const [showChoosing, setShowChoosing] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [lessonIdForBooking, setLessonIdForBooking] = useState('')
  const { setShowLessonForm, setShowLogin } = useContext(ModalContext)
  const { user } = useContext(AuthContext)
  const { setMessageText, setShowAlertMessage } = useContext(AlertMessageContext)
  const history = useHistory()
  const { dataForMessenger, setDataForMessenger } = useContext(DataForMessengerContext)
  const [ableBooking, setableBooking] = useState(true)
  const [ableContact, setAbleContact] = useState(true)
  const [IsEditProfile, setIsEditProfile] = useState(false)

  useEffect(() => {
    window.scroll(0, 0)
    const run = async () => {
      try {
        const teacherProfileId = window.location.href.split('/')[window.location.href.split('/').length - 1]
        const { data: { data: teacher } } = await axios.get(`/teacherProfile/${teacherProfileId}`)//? get teacherProfile from teacherProfileId
        const { data: { data: userAccount } } = await axios.get(`/userAccount/${teacher?.userAccountId}`)
        const { data: { data: specialist } } = await axios.get(`/teacherSubject/${teacherProfileId}`)
        const { data: { data: language } } = await axios.get(`/languageSpeak/${userAccount.id}`)
        const { data: { data: lessons } } = await axios.get(`/lessons/${teacherProfileId}`)
        const { data: { data: lessonRecord } } = await axios.get(`/lessonsRecord/${teacherProfileId}`)

        //*fetch lessonOption
        const lessonOption = [];
        for (let i = 0; i <= lessons.length - 1; i++) {
          const result = await axios.get(`/lessonOption/${lessons?.[i]?.id}`)
          lessonOption.push(result);
        }

        const reviews = []
        for (let i = 0; i <= lessons.length - 1; i++) {
          const { data: { data: review } } = await axios.get(`/reviews/${lessons[i].id}`)
          reviews.push(...review)
        }
        reviews.sort((a, b) => {
          if (a.updatedAt > b.updatedAt) return -1;
        })

        let avgPoint = 0;
        for (let i = 0; i <= reviews.length - 1; i++) {
          avgPoint += +(reviews[i].reviewPoint)
        }
        avgPoint /= reviews.length;



        const month = new Date().getUTCMonth()
        console.log(`month`, month)
        const preMonth = lessonRecord.filter(item => +item.startLearnTime.split('-')[1] === month - 1)
        const thisMonth = lessonRecord.filter(item => +item.startLearnTime.split('-')[1] === month)
        const nextMonth = lessonRecord.filter(item => +item.startLearnTime.split('-')[1] === month + 1)

        const percentComplete = [];

        [preMonth, thisMonth, nextMonth].forEach(item => {
          const arrTemp = []
          let temp = 0;
          item.forEach((item) => {
            if (item.completed) temp++;
          })
          arrTemp.push(temp);
          temp = (temp / item.length) * 100;
          arrTemp.push(temp || 0)
          percentComplete.push(arrTemp)

        })

        console.log(`teacher`, teacher)
        console.log(`userAccount`, userAccount)
        console.log(`language`, language)
        console.log(`specialist`, specialist)
        console.log(`lessons`, lessons)
        console.log(`lessonOption`, lessonOption)
        console.log(`reviews`, reviews)
        console.log(`lessonRecord`, lessonRecord)
        console.log(`percentComplete`, percentComplete)
        setTeacher(teacher)
        setUserAccount(userAccount)
        setLanguage(language)
        setSpecialist(specialist)
        setLessons(lessons)
        setLessonOption(lessonOption)
        setReviews(reviews)
        setAvgPoint(avgPoint)
        setLessonRecord(lessonRecord)
        setPercentComplete(percentComplete)

      }
      catch (err) {
        console.log(err.message);
      }
    }
    run();

  }, [])

  const handleBookingLesson = () => {
    if (user?.typeAccount === 'learner') {
      setShowChoosing(true)

    }
    else if (!user) {
      setShowLogin(true)
    }
    else {
      setMessageText('Only learner can book the lesson')
      setShowAlertMessage(true)
      setTimeout(() => {
        setShowAlertMessage(false)
      }, 3000);
    }
  }

  const handleContactTeacher = async () => {
    try {
      if (user && user?.id !== userAccount?.id) {
        // console.log(`dataForMessenger`, dataForMessenger)
        setDataForMessenger({ message: `I'm interested in your lesson!`, messageFrom: user.id, messageTo: userAccount.id })
        // await axios.post('userMessenger', { message: `I'm interested in your lesson!`, messageFrom: user.id, messageTo: userAccount.id })
        history.push('/messenger')
      }
      else if (!user) setShowLogin(true)
      else {
        setMessageText(`You can't contact yourself.`)
        setShowAlertMessage(true)
        setTimeout(() => {
          setShowAlertMessage(false)
        }, 3000);
      }

    }
    catch (err) {
      console.log(err.message);
    }
  }

  console.log(`teacher`, teacher)
  const handleEditProfile = async () => {
    if (!IsEditProfile) {
      setIsEditProfile(true)
      setableBooking(teacher.ableBooking)
      setAbleContact(teacher.ableContact)

    }
    if (IsEditProfile) {
      setIsEditProfile(false)

      await axios.put(`/teacherProfile/${teacher?.id}`, { ableBooking, ableContact })
      setMessageText(`Update successful`)
      setShowAlertMessage(true)
      setTimeout(() => {
        setShowAlertMessage(false)
      }, 3000);
      window.location.reload()
    }


  }


  return (
    <div>
      <BookingLesson /> {/* modal */}
      <ChooseLesson teacher={teacher} userAccount={userAccount} showChoosing={showChoosing} setShowChoosing={setShowChoosing} lessonOption={lessonOption} setShowBooking={setShowBooking} /> {/*modal*/}

      <Header />
      <div className="container">
        <div className="row">
          <div className="col-8 bg-secondary">
            <div className="card p-4 my-2"> {/*content*/}
              <img src={teacher.introduceContent} className='teacherIntro' alt="introduceContent" />
            </div>
            <div className="card p-4 my-2"> {/* personal */}
              <div className="row">
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <img src={userAccount.profilePicture} className='profilePicture' alt="profilePicture" />
                </div>
                <div className="col-8">
                  <h4>{userAccount.firstName} {userAccount.lastName}</h4>
                  <h6>{teacher.presentText}</h6>
                  <p className='mt-4'>Living: {userAccount.livingArea}</p>
                  <p>Specialist: {specialist[0] && specialist[0].subject} {specialist[1] && specialist[1].subject} {specialist[2] && specialist[2].subject}</p>
                  <p>Speak: {language[0] && language[0].language} {language[1] && language[1].language} {language[2] && language[2].language}</p>
                </div>
              </div>
            </div>
            <div className="card p-4 my-2"> {/* about me */}
              <h5>ABOUT ME</h5>
              <p>{teacher.aboutTeacher}</p>
            </div>
            <div className="card p-4 my-2"> {/* lessons */}
              <h5 className='mb-4'>LESSONS</h5>
              {lessonOption.map((item, index) => (<LessonCard key={index} userAccount={userAccount} lessonOption={item} setShowChoosing={setShowChoosing} teacher={teacher} />))}
            </div>
            <div className="card p-4 my-2"> {/* static */}
              <h5>STATISTIC</h5>
              <StatisticChart percentComplete={percentComplete} />
            </div>
            <div className="card p-4 my-2"> {/* Reviews */}
              <div className="d-flex">
                <h5 className='me-3'>REVIEWS</h5>
                {avgPoint >= 1 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {avgPoint >= 2 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {avgPoint >= 3 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {avgPoint >= 4 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {avgPoint >= 5 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {avgPoint - Math.floor(avgPoint) > 0 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/2107/2107737.png" alt="" />}
                <div className='ms-2 d-flex'>
                  <p className='text-success me-1 fw-bold'>{avgPoint ? avgPoint.toFixed(2) : '0'}</p>
                  <p>({reviews.length})</p>
                </div>
              </div>
              {reviews.map(item => (
                <ReviewCard key={item.id} reviews={item} />
              ))}
            </div>
          </div>
          <div className="col-4 bg-warning">
            <div className="card p-4 m-2 mt-4"> {/* recommended lesson */}
              <span>RECOMMENDED LESSONS:</span>
              {/* <h5>{teacher.recommendLesson}</h5> */}
              <h5>{lessonOption?.[0]?.data?.data[0]?.lesson?.lessonName}</h5>
              <button className={`btn btn-${teacher.ableBooking ? 'danger' : 'secondary'} mb-3 mt-2`} onClick={teacher.ableBooking ? handleBookingLesson : null}>BOOK NOW</button>
              <button className={`btn btn-${teacher.ableContact ? 'success' : 'secondary'}`} onClick={teacher.ableContact ? handleContactTeacher : null}>CONTACT TEACHER</button>
            </div>
            <div className="card p-4 m-2 d-flex justify-content-center align-items-center"> {/*  available time */}
              <button className='btn btn-secondary mt-2 px-5'>CHECK AVAILABLE</button>
            </div>
            {teacher?.userAccountId === user?.id &&
              <div className="card p-4 m-2 d-flex justify-content-center align-items-center"> {/* edit profile */}
                <button onClick={handleEditProfile} className={`btn btn-${IsEditProfile ? 'warning' : 'secondary'} mt-2 px-5`}>{`${IsEditProfile ? 'UPDATE' : 'EDIT PROFILE'}`}</button>
                {IsEditProfile &&
                  <div className='mt-4'>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input type="checkbox" className="form-check-input" defaultChecked={teacher.ableBooking} onClick={e => setableBooking(cur => e.target.checked)} />
                      </div>
                      <label htmlFor="" className='input-group-text'>Able to Booking</label>
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input type="checkbox" className="form-check-input mt-0" defaultChecked={teacher.ableContact} onClick={e => setAbleContact(cur => e.target.checked)} />
                      </div>
                      <label htmlFor="" className='input-group-text'>Able to Contact</label>
                    </div>
                  </div>
                }
              </div>
            }

          </div>
        </div>
      </div>
    </div >
  )
}

export default TeacherProfile