import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { ModalContext } from '../../contexts/ModalContext';
import { showBookingContext } from '../../contexts/showBookingContext';


function LessonCard({ lessonOption, setShowChoosing }) {
  const { user } = useContext(AuthContext);
  const { showBooking, setShowBooking, lessonIdforBooking, setLessonIdforBooking } = useContext(showBookingContext)
  const { showLogin, setShowLogin } = useContext(ModalContext)


  const prices = [];
  for (let i = 0; i <= lessonOption.data.data.length - 1; i++) {
    prices.push(lessonOption.data.data[i].lessonPrice)
  }
  const leastLessonPrice = Math.min(...prices).toFixed(2)


  const handleShowBooking = () => {
    setShowChoosing(false)
    if (user) {
      setShowBooking(true)
      setLessonIdforBooking(lessonOption.data.data[0].lessonsId)
    }
    else {
      setShowLogin(true)
    }
  }
  return (
    <div>
      <div className="card text-black border-warning border-2 p-4 mb-4 ">
        <h6>{lessonOption && lessonOption.data.data[0].lesson.lessonName}</h6>
        <div className="row">
          <div className="col-8">{lessonOption && lessonOption.data.data[0].lesson.lessonDetail}</div>
          <div className="col-4 d-flex justify-content-center align-items-center">
            <button className='btn btn-danger' onClick={handleShowBooking}>{lessonOption && 'USD ' + leastLessonPrice + '+'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonCard
