import React, { useContext, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AlertMessageContext } from "../../contexts/AlertMessageContext";
import { AuthContext } from "../../contexts/AuthContext";
import axios from '../../config/axios'

const localizer = momentLocalizer(moment);

function BookingCalendar({ lesson, handleClose }) {
  const { showAlertMessage, setShowAlertMessage, messageText, setMessageText } = useContext(AlertMessageContext)
  const [events, setEvents] = useState([])
  const { user } = useContext(AuthContext)

  console.log(`lesson`, lesson)


  const handleBook = async () => {
    handleClose();
    for (let i = 0; i <= events.length - 1; i++) {
      await axios.post('/lessonsRecord', { startLearnTime: events?.[i]?.start, endLearnTime: events?.[i]?.end, completed: false, userAccountId: user?.id, lessonsId: lesson?.[0]?.id })
    }
  }



  const handleSelect = async ({ start, end }) => {
    // const title = window.prompt('New Event name')
    console.log(`start`, start)
    console.log(`end`, end)
    // console.log(`title`, title)
    let IsRepeat = false;
    events.forEach((item) => {
      if (start >= item.start && start < item.end) {
        console.log('start break');
        IsRepeat = true;
      }
      if (end > item.start && end <= item.end) {
        console.log('end break');
        IsRepeat = true;
      }
      if (start < item.start && end > item.end) {
        console.log('break');
        IsRepeat = true;
      }
    })
    console.log(`moment().add(1, "days").toDate()`, moment().add(1, "days").toDate())
    if (!IsRepeat && start > moment().add(1, "days").toDate()) {
      setEvents(cur => ([

        {
          start,
          end,
          title: '',
          id: Date.now(),
          lessonId: lesson?.[0]?.id,
          userAccountId: user?.id
        }, ...cur,
      ]
      ))


    }
    if (IsRepeat) {
      setMessageText('You are re-choosing on your time')
      setShowAlertMessage(true)
      setTimeout(() => {
        setShowAlertMessage(false)
      }, 3000);
    }
    else if (!(start > moment().add(1, "days").toDate())) {
      setMessageText('You cannot choose time that is in past or today. (for at least, next 24hr)')
      setShowAlertMessage(true)
      setTimeout(() => {
        setShowAlertMessage(false)
      }, 3000);
    }

  }

  const handleEvent = (event) => {
    console.log(event)
    setEvents(cur => cur.filter(item => item.id !== event.id))
  }
  console.log(`events`, events)

  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="week"
        events={events}
        style={{ height: "100vh" }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEvent}
        views={['agenda', 'week']}
        step={15}
        timeslots={1}
      />
      <div className="d-flex justify-content-end mt-3">
        <button className='btn btn-secondary mx-2' onClick={handleClose}>Close</button>
        <button className='btn btn-danger' onClick={handleBook}>BOOK</button>
      </div>
    </div>
  );

}


export default BookingCalendar;
