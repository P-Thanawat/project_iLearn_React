import React, { useContext, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AlertMessageContext } from "../../contexts/AlertMessageContext";
import { AuthContext } from "../../contexts/AuthContext";
import axios from '../../config/axios'
import { Button, Modal } from 'react-bootstrap';
import { ModalContext } from "../../contexts/ModalContext";

const localizer = momentLocalizer(moment);

function AvailableCalendar({ teacherProfile }) {
  const { showAlertMessage, setShowAlertMessage, messageText, setMessageText } = useContext(AlertMessageContext)
  const { user } = useContext(AuthContext)
  const [events, setEvents] = useState([])
  const { showAvailableChoose, setShowAvailableChoose } = useContext(ModalContext)
  const handleClose = () => setShowAvailableChoose(false);
  const handleShow = () => setShowAvailableChoose(true);

  // fetch events data
  useEffect(() => {
    const run = async () => {
      const { data: { data: availableData } } = await axios.get(`/available/${teacherProfile.id}`)
      console.log(`availableData`, availableData)
      const initialEvent = [];

      availableData.forEach(item => {
        initialEvent.push({
          start: moment(new Date(item?.startAvailableTime)).toDate(),
          end: moment(new Date(item?.endAvailableTime)).toDate(),
          title: '',
          id: item?.id,
        })
      })
      console.log(`initialEvent`, initialEvent)
      setEvents(initialEvent)
    }
    teacherProfile && run()
  }, [showAvailableChoose])

  const handleSet = async () => {
    handleClose();
    await axios.delete(`/available/${teacherProfile.id}`)
    for (let i = 0; i <= events.length - 1; i++) {
      await axios.post('/available', { startAvailableTime: events?.[i]?.start, endAvailableTime: events?.[i]?.end, teacherProfileId: teacherProfile.id })
    }
    setMessageText('Setting Available Time Successful')
    setShowAlertMessage(true)
    setTimeout(() => {
      setShowAlertMessage(false)
    }, 3000);

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
    if (!IsRepeat) {
      setEvents(cur => ([

        {
          start,
          end,
          title: '',
          id: Date.now(),
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


  }

  const handleEvent = (event) => {
    console.log(event)
    setEvents(cur => cur.filter(item => item.id !== event.id))
  }
  // console.log(`events`, events)



  return (
    <>

      <Modal show={showAvailableChoose} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Available time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <button className='btn btn-danger' onClick={handleSet}>SET</button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>




  );

}


export default AvailableCalendar;
