import React from 'react'

function LessonCard({ lessonOption }) {
  const prices = [];
  for (let i = 0; i <= lessonOption.data.data.length - 1; i++) {
    prices.push(lessonOption.data.data[i].lessonPrice)
  }
  const leastLessonPrice = Math.min(...prices).toFixed(2)
  return (
    <div>
      <div className="card p-4 mb-2">
        <h6>{lessonOption && lessonOption.data.data[0].lesson.lessonName}</h6>
        <div className="row">
          <div className="col-8">{lessonOption && lessonOption.data.data[0].lesson.lessonDetail}</div>
          <div className="col-4 d-flex justify-content-center align-items-center">
            <button className='btn btn-danger'>{lessonOption && 'USD ' + leastLessonPrice + '+'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonCard
