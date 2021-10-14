import axios from 'axios';
import React, { useContext } from 'react'
import { AlertMessageContext } from '../../contexts/AlertMessageContext';
import { AuthContext } from '../../contexts/AuthContext';
import { ModalContext } from '../../contexts/ModalContext';
import { showBookingContext } from '../../contexts/showBookingContext';


function LessonCard({ lessonOption, setShowChoosing, userAccount }) {
  const { user } = useContext(AuthContext);
  const { setShowBooking, setLessonIdforBooking } = useContext(showBookingContext)
  const { setShowLogin, setShowLessonForm, setLessonData, setIsEditLesson } = useContext(ModalContext)
  const { setShowAlertMessage, setMessageText } = useContext(AlertMessageContext)


  const prices = [];
  for (let i = 0; i <= lessonOption.data.data.length - 1; i++) {
    prices.push(lessonOption.data.data[i].lessonPrice)
  }
  const leastLessonPrice = Math.min(...prices).toFixed(2)


  const handleShowBooking = () => { // show table
    setShowChoosing(false)
    if (user && user.typeAccount === 'learner') {
      setShowBooking(true)
      setLessonIdforBooking(lessonOption.data.data[0].lessonsId)
    }
    else if (!user) {
      setShowLogin(true)
    }
    else if (!(user.typeAccount === 'learner')) {
      setMessageText('Teacher cannot book lesson.')
      setShowAlertMessage(true)
      setTimeout(() => {
        setShowAlertMessage(false)
      }, 3000);
    }
  }
  const handleEditLesson = () => {
    setLessonData(lessonOption)
    setIsEditLesson(true)
    setShowLessonForm(true)

  }
  const handleDeleteLesson = async () => {
    const answer = window.confirm('Are you sure to delete this lesson!');
    if (answer) {
      await axios.delete(`/lessons/${lessonOption?.data?.data?.[0]?.lessonsId}`)
      window.location.reload()
    }
  }
  return (
    <div>
      <div className="card text-black border-warning border-2 p-4 mb-4 ">
        <h6>{lessonOption?.data?.data[0]?.lesson?.lessonName}</h6>
        <div className="row">
          <div className="col-8">{lessonOption?.data?.data[0]?.lesson?.lessonDetail}</div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            {user?.id === userAccount?.id && <button className='btn btn-warning mx-2' onClick={handleDeleteLesson}>X</button>}
            {user?.id === userAccount?.id && <button className='btn btn-primary mx-2' onClick={handleEditLesson}>EDIT</button>}
            <button className='btn btn-danger' onClick={handleShowBooking}>{lessonOption && 'USD ' + leastLessonPrice + '+'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonCard
