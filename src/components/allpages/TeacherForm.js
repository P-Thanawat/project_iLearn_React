import React, { useState } from 'react'
import { useContext } from 'react/cjs/react.development';
import { TeacherFormContext } from '../../contexts/showTeacherFormContext';
import { Button, Modal } from 'react-bootstrap';
import axios from '../../config/axios';
import { AlertMessageContext } from '../../contexts/AlertMessageContext';

function TeacherForm() {
  const { showTeacherForm, setShowTeacherForm } = useContext(TeacherFormContext)
  const [introduceContent, setIntroduceContent] = useState('')
  const [presentText, setPresentText] = useState('')
  const [aboutTeacher, setAboutTeacher] = useState('')
  const [ableBooking, setableBooking] = useState(true)
  const [ableContact, setAbleContact] = useState(true)
  const [language, setLanguage] = useState('')
  const [secondLanguage, setSecondLanguage] = useState('')
  const [thirdLanguage, setThirdLanguage] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [secondSpecialist, setSecondSpecialist] = useState('')
  const [thirdSpecialist, setThirdSpecialist] = useState('')

  const handleClose = () => setShowTeacherForm(false);
  const handleShow = () => setShowTeacherForm(true);
  const { showAlertMessage, setShowAlertMessage, messageText, setMessageText } = useContext(AlertMessageContext)


  const handleChangeIntro = e => {
    e.preventDefault();
    console.log(`e.target.files`, e.target.files)
    setIntroduceContent(e.target.files[0])
  }

  const handleSumbit = async e => {
    try {
      e.preventDefault()
      setShowTeacherForm(false);

      //* create teacher profile to backend (teacherProfile)
      const formData = new FormData();
      introduceContent && formData.append('introduceContent', introduceContent)
      console.log(`introduceContent`, introduceContent)
      presentText && formData.append('presentText', presentText)
      aboutTeacher && formData.append('aboutTeacher', aboutTeacher)
      ableBooking && formData.append('ableBooking', ableBooking)
      ableContact && formData.append('ableContact', ableContact)
      const { data: { data: teacher } } = await axios.post('/teacherProfile', formData)
      console.log(`teacher`, teacher)

      //* create language speak to backend (languageSpeak)
      const languageCheck = await axios.post('/languageSpeak', { language })
      secondLanguage && await axios.post('/languageSpeak', { language: secondLanguage })
      thirdLanguage && await axios.post('/languageSpeak', { language: thirdLanguage })

      //* create specialist to backend (teacherSubject)
      const specialistCheck = await axios.post('/teacherSubject', { subject: specialist, teacherProfileId: teacher.id })
      secondSpecialist && await axios.post('/teacherSubject', { subject: secondSpecialist, teacherProfileId: teacher.id })
      thirdSpecialist && await axios.post('/teacherSubject', { subject: thirdSpecialist, teacherProfileId: teacher.id })


      if (teacher && languageCheck && specialistCheck) {
        console.log('create teacher profile successful')
        setMessageText('create teacher profile successful')
        setShowAlertMessage(true);
        setTimeout(() => {
          setShowAlertMessage(false);
        }, 2000);
      }
    }
    catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <Modal show={showTeacherForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome New Teacher!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSumbit} className='row'>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>introduction content</label>
              <input type="file" onChange={handleChangeIntro} className='form-control' />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>Present content</label>
              <input type="text" className='form-control' value={presentText} onChange={e => setPresentText(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className='input-group-text'>About teacher</label>
              <input type="text" className='form-control' value={aboutTeacher} onChange={e => setAboutTeacher(e.target.value)} />
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <input type="checkbox" className="form-check-input" defaultChecked onClick={e => setableBooking(cur => !cur)} />
                </div>
                <label htmlFor="" className='input-group-text'>Able to Booking</label>
              </div>
            </div>
            <div className="col">
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <input type="checkbox" className="form-check-input mt-0" defaultChecked onClick={e => setAbleContact(cur => !cur)} />
                </div>
                <label htmlFor="" className='input-group-text'>Able to Contact</label>
              </div>
            </div>
            <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Language1</label>
              <input type="text" className='form-control' value={language} onChange={e => setLanguage(e.target.value)} />
            </div>
            {language && <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Language2</label>
              <input type="text" className='form-control' value={secondLanguage} onChange={e => setSecondLanguage(e.target.value)} />
            </div>}
            {secondLanguage && <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Language3</label>
              <input type="text" className='form-control' value={thirdLanguage} onChange={e => setThirdLanguage(e.target.value)} />
            </div>}
            <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Specialist1</label>
              <input type="text" className='form-control' value={specialist} onChange={e => setSpecialist(e.target.value)} />
            </div>
            {specialist && <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Specialist2</label>
              <input type="text" className='form-control' value={secondSpecialist} onChange={e => setSecondSpecialist(e.target.value)} />
            </div>}
            {secondSpecialist && <div className="input-group mb-3">
              <label htmlFor="" className="input-group-text">Specialist3</label>
              <input type="text" className='form-control' value={thirdSpecialist} onChange={e => setThirdSpecialist(e.target.value)} />
            </div>}
            <div className="input-group mb-3">
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

export default TeacherForm
