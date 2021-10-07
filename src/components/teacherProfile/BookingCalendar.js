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
  useEffect(() => {
    const run = async () => {
      const { data: { data: availableData } } = await axios.get(`/available/${lesson[0].teacherProfileId}`)
      const { data: { data: lessonsRecordData } } = await axios.get(`/lessonsRecord/${lesson[0].teacherProfileId}`)

      console.log(`availableData`, availableData)
      console.log(`lessonsRecordData`, lessonsRecordData)

      //* availableData - lessonsRecordData
      lessonsRecordData.forEach(itemL => {
        availableData.forEach(itemA => {
          if ((moment(itemL.startLearnTime).isBetween(itemA.startAvailableTime, itemA.endAvailableTime)) && (moment(itemL.endLearnTime).isBetween(itemA.startAvailableTime, itemA.endAvailableTime))) {
            availableData.push({
              startAvailableTime: new Date(itemA.startAvailableTime).toISOString(),
              endAvailableTime: new Date(itemL.startLearnTime).toISOString(),
              id: Date.now(),
            })
            availableData.push({
              startAvailableTime: new Date(itemL.endLearnTime).toISOString(),
              endAvailableTime: new Date(itemA.endAvailableTime).toISOString(),
              id: Date.now(),
            })
            const idx = availableData.findIndex(item => item.id === itemA.id);
            availableData.splice(idx, 1)
          }
        })
      })

      // //* to subtract available in the past
      // availableData.forEach(itemA => {
      //   if (itemA.endAvailableTime < (new Date().toISOString())) {

      //     const idx = availableData.findIndex(item => item.id === itemA.id);
      //     availableData.splice(idx, 1)
      //   }
      // })

      const initialEvent = [];
      availableData.forEach(item => {
        initialEvent.push({
          start: moment(new Date(item?.startAvailableTime)).toDate(),
          end: moment(new Date(item?.endAvailableTime)).toDate(),
          title: 'available',
          id: item?.id,
        })
      })
      console.log(`initialEvent`, initialEvent)
      setEvents(initialEvent)

    }
    run()
  }, [])

  const handleBook = async () => {
    handleClose();
    const learnData = events.filter(item => item.title === 'learn')
    for (let i = 0; i <= learnData.length - 1; i++) {
      await axios.post('/lessonsRecord', { startLearnTime: learnData?.[i]?.start, endLearnTime: learnData?.[i]?.end, completed: false, userAccountId: user?.id, lessonsId: lesson?.[0]?.id })
    }

    setMessageText('You have just sent booking request to teacher')
    setShowAlertMessage(true)
    setTimeout(() => {
      setShowAlertMessage(false)
    }, 3000);
  }



  const handleSelect = async ({ start, end }) => {
    // const title = window.prompt('New Event name')
    // console.log(`start`, start)
    // console.log(`end`, end)
    // console.log(`title`, title)
    let IsRepeat = false;
    const learnData = events.filter(item => item.title === 'learn')
    const available = events.filter(item => item.title === 'available')
    learnData.forEach((item) => { // repeat case
      if (start >= item.start && start < item.end) {
        // console.log('start break');
        IsRepeat = true;
      }
      if (end > item.start && end <= item.end) {
        // console.log('end break');
        IsRepeat = true;
      }
      if (start < item.start && end > item.end) {
        // console.log('break');
        IsRepeat = true;
      }
    })
    // console.log(`moment().add(1, "days").toDate()`, moment().add(1, "days").toDate())


    let IsAvailable = false; //avaible case
    available.forEach(item => {
      // if (start >= item.start && start < item.end) {
      //   console.log('start break');
      //   IsAvailable = false;
      // }
      // if (end > item.start && end <= item.end) {
      //   console.log('end break');
      //   IsAvailable = false;
      // }
      // if (start < item.start && end > item.end) {
      //   console.log('break');
      //   IsAvailable = false;
      // }
      if ((start >= item.start && start <= item.end) && (end >= item.start && end <= item.end)) {
        IsAvailable = true;
      }

    })

    if (!IsRepeat && start > moment().add(1, "days").toDate() && IsAvailable) { //past case
      setEvents(cur => ([
        {
          start,
          end,
          title: 'learn',
          id: Date.now(),
          lessonId: lesson?.[0]?.id,
          userAccountId: user?.id,
        }, ...cur,
      ]))


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
    else if (!IsAvailable) {
      setMessageText('You can choose in only available time')
      setShowAlertMessage(true)
      setTimeout(() => {
        setShowAlertMessage(false)
      }, 3000);
    }

  }

  const handleEvent = (event) => {
    console.log(event)
    setEvents(cur => cur.filter(item => item.id !== event.id || item.title === 'available'))
  }
  console.log(`events`, events)

  const eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = event.title === 'learn' ? 'lightBlue' : 'green';
    // console.log(`event`, event)
    // console.log(`start`, start)
    // console.log(`end`, end)
    // console.log(`isSelected`, isSelected)
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };


    return ({
      style: style
    })
  }


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
        eventPropGetter={eventStyleGetter}

      />
      <div className="d-flex justify-content-end mt-3">
        <button className='btn btn-secondary mx-2' onClick={handleClose}>Close</button>
        <button className='btn btn-danger' onClick={handleBook}>BOOK</button>
      </div>
    </div>
  );

}


export default BookingCalendar;
