import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react/cjs/react.development';
import { SendDataFromTeacherContext } from '../../contexts/SendDataFromTeacherContext';
import { showBookingContext } from '../../contexts/showBookingContext';
import { TableDataContext } from '../../contexts/TableData';
import MyCalendar from './BookingCalendar';

function BookingLesson() {

  const { showBooking, setShowBooking, lessonIdforBooking, setLessonIdforBooking } = useContext(showBookingContext)
  const { lessons, setLessons } = useContext(SendDataFromTeacherContext)
  const { tableData, setTableData } = useContext(TableDataContext)
  const [chooseMonth, setChooseMonth] = useState(1)
  const [lessonOption, setLessonOption] = useState([])

  const lesson = lessons.filter(item => item.id === lessonIdforBooking)


  const handleClose = () => setShowBooking(false);
  const handleShow = () => setShowBooking(true);

  useEffect(() => {
    const run = async () => {
      const { data: { data: lessonOption } } = await axios.get(`/lessonOption/${lessonIdforBooking}`)

      console.log(`lessonOption`, lessonOption)

      setLessonOption(lessonOption)
    }
    run()
  }, [showBooking])

  return (
    <>
      <Modal size="lg" show={showBooking} onHide={handleClose} fullscreen='true' >
        <Modal.Header closeButton>
          <Modal.Title>Booking Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='fw-bold mb-3'>Lesson: {lesson?.[0]?.lessonName}</p>

          <MyCalendar lesson={lesson} handleClose={handleClose} lessonOption={lessonOption} />
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingLesson
