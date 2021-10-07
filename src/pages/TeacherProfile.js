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

  useEffect(() => {
    const run = async () => {
      const teacherProfileId = window.location.href.split('/')[window.location.href.split('/').length - 1]
      const { data: { data: teacher } } = await axios.get(`/teacherProfile/${teacherProfileId}`)//? get teacherProfile from teacherProfileId
      const { data: { data: userAccount } } = await axios.get(`/userAccount/${teacher.userAccountId}`)
      const { data: { data: specialist } } = await axios.get(`/teacherSubject/${teacherProfileId}`)
      const { data: { data: language } } = await axios.get(`/languageSpeak/${userAccount.id}`)
      const { data: { data: lessons } } = await axios.get(`/lessons/${teacherProfileId}`)
      const { data: { data: lessonRecord } } = await axios.get(`/lessonsRecord/${teacherProfileId}`)

      const lessonOption = [];
      for (let i = 0; i <= lessons.length - 1; i++) {
        const result = await axios.get(`/lessonOption/${lessons[i].id}`)
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
    run();

  }, [])


  return (
    <div>

      <ChooseLesson showChoosing={showChoosing} setShowChoosing={setShowChoosing} lessonOption={lessonOption} setShowBooking={setShowBooking} /> {/*modal*/}

      <Header />
      <div className="container">
        <div className="row">
          <div className="col-8 bg-secondary">
            <div className="card p-4"> {/*content*/}
              <img src={teacher.introduceContent} className='teacherIntro' alt="introduceContent" />
            </div>
            <div className="card p-4"> {/* personal */}
              <div className="row">
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <img src={userAccount.profilePicture} className='profilePicture' alt="profilePicture" />
                </div>
                <div className="col-8">
                  <h4>{userAccount.firstName} {userAccount.lastName}</h4>
                  <h6>{teacher.presentText}</h6>
                  <p>Living: {userAccount.livingArea}</p>
                  <p>Specialist: {specialist[0] && specialist[0].subject} {specialist[1] && specialist[1].subject} {specialist[2] && specialist[2].subject}</p>
                  <p>Speak: {language[0] && language[0].language} {language[1] && language[1].language} {language[2] && language[2].language}</p>
                </div>
              </div>
            </div>
            <div className="card p-4"> {/* about me */}
              <h5>ABOUT ME</h5>
              <p>{teacher.aboutTeacher}</p>
            </div>
            <div className="card p-4"> {/* lessons */}
              <h5 className='mb-4'>LESSONS</h5>
              {lessonOption.map((item, index) => (<LessonCard key={index} lessonOption={item} />))}
            </div>
            <div className="card p-4"> {/* static */}
              <h5>STATISTIC</h5>
              <StatisticChart percentComplete={percentComplete} />
            </div>
            <div className="card p-4"> {/* Reviews */}
              <div className="d-flex">
                <h5 className='me-3'>REVIEWS</h5>
                {avgPoint >= 1 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {avgPoint >= 2 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {avgPoint >= 3 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {avgPoint >= 4 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {avgPoint >= 5 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/616/616489.png" alt="" />}
                {avgPoint - Math.floor(avgPoint) > 0 && <img className='star' src="https://cdn-icons-png.flaticon.com/512/2107/2107737.png" alt="" />}
                <div className='ms-2 d-flex'>
                  <p className='text-success me-1 fw-bold'>{avgPoint.toFixed(2)}</p>
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
              <span>RECOMMENDED LESSONS</span>
              <h5>{teacher.recommendLesson}</h5>
              <button className='btn btn-danger mb-3 mt-2' onClick={() => setShowChoosing(true)}>BOOK NOW</button>
              <button className='btn btn-secondary'>CONTACT TEACHER</button>
            </div>
            <div className="card p-4 m-2 d-flex justify-content-center align-items-center"> {/*  available time */}
              {/* <table className='availableTable'>
                <tr>
                  <td>#####</td>
                  <td style={{ width: "10px" }}>Mon</td>
                  <td style={{ width: "10px" }}>Tue</td>
                  <td style={{ width: "10px" }}>Wed</td>
                  <td style={{ width: "10px" }}>Thu</td>
                  <td style={{ width: "10px" }}>Fri</td>
                  <td style={{ width: "10px" }}>Sat</td>
                  <td style={{ width: "10px" }}>Sun</td>
                </tr>
                <tr>
                  <td>00-04</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>04-08</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>08-12</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>12-16</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>16-20</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>20-24</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </table> */}
              <button className='btn btn-secondary mt-2 px-5'>CHECK AVAILABLE</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default TeacherProfile