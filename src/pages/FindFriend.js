import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/allpages/Header'

function FindFriend() {
  return (
    <div>
      <Header />
      <h1>Find Friend</h1>
      <button><Link to='/'>HOME</Link></button>
    </div>
  )
}

export default FindFriend
