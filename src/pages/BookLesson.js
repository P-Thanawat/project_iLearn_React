import React from 'react'
import { Link } from 'react-router-dom'

function BookLesson() {
  return (
    <div>
      <h1>Book Lesson</h1>
      <p><Link to='payment'>Payment</Link></p>
      <button><Link to='/'>HOME</Link></button>
    </div>
  )
}

export default BookLesson
