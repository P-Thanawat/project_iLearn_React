import React, { useContext, useState } from 'react'
import { showLearnerFormContext } from '../../contexts/ShowLeanerFormContext'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

function LearnerForm() {
  const { showLearnerForm, setShowLearnerForm } = useContext(showLearnerFormContext)
  const [learnerAboutMe, setLearnerAboutMe] = useState('')
  const [language, setLanguage] = useState('')
  const [secondLanguage, setSecondLanguage] = useState('')
  const [thirdLanguage, setThirdLanguage] = useState('')
  const { user } = useContext(AuthContext)

  const handleClose = () => setShowLearnerForm(false);
  const handleShow = () => setShowLearnerForm(true);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await axios.post('/learnerProfile', { learnerAboutMe })
      await axios.post('/languageSpeak', { language })
      secondLanguage && await axios.post('/languageSpeak', { language: secondLanguage })
      thirdLanguage && await axios.post('/languageSpeak', { language: thirdLanguage })

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
            <label htmlFor="">LeanerAboutMe</label>
            <input type="text" value={learnerAboutMe} onChange={e => setLearnerAboutMe(e.target.value)} />
            <label htmlFor="">Language Speak</label>
            <input type="text" value={language} onChange={e => setLanguage(e.target.value)} />
            {language && <input type="text" value={secondLanguage} onChange={e => setSecondLanguage(e.target.value)} />}
            {secondLanguage && <input type="text" value={thirdLanguage} onChange={e => setThirdLanguage(e.target.value)} />}
            <button type="submit">Confirm</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LearnerForm
