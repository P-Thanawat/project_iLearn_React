import axios from '../config/axios'
import React, { useEffect, useState } from 'react'
import '../css/teacherProfile.css'
import Header from '../components/allpages/Header'
import LessonCard from '../components/teacherProfile/LessonCard'
import ReviewCard from '../components/teacherProfile/ReviewCard'

function TeacherProfile() {
  const [teacher, setTeacher] = useState({})
  const [userAccount, setUserAccount] = useState({})
  const [language, setLanguage] = useState([])
  const [specialist, setSpecialist] = useState([])
  const [lessons, setLessons] = useState([])
  const [lessonOption, setLessonOption] = useState([])
  useEffect(() => {
    const run = async () => {
      const teacherProfileId = window.location.href.split('/')[window.location.href.split('/').length - 1]
      const { data: { data: teacher } } = await axios.get(`/teacherProfile/${teacherProfileId}`)//? get teacherProfile from teacherProfileId
      const { data: { data: userAccount } } = await axios.get(`/userAccount/${teacher.userAccountId}`)
      const { data: { data: specialist } } = await axios.get(`/teacherSubject/${teacherProfileId}`)
      const { data: { data: language } } = await axios.get(`/languageSpeak/${userAccount.id}`)
      const { data: { data: lessons } } = await axios.get(`/lessons/${teacherProfileId}`)
      const lessonOption = [];
      for (let i = 0; i <= lessons.length - 1; i++) {
        console.log('forloop', i)
        const result = await axios.get(`/lessonOption/${lessons[i].id}`)
        lessonOption.push(result);
      }
      console.log(`teacher`, teacher)
      console.log(`userAccount`, userAccount)
      console.log(`language`, language)
      console.log(`specialist`, specialist)
      console.log(`lessons`, lessons)
      console.log(`lessonOption`, lessonOption)
      setTeacher(teacher)
      setUserAccount(userAccount)
      setLanguage(language)
      setSpecialist(specialist)
      setLessons(lessons)
      setLessonOption(lessonOption)
    }
    run();

  }, [])


  return (
    <div>
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
              <h5>Lessons</h5>
              {lessonOption.map((item, index) => (<LessonCard key={index} lessonOption={item} />))}
            </div>
            <div className="card p-4"> {/* static */}

            </div>
            <div className="card p-4"> {/* Reviews */}
              <ReviewCard />
            </div>
          </div>
          <div className="col-4 bg-warning">col-4</div>
        </div>
      </div>
    </div>
  )
}

export default TeacherProfile
