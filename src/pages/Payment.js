import React from 'react'
import { Link } from 'react-router-dom'

function Payment() {
  return (
    <div>
      <h1>Payment</h1>
      <p><Link to='/AddCard'>Add Card</Link></p>
      <button><Link to='/'>HOME</Link></button>
    </div>
  )
}

export default Payment
