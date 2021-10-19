import React, { useContext, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AlertMessageContext } from "../../contexts/AlertMessageContext";
import { AuthContext } from "../../contexts/AuthContext";
import axios from '../../config/axios'
import { set } from "date-fns";
import { ModalContext } from "../../contexts/ModalContext";
import PaymentLesson from "./PaymentLesson";


const localizer = momentLocalizer(moment);

function BookingCalendar({ lesson, handleClose, lessonOption }) {
  const { showAlertMessage, setShowAlertMessage, messageText, setMessageText } = useContext(AlertMessageContext)
  const [events, setEvents] = useState([])
  const { user } = useContext(AuthContext)
  const [lessonTime, setLessonTime] = useState(0)
  const [lessonPrice, setLessonPrice] = useState(0)

  const [selectedTime, setSelectedTime] = useState(0)
  const [showButton, setShowButton] = useState([])
  const { setShowPayment, setPaymentData } = useContext(ModalContext)

  console.log(`lesson`, lesson)
  useEffect(() => {
    const run = async () => {
      try {
        const { data: { data: availableData } } = await axios.get(`/available/${lesson[0].teacherProfileId}`)
        const { data: { data: lessonsRecordData } } = await axios.get(`/lessonsRecord/${lesson[0].teacherProfileId}`)

        console.log(`availableData`, availableData)
        console.log(`lessonsRecordData`, lessonsRecordData)


        //* availableData - lessonsRecordData
        lessonsRecordData.forEach(itemL => {
          availableData.forEach(itemA => {
            //*between between
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
            //*same same
            if ((moment(itemL.startLearnTime).isSame(itemA.startAvailableTime)) && (moment(itemL.endLearnTime).isSame(itemA.endAvailableTime))) {
              const idx = availableData.findIndex(item => item.id === itemA.id);
              availableData.splice(idx, 1)
            }

            //*same and between
            if ((moment(itemL.startLearnTime).isSame(itemA.startAvailableTime)) && (moment(itemL.endLearnTime).isBetween(itemA.startAvailableTime, itemA.endAvailableTime))) {
              availableData.push({
                startAvailableTime: new Date(itemL.endLearnTime).toISOString(),
                endAvailableTime: new Date(itemA.endAvailableTime).toISOString(),
                id: Date.now(),
              })
              const idx = availableData.findIndex(item => item.id === itemA.id);
              availableData.splice(idx, 1)
            }

            //*between same
            if ((moment(itemL.startLearnTime).isBetween(itemA.startAvailableTime, itemA.endAvailableTime)) && (moment(itemL.endLearnTime).isSame(itemA.endAvailableTime))) {
              availableData.push({
                startAvailableTime: new Date(itemA.startAvailableTime).toISOString(),
                endAvailableTime: new Date(itemL.startLearnTime).toISOString(),
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
      catch (err) {
        console.log(err.message);
      }
    }
    run()
  }, [])

  const handleBook = async () => {
    try {
      if (selectedTime !== lessonTime) {
        setMessageText('You chose lesson time less')
        setShowAlertMessage(true)
        setTimeout(() => {
          setShowAlertMessage(false)
        }, 3000);
      }
      if (selectedTime === lessonTime) {
        handleClose();
        const learnData = events.filter(item => item.title === 'learn')
        // for (let i = 0; i <= learnData.length - 1; i++) {
        //   await axios.post('/lessonsRecord', { startLearnTime: learnData?.[i]?.start, endLearnTime: learnData?.[i]?.end, completed: false, userAccountId: user?.id, lessonsId: lesson?.[0]?.id })
        // }
        setPaymentData(cur => ({ ...cur, lesson, user, learnData, lessonPrice, }))
        setShowPayment(true)



        // setMessageText('You have just sent booking request to teacher')
        // setShowAlertMessage(true)
        // setTimeout(() => {
        //   setShowAlertMessage(false)
        // }, 3000);
      }
    }
    catch (err) {
      console.log(err.message);
    }

  }



  const handleSelect = async ({ start, end }) => {
    try {
      const selectedTimeNow = selectedTime + (((new Date(end)).getTime() - (new Date(start)).getTime()) / 1000 / 60)

      let IsOverTime = false;
      if (selectedTimeNow > lessonTime) {
        IsOverTime = true;
      }
      console.log(`IsOverTime`, IsOverTime)

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

      if (!IsRepeat && start > moment().add(1, "days").toDate() && IsAvailable && !IsOverTime) { //past case
        setSelectedTime(selectedTimeNow);
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
      else if (IsOverTime) {

        selectedTime === 0 ?
          setMessageText('Please choose lesson option') :
          setMessageText('You chose lesson time over')
        setShowAlertMessage(true)
        setTimeout(() => {
          setShowAlertMessage(false)
        }, 3000);
      }
    }
    catch (err) {
      console.log(err.message);
    }

  }

  const handleEvent = (event) => {
    console.log(event)
    setSelectedTime(cur => cur - (((event.end).getTime() - (event.start).getTime()) / 1000 / 60))
    setEvents(cur => cur.filter(item => item.id !== event.id || item.title === 'available'))

  }
  console.log(`events`, events)

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.title === 'learn' ? 'lightBlue' : 'green';
    // console.log(`event`, event)
    // console.log(`start`, start)
    // console.log(`end`, end)
    // console.log(`isSelected`, isSelected)
    const style = {
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

  const handleSelectOption = (lessonOptionId, IsOption) => {
    const lesson = lessonOption.find(item => item.id === lessonOptionId)
    if (IsOption) {
      setLessonTime(lesson.lessonTime * lesson.numberOfLesson)
      setLessonPrice(+lesson.promotionPrice)
    }
    else {
      setLessonTime(+lesson.lessonTime)
      setLessonPrice(+lesson.lessonPrice)
    }
    setShowButton([lesson.id, IsOption])

    setEvents(cur => cur.filter(item => item.title !== 'learn'))

  }


  return (
    <div>

      <div className="d-flex justify-content-start my-2 p-2" > {/*Choose Option*/}
        {lessonOption.map(item => (
          <div key={item.id}>
            <div className="d-flex flex-column align-items-center me-2 mb-4">
              <p className='fw-bold'>{item.lessonTime} Minutes</p>
              <button onClick={() => handleSelectOption(item.id, false)} className={`btn ${showButton[0] === item.id && !showButton[1] ? 'btn-success' : 'btn-secondary'} border`}>{`1Lesson $${item.lessonPrice}`}</button>
              {item.numberOfLesson && <button onClick={() => handleSelectOption(item.id, true)} className={`btn border mt-2 ${showButton[0] === item.id && showButton[1] ? 'btn-success' : 'btn-secondary'}`}>{`${item.numberOfLesson}Lesson $${item.promotionPrice}`}</button>}
            </div>
          </div>
        ))}
      </div>
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
