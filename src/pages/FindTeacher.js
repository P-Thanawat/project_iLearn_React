import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development';
import Header from '../components/allpages/Header';

function FindTeacher(props) {
  useEffect(() => {
    console.log(`window.location.pathname`, window.location.pathname)

  }, [])
  return (
    <div>
      <Header />
      <h1>Find Teacher</h1>
      <button><Link to='/'>HOME</Link></button>
      <p><Link to='teacherProfile'>Teacher Profile1</Link></p>
      <p><Link to='teacherProfile'>Teacher Profile2</Link></p>
      <p><Link to='teacherProfile'>Teacher Profile3</Link></p>
    </div>
  )
}

export default FindTeacher
