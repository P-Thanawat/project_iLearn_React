import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ModalContext } from '../../contexts/ModalContext';
import axios from '../../config/axios'
import { AuthContext } from '../../contexts/AuthContext';

function ReviewForm({ lessonsRecord }) {
  const { showReviewForm, setShowReviewForm } = useContext(ModalContext)
  const handleClose = () => setShowReviewForm(false);
  const handleShow = () => setShowReviewForm(true);
  const [comment, setComment] = useState('')
  const [lessonPoint, setLessonPoint] = useState(0)
  const [tag, setTag] = useState([])
  const { user } = useContext(AuthContext)

  // console.log(`lessonsRecord`, lessonsRecord)
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setShowReviewForm(false)
      await axios.post('/reviews', { reviewPoint: lessonPoint, reviewMessage: comment, fisrtTag: tag?.[0], secondTag: tag?.[1], thirdTag: tag?.[2], lessonsId: lessonsRecord.lessonsId, userAccountId: user.id })
      console.log(`lessonsRecord.lessonId`, lessonsRecord.lessonId)
      await axios.put(`/lessonsRecord/${lessonsRecord.id}`, { completed: true })
      await axios.put('/userAccount/xp', { xp: 10 })
      window.location.reload()

    }
    catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div>
      <>
        <Modal show={showReviewForm} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>REVIEW</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>LESSON: {lessonsRecord?.lesson?.lessonName}</h5>
            <form onSubmit={handleSubmit}>
              <select className="form-select" aria-label="Default select example" value={lessonPoint} onChange={e => setLessonPoint(+e.target.value)}>
                <option selected>Lesson Point</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
              </select>
              <div className="input-group my-3 ">
                <label htmlFor="" className='input-group-text'>Comment</label>
                <textarea type="text" className='form-control' value={comment} onChange={e => setComment(e.target.value)} />
              </div>
              <button type="button" className={`btn btn-${tag.includes('Excellent') ? 'success' : 'secondary'} me-1`} onClick={() => setTag(cur => [...cur, 'Excellent'])}>Excellent</button>
              <button type="button" className={`btn btn-${tag.includes('preparedness') ? 'success' : 'secondary'} me-1`} onClick={() => setTag(cur => [...cur, 'preparedness'])}>preparedness</button>
              <button type="button" className={`btn btn-${tag.includes('fun') ? 'success' : 'secondary'} me-1`} onClick={() => setTag(cur => [...cur, 'fun'])}>fun</button>
              <button type="button" className={`btn btn-${tag.includes('admiration') ? 'success' : 'secondary'} me-1`} onClick={() => setTag(cur => [...cur, 'admiration'])}>admiration</button>
              <button type="button" className={`btn btn-${tag.includes('brilliant') ? 'success' : 'secondary'} me-1`} onClick={() => setTag(cur => [...cur, 'brilliant'])}>brilliant</button>
              <div className="d-flex justify-content-end mt-3">
                <button className='btn btn-secondary' type='submit' className='btn btn-success'>SEND</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  )
}

export default ReviewForm
