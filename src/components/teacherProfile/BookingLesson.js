import React, { useContext } from 'react'
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

  const lesson = lessons.filter(item => item.id === lessonIdforBooking)
  console.log(`thisLesson`, lesson)

  const handleClose = () => setShowBooking(false);
  const handleShow = () => setShowBooking(true);

  const minuteToTime = (minute) => {
    let result = '00:00'
    const hour = Math.floor(minute / 60)
    const restHour = minute % 60;
    result = `${hour <= 9 ? '0' + hour : hour}:${restHour}`
    return result;
  }
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const thisMonth = (new Date().getMonth()) + 1 //oct = 9+1 =10
  const thisYear = new Date().getFullYear() //2021
  const firstDay = [];
  firstDay[0] = new Date(thisYear, thisMonth - 2, 1).toDateString().split(' ')[0] //check what first day is
  firstDay[1] = new Date(thisYear, thisMonth - 1, 1).toDateString().split(' ')[0] //check what first day is
  firstDay[2] = new Date(thisYear, thisMonth, 1).toDateString().split(' ')[0] //check what first day is
  console.log(`firstDay`, firstDay)


  return (
    <>
      <Modal size="lg" show={showBooking} onHide={handleClose} fullscreen='true' >
        <Modal.Header closeButton>
          <Modal.Title>Booking Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className='fw-bold mb-3'>Lesson: {lesson?.[0]?.lessonName}</span>
          {/* <button className={`btn ${chooseMonth === 0 ? 'btn-success' : ''}`} onClick={() => { setChooseMonth(0) }}>{monthNames[thisMonth - 2]}</button>
          <button className={`btn ${chooseMonth === 1 ? 'btn-success' : ''}`} onClick={() => { setChooseMonth(1) }}>{monthNames[thisMonth - 1]}</button>
          <button className={`btn ${chooseMonth === 2 ? 'btn-success' : ''}`} onClick={() => { setChooseMonth(2) }}>{monthNames[thisMonth]}</button> */}
          {/* <table className='availableTableOnBooking m-4'>
            <tr>
              <td>#####</td>
              <td style={{ width: "10px" }}>Mon</td>
              <td style={{ width: "10px" }}>Tue</td>
              <td style={{ width: "10px" }}>Wed</td>
              <td style={{ width: "10px" }}>Thu</td>
              <td style={{ width: "10px" }}>Fri</td>
              <td style={{ width: "10px" }}>Sat</td>
              <td style={{ width: "10px" }}>Sun</td>
            </tr> */}
          <MyCalendar lesson={lesson} handleClose={handleClose} />
          {/* week = [27, 28, 29, 30, 1, 2, 3] */}
          {/* {tableData?.[chooseMonth]?.[0].map((item, index) => ( //premonth
              <tr>
                <td>{`${minuteToTime(0 + 15 * (index))} - ${minuteToTime(0 + 15 * (index) + 15)}`}</td>
                <td id={ }></td>
                <td id={index}></td> 
                <td id={index + 1}></td> 
                <td id={index + 2}></td> 
                <td id={index + 3}></td>
                <td id={index + 4}></td>
                <td id={index + 5}></td>  
              </tr>
            ))}  */}
          {/* </table> */}
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingLesson
