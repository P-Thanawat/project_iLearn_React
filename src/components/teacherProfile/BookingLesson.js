import axios from '../../config/axios';
import React, { useContext, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import { useState } from 'react/cjs/react.development';
import { SendDataFromTeacherContext } from '../../contexts/SendDataFromTeacherContext';
import { showBookingContext } from '../../contexts/showBookingContext';
import MyCalendar from './BookingCalendar';

function BookingLesson() {

  const { showBooking, setShowBooking, lessonIdforBooking } = useContext(showBookingContext)
  const { lessons } = useContext(SendDataFromTeacherContext)
  const [lessonOption, setLessonOption] = useState([])

  const lesson = lessons.filter(item => item.id === lessonIdforBooking)


  const handleClose = () => setShowBooking(false);

  useEffect(() => {

    const run = async () => {
      try {
        const { data: { data: lessonOption } } = await axios.get(`/lessonOption/${lessonIdforBooking}`)

        console.log(`lessonOption`, lessonOption)

        setLessonOption(lessonOption)
      }
      catch (err) {
        console.log(err.message);
      }
    }
    if (showBooking) run()

  }, [showBooking])

  return (
    <>
      <Modal size="lg" show={showBooking} onHide={handleClose} fullscreen='true' >
        <Modal.Header closeButton>
          <Modal.Title>Booking Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className=' mb-3 fs-4'>Lesson: {lesson?.[0]?.lessonName}</p>

          <MyCalendar lesson={lesson} handleClose={handleClose} lessonOption={lessonOption} />
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingLesson
