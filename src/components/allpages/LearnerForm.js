import React, { useContext, useState } from 'react'
import { showLearnerFormContext } from '../../contexts/ShowLeanerFormContext'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { AlertMessageContext } from '../../contexts/AlertMessageContext';

function LearnerForm() {
  const { showLearnerForm, setShowLearnerForm } = useContext(showLearnerFormContext)
  const [learnerAboutMe, setLearnerAboutMe] = useState('')
  const [language, setLanguage] = useState('')
  const [secondLanguage, setSecondLanguage] = useState('')
  const [thirdLanguage, setThirdLanguage] = useState('')
  const { user } = useContext(AuthContext)
  const { showAlertMessage, setShowAlertMessage, messageText, setMessageText } = useContext(AlertMessageContext)
  const [firstSkillTag, setFirstSkillTag] = useState('')
  const [secondskillTag, setSecondSkillTag] = useState('')
  const [thirdskillTag, setThirdSkillTag] = useState('')

  const handleClose = () => setShowLearnerForm(false);
  const handleShow = () => setShowLearnerForm(true);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      handleClose();
      const { data: { data: learner } } = await axios.post('/learnerProfile', { learnerAboutMe })
      console.log(`learner`, learner)
      const languageData = await axios.post('/languageSpeak', { language })
      secondLanguage && await axios.post('/languageSpeak', { language: secondLanguage })
      thirdLanguage && await axios.post('/languageSpeak', { language: thirdLanguage })
      firstSkillTag && await axios.post('/learnerSkill', { skill: firstSkillTag, learnerProfileId: learner.id })
      secondskillTag && await axios.post('/learnerSkill', { skill: secondskillTag, learnerProfileId: learner.id })
      thirdskillTag && await axios.post('/learnerSkill', { skill: thirdskillTag, learnerProfileId: learner.id })

      if (learner && languageData) {
        console.log('Create Learner Profile Successful')
        setMessageText('Create Learner Profile Successful')
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
      <Modal show={showLearnerForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome New Learner!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-1">
              <label htmlFor="" className='input-group-text'>About Learner</label>
              <textarea type="text" className='form-control' value={learnerAboutMe} onChange={e => setLearnerAboutMe(e.target.value)} />
            </div>
            <div className="input-group mb-1">
              <label htmlFor="" className='input-group-text'>Speak Language 1</label>
              <input type="text" className='form-control' value={language} onChange={e => setLanguage(e.target.value)} />
            </div>
            {language &&
              <div className="input-group mb-1">
                <label htmlFor="" className='input-group-text'>Speak Language 2</label>
                <input type="text" className='form-control' value={secondLanguage} onChange={e => setSecondLanguage(e.target.value)} />
              </div>}
            {secondLanguage &&
              <div className="input-group mb-3">
                <label htmlFor="" className='input-group-text'>Speak Language 3</label>
                <input type="text" className='form-control' value={thirdLanguage} onChange={e => setThirdLanguage(e.target.value)} />
              </div>
            }
            <div className="input-group mb-1">
              <label htmlFor="" className='input-group-text'>Skill Tag 1</label>
              <input type="text" className='form-control' value={firstSkillTag} onChange={e => setFirstSkillTag(e.target.value)} />
            </div>
            {firstSkillTag &&
              <div className="input-group mb-1">
                <label htmlFor="" className='input-group-text'>Skill Tag 2</label>
                <input type="text" className='form-control' value={secondskillTag} onChange={e => setSecondSkillTag(e.target.value)} />
              </div>}
            {secondskillTag &&
              <div className="input-group mb-3">
                <label htmlFor="" className='input-group-text'>Skill Tag 3</label>
                <input type="text" className='form-control' value={thirdskillTag} onChange={e => setThirdSkillTag(e.target.value)} />
              </div>
            }
            <button type="submit" className='btn btn-success float-end'>Confirm</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LearnerForm
