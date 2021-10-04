import React, { useContext } from 'react'
import Advice from '../components/homepage/Advice';
import Header from '../components/allpages/Header';
import Content from '../components/homepage/Content';
import '../css/homepage.css'

function Home(props) {

  return (
    <div>
      <div className="containerss">
        <Header page='home' />
        <Content />
      </div>
      <Advice />
    </div>
  )
}

export default Home
