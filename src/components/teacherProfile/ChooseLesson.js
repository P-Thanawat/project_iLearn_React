import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import LessonCard from './LessonCard';

function ChooseLesson({ showChoosing, setShowChoosing, lessonOption, setShowBooking, userAccount }) {


  const handleClose = () => setShowChoosing(false);
  const handleShow = () => setShowChoosing(true);

  return (
    <>

      <Modal show={showChoosing} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choosing Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {lessonOption.map((item, index) => (<LessonCard key={index} userAccount={userAccount} lessonOption={item} setShowBooking={setShowBooking} setShowChoosing={setShowChoosing} />))}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChooseLesson
