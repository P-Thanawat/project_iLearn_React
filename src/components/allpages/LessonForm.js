import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { AlertMessageContext } from '../../contexts/AlertMessageContext';
import { ShowLessonFormContext } from '../../contexts/showLessonFormContext';
import AvailableCalendar from './AvailableCalendar';

function LessonForm() {
  const { showLessonForm, setShowLessonForm } = useContext(ShowLessonFormContext)
  const [lessonName, setLessonName] = useState('')
  const [lessonDetail, setLessonDetail] = useState('')
  const [lessonPicutre, setLessonPicutre] = useState('')
  const [TypeTag, setTypeTag] = useState([])
  const [lessonTime, setLessonTime] = useState([])
  const [lessonPrice, setLessonPrice] = useState([])
  const [numberOfLesson, setNumberOfLesson] = useState([])
  const [promotionPrice, setPromotionPrice] = useState([])
  const [isShowPromotion, setIsShowPromotion] = useState([false, false, false])
  const { showAlertMessage, setShowAlertMessage, messageText, setMessageText } = useContext(AlertMessageContext)


  const handleChangePicture = e => {
    e.preventDefault()
    setLessonPicutre(e.target.files[0])
  }

  const handleSumbit = async e => {
    e.preventDefault();
    setShowLessonForm(false);
    console.log('submit lesson')

    const formData = new FormData();
    formData.append('lessonName', lessonName) //null is changed to 'null', so it has to be checked beforehand
    lessonDetail && formData.append('lessonDetail', lessonDetail)
    lessonPicutre && formData.append('lessonPicutre', lessonPicutre)
    TypeTag[0] && formData.append('firstTypeTag', TypeTag[0])
    TypeTag[1] && formData.append('secondTypeTag', TypeTag[1])
    TypeTag[2] && formData.append('thirdTypeTag', TypeTag[2])
    const { data: { data: lessonsData } } = await axios.post('/lessons', formData)
    console.log(`lessonsData`, lessonsData)

    let lessonOptionLength = 0;
    for (let i = 0; i <= 2; i++) {
      if (lessonTime[i] && lessonPrice[i]) {
        lessonOptionLength++;
      }
    }
    console.log(`lessonOptionLength`, lessonOptionLength)
    const lessonOptionData = []
    for (let i = 0; i <= lessonOptionLength - 1; i++) {
      lessonOptionData[i] = await axios.post('/lessonOption', { lessonTime: lessonTime[i], lessonPrice: lessonPrice[i], numberOfLesson: numberOfLesson[i] ?? null, promotionPrice: promotionPrice[i] ?? null, lessonsId: lessonsData.id })
      console.log('lessonoption' + i)
    }
    if (lessonsData && lessonOptionData[0]) {
      console.log('create lesson successful')
      setMessageText('Created Lesson Successful')
      setShowAlertMessage(true);
      setTimeout(() => {
        setShowAlertMessage(false);
      }, 2000);

    }


  }

  const handleChooseAvailable = () => {

  }



  const handleClose = () => setShowLessonForm(false);
  const handleShow = () => setShowLessonForm(true);

  return (
    <>

      <Modal show={showLessonForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Lesson!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSumbit} className='row'>

            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Lesson Name</label>
              <input type="text" className='form-control' value={lessonName} onChange={e => setLessonName(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Lesson Detail</label>
              <input type="textarea" className='form-control' value={lessonDetail} onChange={e => setLessonDetail(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Lesson Picture</label>
              <input type="file" onChange={handleChangePicture} className='form-control' />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Lesson Tag 1</label>
              <input type="text" className='form-control' value={TypeTag[0]} onChange={e => setTypeTag(cur => [e.target.value, cur[1], cur[2]])} />
            </div>
            {TypeTag[0] && <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Lesson Tag 2</label>
              <input type="text" className='form-control' value={TypeTag[1]} onChange={e => setTypeTag(cur => [cur[0], e.target.value, cur[2]])} />
            </div>}
            {TypeTag[1] && <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Lesson Tag 3</label>
              <input type="text" className='form-control' value={TypeTag[2]} onChange={e => setTypeTag(cur => [cur[0], cur[1], e.target.value])} />
            </div>}
            <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Lesson Price 1</label>
              <input type="text" className='form-control' value={lessonPrice[0]} onChange={e => setLessonPrice(cur => [e.target.value, cur[1], cur[2]])} />
              <span class="input-group-text">$</span>
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Lesson Time 1</label>
              <input type="text" className='form-control' value={lessonTime[0]} onChange={e => setLessonTime(cur => [e.target.value, cur[1], cur[2]])} />
              <span class="input-group-text">Minutes</span>
              {(lessonTime[0] && lessonPrice[0]) && <button class="btn btn-success" type="button" hidden={isShowPromotion[0]} onClick={() => setIsShowPromotion(cur => [!cur[0], cur[1], cur[2]])}>ADD PROMOTION</button>}
            </div>
            {isShowPromotion[0] && <>
              <div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Number fo Lesson 1</label>
                <input type="text" className='form-control' value={numberOfLesson[0]} onChange={e => setNumberOfLesson(cur => [e.target.value, cur[1], cur[2]])} />
                <span class="input-group-text">lessons</span>
              </div>
              <div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Promotion Price 1</label>
                <input type="text" className='form-control' value={promotionPrice[0]} onChange={e => setPromotionPrice(cur => [e.target.value, cur[1], cur[2]])} />
                <span class="input-group-text">$</span>
              </div>
            </>}

            {(lessonTime[0] && lessonPrice[0]) && <>
              <div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Lesson Price 2</label>
                <input type="text" className='form-control' value={lessonPrice[1]} onChange={e => setLessonPrice(cur => [cur[0], e.target.value, cur[2]])} />
                <span class="input-group-text">$</span>
              </div><div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Lesson Time 2</label>
                <input type="text" className='form-control' value={lessonTime[1]} onChange={e => setLessonTime(cur => [cur[0], e.target.value, cur[2]])} />
                <span class="input-group-text">Minutes</span>
                {(lessonTime[1] && lessonPrice[1]) && <button class="btn btn-success" type="button" hidden={isShowPromotion[1]} onClick={() => setIsShowPromotion(cur => [cur[0], !cur[1], cur[2]])}>ADD PROMOTION</button>}
              </div>
              {isShowPromotion[1] && <>
                <div className="input-group mb-3">
                  <label htmlFor="" className="input-group-text">Number fo Lesson 2</label>
                  <input type="text" className='form-control' value={numberOfLesson[1]} onChange={e => setNumberOfLesson(cur => [cur[0], e.target.value, cur[2]])} />
                  <span class="input-group-text">lessons</span>
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="" className="input-group-text">Promotion Price 2</label>
                  <input type="text" className='form-control' value={promotionPrice[1]} onChange={e => setPromotionPrice(cur => [cur[0], e.target.value, cur[2]])} />
                  <span class="input-group-text">$</span>
                </div>
              </>}
            </>
            }
            {(lessonTime[1] && lessonPrice[1]) && <>
              <div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Lesson Price 3</label>
                <input type="text" className='form-control' value={lessonPrice[2]} onChange={e => setLessonPrice(cur => [cur[0], cur[1], e.target.value])} />
                <span class="input-group-text">$</span>
              </div>
              <div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Lesson Time 3</label>
                <input type="text" className='form-control' value={lessonTime[2]} onChange={e => setLessonTime(cur => [cur[0], cur[1], e.target.value])} />
                <span class="input-group-text">Minutes</span>
                {(lessonTime[2] && lessonPrice[2]) && <button class="btn btn-success" type="button" hidden={isShowPromotion[2]} onClick={() => setIsShowPromotion(cur => [cur[0], cur[1], !cur[2]])}>ADD PROMOTION</button>}
              </div>
              {isShowPromotion[2] && <>
                <div className="input-group mb-3">
                  <label htmlFor="" className="input-group-text">Number fo Lesson 3</label>
                  <input type="text" className='form-control' value={numberOfLesson[2]} onChange={e => setNumberOfLesson(cur => [cur[0], cur[1], e.target.value])} />
                  <span class="input-group-text">lessons</span>
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="" className="input-group-text">Promotion Price 3</label>
                  <input type="text" className='form-control' value={promotionPrice[2]} onChange={e => setPromotionPrice(cur => [cur[0], cur[1], e.target.value])} />
                  <span class="input-group-text">$</span>
                </div>
              </>}

            </>
            }
            <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Choose available lesson time</label>
              <button class="btn btn-success" onClick={handleChooseAvailable}>Choose</button>
            </div>
            <div className="input-group mb-3 d-flex justify-content-end">
              <Button variant="primary" type="submit" data-bs-dismiss="modal">Save</Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LessonForm
