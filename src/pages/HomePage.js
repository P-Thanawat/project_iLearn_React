import React, { useContext } from 'react'
import Advice from '../components/homepage/Advice';
import Header from '../components/allpages/Header';
import Content from '../components/homepage/Content';
import LoginForm from '../components/homepage/LoginForm';
import MoreInfo from '../components/homepage/MoreInfo';
import Hamburger from '../components/homepage/Hamburger';
import MessengerBox from '../components/homepage/MessengerBox';
import '../css/homepage.css'
import RegisterForm from '../components/homepage/RegisterForm';
import { AuthContext } from '../contexts/AuthContext';

function Home(props) {

  return (
    <div>
      <div className="containerss">
        <Header />
        <Content />
      </div>
      <Advice />
    </div>
  )
}

export default Home
