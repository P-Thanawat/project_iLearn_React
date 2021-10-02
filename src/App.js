import './App.css';
import { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
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
import Header from './components/allpages/Header';
import UserDropDown from './components/allpages/UserDropDown';
import RegisterForm from './components/homepage/RegisterForm';
import LoginForm from './components/homepage/LoginForm';
import MoreInfo from './components/homepage/MoreInfo';
import Hamburger from './components/homepage/Hamburger';
import MessengerBox from './components/homepage/MessengerBox';
import { showLearnerFormContext, ShowLearnerFormProvider } from './contexts/ShowLeanerFormContext';
import LearnerForm from './components/allpages/LearnerForm';
import axios from 'axios';


function App() {

  const { user } = useContext(AuthContext);
  const role = user ? 'user' : 'guest'
  const { showLearnerForm, setShowLearnerForm } = useContext(showLearnerFormContext)

  useEffect(() => {
    const run = async () => {
      try {
        console.log('here')
        if (user) {
          const { data: { data: teacherProfile } } = await axios.get(`/teacherProfile/byUserId/${user.id}`)
          const { data: { data: learnerProfile } } = await axios.get(`/learnerProfile/byUserId/${user.id}`)
          console.log(`learnerProfile`, learnerProfile)
          console.log(`teacherProfile`, teacherProfile)

          if (user.typeAccount === 'learner' && !learnerProfile) {
            console.log('showLearn')
            setShowLearnerForm(true)
          }
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

      {user && <UserDropDown />} {/* modal */}
      <RegisterForm /> {/* modal */}
      <LoginForm /> {/* modal */}
      <MoreInfo /> {/* modal */}
      <Hamburger /> {/* modal */}
      <MessengerBox /> {/* modal */}
      <LearnerForm /> {/* modal */}
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
