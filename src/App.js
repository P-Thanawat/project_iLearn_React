import './App.css';
import { useContext, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext';

import AddCard from './pages/AddCard';
import Board from './pages/Board';
import BookLesson from './pages/BookLesson';
import Exchange from './pages/ExchangeGroup';
import FindFriend from './pages/FindFriend';
import FindTeacher from './pages/FindTeacher';
import Home from './pages/HomePage';
import LearnProfile from './pages/LearnProfile';
import Messenger from './pages/Messager';
import Payment from './pages/Payment';
import TeacherProfile from './pages/TeacherProfile';
import UserDropDown from './components/allpages/UserDropDown';
import RegisterForm from './components/allpages/RegisterForm';
import LoginForm from './components/allpages/LoginForm';
import MoreInfo from './components/homepage/MoreInfo';
import Hamburger from './components/homepage/Hamburger';
import MessengerBox from './components/homepage/MessengerBox';
import { showLearnerFormContext } from './contexts/ShowLeanerFormContext';
import LearnerForm from './components/allpages/LearnerForm';
import axios from './config/axios';
import { TeacherFormContext } from './contexts/showTeacherFormContext';
import TeacherForm from './components/allpages/TeacherForm';
import AlertMessage from './components/allpages/AlertMessage';
import LessonForm from './components/allpages/LessonForm';
import { ShowLessonFormContext } from './contexts/showLessonFormContext';
import BookingLesson from './components/teacherProfile/BookingLesson';
import AvailableCalendar from './components/allpages/AvailableCalendar';
import ReviewForm from './components/allpages/ReviewForm';
import { ModalContext } from './contexts/ModalContext';


function App() {

  const { user } = useContext(AuthContext);
  const role = user ? 'user' : 'guest'
  const { showLearnerForm, setShowLearnerForm } = useContext(showLearnerFormContext)
  const { showTeacherForm, setShowTeacherForm } = useContext(TeacherFormContext)
  const { showLessonForm, setShowLessonForm } = useContext(ShowLessonFormContext)
  const [teacherProfile, setTeacherProfile] = useState('')
  const { showReviewForm, setShowReviewForm } = useContext(ModalContext)
  const [lessonsRecord, setLessonsRecord] = useState({})


  useEffect(() => {
    const run = async () => {
      try {
        if (user) {
          console.log(`user`, user)
          const { data: { data: teacherProfile } } = await axios.get(`/teacherProfile/byUserId/${user.id}`)
          const { data: { data: learnerProfile } } = await axios.get(`/learnerProfile/byUserId/${user.id}`)
          const { data: { data: lessons } } = await axios.get(`/lessons/${teacherProfile?.id}`)
          console.log(`learnerProfile`, learnerProfile)
          console.log(`teacherProfile`, teacherProfile)
          setTeacherProfile(teacherProfile)
          // console.log(`lessons`, lessons)

          if (user.typeAccount === 'learner' && !learnerProfile) { //learner log in and don't have learnerProfile
            console.log('showLearn')
            setShowLearnerForm(true)
          }
          if (user.typeAccount === 'teacher' && !teacherProfile) { //teacher log in and don't have teacherProfile
            console.log('showTeacher')
            setShowTeacherForm(true)
          }
          if (user.typeAccount === 'teacher' && teacherProfile && lessons.length === 0) { //no lessons
            console.log('showLessonForm')
            setShowLessonForm(true)
          }
        }

        //* check review after finishing class
        if (user) {
          const { data: { data: lessonsRecordData } } = await axios.get('/lessonsRecord') //get data each user following by token
          // console.log(`lessonsRecordData`, lessonsRecordData)
          lessonsRecordData.forEach(item => {
            if ((item.endLearnTime < new Date().toISOString()) && item.completed === false) {
              setLessonsRecord(item)
              setShowReviewForm(true)

            }
          })

        }


      }
      catch (err) {
        console.log(err.message)
      }
    }
    run();
  }, [])
  return (

    <div className="App">

      {user && <UserDropDown teacherProfile={teacherProfile} />} {/* modal */}
      <RegisterForm /> {/* modal */}
      <LoginForm /> {/* modal */}
      <MoreInfo /> {/* modal */}
      <Hamburger /> {/* modal */}
      <MessengerBox /> {/* modal */}
      <LearnerForm /> {/* modal */}
      <TeacherForm /> {/* modal */}
      <AlertMessage /> {/* modal */}
      <LessonForm /> {/* modal */}
      <BookingLesson /> {/* modal */}
      <AvailableCalendar teacherProfile={teacherProfile} /> {/* modal */}
      <ReviewForm lessonsRecord={lessonsRecord} /> {/* modal */}

      <Switch>
        <Route path='/findTeacher' component={FindTeacher} />
        <Route path='/exchangeGroup' component={Exchange} />
        <Route path='/board' component={Board} />
        <Route path='/teacherProfile' component={TeacherProfile} />
        <Route path='/learnProfile' component={LearnProfile} />
        <Route path='/bookLesson' component={BookLesson} />
        <Route path='/messenger' component={Messenger} />
        <Route path='/payment' component={Payment} />
        <Route path='/addCard' component={AddCard} />
        <Route path='/findFriend' component={FindFriend} />
        <Route path='/' exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>

  );
}

export default App;
