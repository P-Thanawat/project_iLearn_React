import './App.css';
import { useContext, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import AddCard from './pages/AddCard';
import Board from './pages/Board';
import BookLesson from './pages/BookLesson';
import Exchange from './pages/ExchangeGroup';
import FindFriend from './pages/FindFriend';
import FindTeacher from './pages/FindTeacher';
import Home from './pages/HomePage';
import LearnProfile from './pages/LearnProfile';
import Messenger from './pages/Messager';
import PaymentLesson from './components/teacherProfile/PaymentLesson';
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
import TeacherForm from './components/allpages/TeacherForm';
import AlertMessage from './components/allpages/AlertMessage';
import LessonForm from './components/allpages/LessonForm';
import AvailableCalendar from './components/allpages/AvailableCalendar';
import ReviewForm from './components/allpages/ReviewForm';
import { ModalContext } from './contexts/ModalContext';
import TopupCredit from './components/allpages/TopupCredit';
import AddCreditCard from './components/allpages/AddCreditCard';
import AlertConfirm from './components/allpages/AlertConfirm';
import { AlertMessageContext } from './contexts/AlertMessageContext';


function App() {
  const { user } = useContext(AuthContext);
  const role = user ? 'user' : 'guest'
  const { setShowLearnerForm } = useContext(showLearnerFormContext)
  const [teacherProfile, setTeacherProfile] = useState('')
  const { setShowReviewForm, setShowTeacherForm, setShowLessonForm } = useContext(ModalContext)
  const [lessonsRecord, setLessonsRecord] = useState({})
  const [numberOfMessage, setNumberOfMessage] = useState(0)
  const [learnerProfile, setLearnerProfile] = useState('')
  const { setShowAlertMessage, setMessageText } = useContext(AlertMessageContext)
  const [userAccount, setUserAccount] = useState('')


  useEffect(() => {
    const run = async () => {
      try {
        if (user) {
          const { data: { data: teacherProfile } } = await axios.get(`/teacherProfile/byUserId/${user.id}`)
          const { data: { data: learnerProfile } } = await axios.get(`/learnerProfile/byUserId/${user.id}`)
          const { data: { data: lessons } } = await axios.get(`/lessons/${teacherProfile?.id}`)
          const { data: { data: userAccount } } = await axios.get(`/userAccount/${user?.id}`)
          setTeacherProfile(teacherProfile)
          setLearnerProfile(learnerProfile)
          setUserAccount(userAccount)

          if (user.typeAccount === 'learner' && !learnerProfile) { //learner log in and don't have learnerProfile
            setShowLearnerForm(true)
          }
          if (user.typeAccount === 'teacher' && !teacherProfile) { //teacher log in and don't have teacherProfile
            setShowTeacherForm(true)
          }
          if (user.typeAccount === 'teacher' && teacherProfile && lessons.length === 0) { //no lessons
            setShowLessonForm(true)
          }
        }

        //* check review after finishing class
        if (user) {
          const { data: { data: lessonsRecordData } } = await axios.get('/lessonsRecord') //get data each user following by token
          lessonsRecordData.forEach(item => {
            if ((item.endLearnTime < new Date().toISOString()) && item.completed === false) {
              setLessonsRecord(item)
              setShowReviewForm(true)
            }
          })
        }


      }
      catch (err) {
        console.log(err.message);
      }
    }
    run();
  }, [])

  useEffect(() => {
    const run = async () => {
      try {
        if (user) {
          const { data: { data: userAccount } } = await axios.get(`/userAccount/${user?.id}`)
          const { data: { data: messageData } } = await axios.get(`/userMessenger/${user?.id}`)
          const receivMessage = messageData.filter(item => item.messageFrom !== user.id)
          if (+userAccount.readMessage !== receivMessage.length) {
            setMessageText('NEW MESSAGE!')
            setShowAlertMessage(true);
            setTimeout(() => {
              setShowAlertMessage(false);
            }, 3000);
          }
          await axios.put(`/userAccount/readMessage/`, { readMessage: receivMessage.length })
        }
      }

      catch (err) {
        console.log(err.message);
      }
    }
    run();
  })
  return (

    <div className="App">

      {user && <UserDropDown teacherProfile={teacherProfile} learnerProfile={learnerProfile} userAccount={userAccount} />}
      <RegisterForm />
      <LoginForm />
      <MoreInfo />
      <Hamburger />
      <MessengerBox />
      <LearnerForm />
      <TeacherForm />
      <AlertMessage />
      <LessonForm />
      <AvailableCalendar teacherProfile={teacherProfile} />
      <ReviewForm lessonsRecord={lessonsRecord} />
      <PaymentLesson />
      <TopupCredit />
      <AddCreditCard />
      <AlertConfirm />

      <Switch>
        <Route path='/findTeacher' component={FindTeacher} />
        <Route path='/exchangeGroup' component={Exchange} />
        <Route path='/board' component={Board} />
        <Route path='/teacherProfile' component={TeacherProfile} />
        <Route path='/learnProfile' component={LearnProfile} />
        <Route path='/bookLesson' component={BookLesson} />
        <Route path='/messenger' component={Messenger} />
        <Route path='/addCard' component={AddCard} />
        <Route path='/findFriend' component={FindFriend} />
        <Route path='/' exact component={Home} />
        <Redirect to="/" />
      </Switch>

    </div>

  );
}

export default App;
