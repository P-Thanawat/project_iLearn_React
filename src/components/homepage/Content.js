import React from 'react'
import { Link } from 'react-router-dom'

function Content() {

  return (
    <>
      <div className="heading">
        <div className="sentence">
          <p>LEARNING HAPPENS EVERYWHERE AND ALWAYS</p>
        </div>
        <div className="button">
          <Link to='/findTeacher' className='text-decoration-none'><button className="learn"><i className="far fa-play-circle"></i>Learn</button></Link>
          <button className="info" data-bs-toggle="modal" data-bs-target="#moreInfo"><i className="fas fa-info-circle"></i>More Info</button>
        </div>
      </div>
    </>
  )
}

export default Content
