import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useEffect } from 'react/cjs/react.development';
import { AlertMessageContext } from '../../contexts/AlertMessageContext';
import { ModalContext } from '../../contexts/ModalContext';
import { ShowLessonFormContext } from '../../contexts/showLessonFormContext';
import AvailableCalendar from './AvailableCalendar';

function LessonForm() {
  const [lessonName, setLessonName] = useState('')
  const [lessonDetail, setLessonDetail] = useState('')
  const [lessonPicture, setLessonPicture] = useState('')
  const [TypeTag, setTypeTag] = useState([])
  const [lessonTime, setLessonTime] = useState([])
  const [lessonPrice, setLessonPrice] = useState([])
  const [numberOfLesson, setNumberOfLesson] = useState([])
  const [promotionPrice, setPromotionPrice] = useState([])
  const [isShowPromotion, setIsShowPromotion] = useState([false, false, false])
  const { showAlertMessage, setShowAlertMessage, messageText, setMessageText } = useContext(AlertMessageContext)
  const { setShowAvailableChoose, lessonData, IsEditLesson, showLessonForm, setShowLessonForm } = useContext(ModalContext)

  useEffect(() => {
    if (IsEditLesson) {
      console.log(`lessonData`, lessonData)
      setLessonName(lessonData?.data?.data?.[0]?.lesson?.lessonName)
      setLessonDetail(lessonData?.data?.data?.[0]?.lesson?.lessonDetail)
      setTypeTag([lessonData?.data?.data?.[0]?.lesson?.firstTypeTag, lessonData?.data?.data?.[0]?.lesson?.secondTypeTag, lessonData?.data?.data?.[0]?.lesson?.thirdTypeTag])
      setLessonTime([lessonData?.data?.data?.[0]?.lessonTime, lessonData?.data?.data?.[1]?.lessonTime, lessonData?.data?.data?.[2]?.lessonTime])
      setLessonPrice([lessonData?.data?.data?.[0]?.lessonPrice, lessonData?.data?.data?.[1]?.lessonPrice, lessonData?.data?.data?.[2]?.lessonPrice])
      setNumberOfLesson([lessonData?.data?.data?.[0]?.numberOfLesson, lessonData?.data?.data?.[1]?.numberOfLesson, lessonData?.data?.data?.[2]?.numberOfLesson])
      setPromotionPrice([lessonData?.data?.data?.[0]?.promotionPrice, lessonData?.data?.data?.[1]?.promotionPrice, lessonData?.data?.data?.[2]?.promotionPrice])
      setIsShowPromotion([lessonData?.data?.data?.[0]?.numberOfLesson ? true : false, lessonData?.data?.data?.[1]?.numberOfLesson ? true : false, lessonData?.data?.data?.[2]?.numberOfLesson ? true : false])
    }
    else {
      setLessonName('')
      setLessonDetail('')
      setLessonPicture('')
      setTypeTag([])
      setLessonTime([])
      setLessonPrice([])
      setNumberOfLesson([])
      setPromotionPrice([])
      setIsShowPromotion([false, false, false])
    }
  }, [IsEditLesson])

  const handleChangePicture = e => {
    e.preventDefault()
    setLessonPicture(e.target.files[0])
  }

  const handleSumbit = async e => {
    e.preventDefault();
    setShowLessonForm(false);
    console.log('submit lesson')

    const formData = new FormData();
    formData.append('lessonName', lessonName) //null is changed to 'null', so it has to be checked beforehand
    lessonDetail && formData.append('lessonDetail', lessonDetail)
    lessonPicture && formData.append('lessonPicture', lessonPicture)
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

    setLessonName('')
    setLessonDetail('')
    setLessonPicture('')
    setTypeTag([])
    setLessonTime([])
    setLessonPrice([])
    setNumberOfLesson([])
    setPromotionPrice([])
    setIsShowPromotion([false, false, false])


  }

  const handleChooseAvailable = () => {
    setShowAvailableChoose(true)
  }



  const handleClose = () => setShowLessonForm(false);
  const handleShow = () => setShowLessonForm(true);


  const handleEdit = async e => {
    e.preventDefault();
    setShowLessonForm(false);

    const formData = new FormData();
    lessonName && formData.append('lessonName', lessonName) //null is changed to 'null', so it has to be checked beforehand
    lessonDetail && formData.append('lessonDetail', lessonDetail)
    lessonPicture && formData.append('lessonPicture', lessonPicture ?? null)
    TypeTag[0] && formData.append('firstTypeTag', TypeTag[0])
    TypeTag[1] && formData.append('secondTypeTag', TypeTag[1])
    TypeTag[2] && formData.append('thirdTypeTag', TypeTag[2])
    const { data: { data: lessonsData } } = await axios.put(`/lessons/${lessonData?.data?.data?.[0]?.lesson?.id}`, formData)
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
      if (lessonData?.data?.data?.[i]) {
        lessonOptionData[i] = await axios.put(`/lessonOption/${lessonData?.data?.data?.[i]?.id}`, { lessonTime: lessonTime[i], lessonPrice: lessonPrice[i], numberOfLesson: numberOfLesson[i] ?? null, promotionPrice: promotionPrice[i] ?? null })
      }
      else {
        lessonOptionData[i] = await axios.post('/lessonOption', { lessonTime: lessonTime[i], lessonPrice: lessonPrice[i], numberOfLesson: numberOfLesson[i] ?? null, promotionPrice: promotionPrice[i] ?? null, lessonsId: lessonData?.data?.data?.[0]?.lessonsId })
      }
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
  return (
    <>

      <Modal show={showLessonForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Lesson!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={IsEditLesson ? handleEdit : handleSumbit} className='row'>

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
            {/* <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Lesson Tag 1</label>
              <input type="text" className='form-control' value={TypeTag[0]} onChange={e => setTypeTag(cur => [e.target.value, cur[1], cur[2]])} />
            </div> */}
            <div className="input-group mb-3">
              <select onChange={e => setTypeTag(cur => [e.target.value, cur[1], cur[2]])} className="form-select" aria-label="Default select example">
                {TypeTag[0] || <option >Lesson Tag 1</option>}
                <option value="Data Science">Data Science</option>
                <option value="Business">Business</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Language Learning">Language Learning</option>
                <option value="Health">Health</option>
                <option value="Personal Development">Personal Development</option>
                <option value="Physical Science and Engineering">Physical Science and Engineering</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Arts and Humanities">Arts and Humanities</option>
                <option value="Math and Logic">Math and Logic</option>
              </select>
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
              <span className="input-group-text">$</span>
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Lesson Time 1</label>
              <input type="text" className='form-control' value={lessonTime[0]} onChange={e => setLessonTime(cur => [e.target.value, cur[1], cur[2]])} />
              <span className="input-group-text">Minutes</span>
              {(lessonTime[0] && lessonPrice[0]) && <button className="btn btn-success" type="button" hidden={isShowPromotion[0]} onClick={() => setIsShowPromotion(cur => [!cur[0], cur[1], cur[2]])}>ADD PROMOTION</button>}
            </div>
            {isShowPromotion[0] && <>
              <div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Number fo Lesson 1</label>
                <input type="text" className='form-control' value={numberOfLesson[0]} onChange={e => setNumberOfLesson(cur => [e.target.value, cur[1], cur[2]])} />
                <span className="input-group-text">lessons</span>
              </div>
              <div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Promotion Price 1</label>
                <input type="text" className='form-control' value={promotionPrice[0]} onChange={e => setPromotionPrice(cur => [e.target.value, cur[1], cur[2]])} />
                <span className="input-group-text">$</span>
              </div>
            </>}

            {(lessonTime[0] && lessonPrice[0]) && <>
              <div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Lesson Price 2</label>
                <input type="text" className='form-control' value={lessonPrice[1]} onChange={e => setLessonPrice(cur => [cur[0], e.target.value, cur[2]])} />
                <span className="input-group-text">$</span>
              </div><div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Lesson Time 2</label>
                <input type="text" className='form-control' value={lessonTime[1]} onChange={e => setLessonTime(cur => [cur[0], e.target.value, cur[2]])} />
                <span className="input-group-text">Minutes</span>
                {(lessonTime[1] && lessonPrice[1]) && <button className="btn btn-success" type="button" hidden={isShowPromotion[1]} onClick={() => setIsShowPromotion(cur => [cur[0], !cur[1], cur[2]])}>ADD PROMOTION</button>}
              </div>
              {isShowPromotion[1] && <>
                <div className="input-group mb-3">
                  <label htmlFor="" className="input-group-text">Number fo Lesson 2</label>
                  <input type="text" className='form-control' value={numberOfLesson[1]} onChange={e => setNumberOfLesson(cur => [cur[0], e.target.value, cur[2]])} />
                  <span className="input-group-text">lessons</span>
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="" className="input-group-text">Promotion Price 2</label>
                  <input type="text" className='form-control' value={promotionPrice[1]} onChange={e => setPromotionPrice(cur => [cur[0], e.target.value, cur[2]])} />
                  <span className="input-group-text">$</span>
                </div>
              </>}
            </>
            }
            {(lessonTime[1] && lessonPrice[1]) && <>
              <div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Lesson Price 3</label>
                <input type="text" className='form-control' value={lessonPrice[2]} onChange={e => setLessonPrice(cur => [cur[0], cur[1], e.target.value])} />
                <span className="input-group-text">$</span>
              </div>
              <div className="input-group mb-3">
                <label htmlFor="" className="input-group-text">Lesson Time 3</label>
                <input type="text" className='form-control' value={lessonTime[2]} onChange={e => setLessonTime(cur => [cur[0], cur[1], e.target.value])} />
                <span className="input-group-text">Minutes</span>
                {(lessonTime[2] && lessonPrice[2]) && <button className="btn btn-success" type="button" hidden={isShowPromotion[2]} onClick={() => setIsShowPromotion(cur => [cur[0], cur[1], !cur[2]])}>ADD PROMOTION</button>}
              </div>
              {isShowPromotion[2] && <>
                <div className="input-group mb-3">
                  <label htmlFor="" className="input-group-text">Number fo Lesson 3</label>
                  <input type="text" className='form-control' value={numberOfLesson[2]} onChange={e => setNumberOfLesson(cur => [cur[0], cur[1], e.target.value])} />
                  <span className="input-group-text">lessons</span>
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="" className="input-group-text">Promotion Price 3</label>
                  <input type="text" className='form-control' value={promotionPrice[2]} onChange={e => setPromotionPrice(cur => [cur[0], cur[1], e.target.value])} />
                  <span className="input-group-text">$</span>
                </div>
              </>}

            </>
            }
            <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Choose available lesson time</label>
              <button className="btn btn-success" type="button" onClick={handleChooseAvailable}>Choose</button>
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
