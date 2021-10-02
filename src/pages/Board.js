import React from 'react'
import { Link } from 'react-router-dom'

function Board() {
  return (
    <div>
      <h1>Interesting Board</h1>
      <button><Link to='/'>HOME</Link></button>
    </div>
  )
}

export default Board
