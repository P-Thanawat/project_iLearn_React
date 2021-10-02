import React from 'react'
import { Link } from 'react-router-dom'

function Exchange() {
  return (
    <div>
      <h1>Exchange Group</h1>
      <p><Link to='/findFriend'>Find Friend</Link></p>
      <button><Link to='/'>HOME</Link></button>
    </div>
  )
}

export default Exchange
