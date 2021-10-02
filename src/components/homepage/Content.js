import React from 'react'

function Content() {

  return (
    <>
      <div className="heading">
        <div className="sentence">
          <p>LEARNING HAPPENS EVERYWHERE AND ALWAYS</p>
        </div>
        <div className="button">
          <button className="learn"><i className="far fa-play-circle"></i>Learn</button>
          <button className="info" data-bs-toggle="modal" data-bs-target="#moreInfo"><i className="fas fa-info-circle"></i>More Info</button>
        </div>
      </div>
    </>
  )
}

export default Content
