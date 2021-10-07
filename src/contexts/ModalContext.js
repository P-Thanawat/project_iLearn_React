import React, { createContext, useState } from 'react'

const ModalContext = createContext()

function ModalProvider({ children }) {
  const [showLogin, setShowLogin] = useState(false)
  const [showTeacherForm, setShowTeacherForm] = useState(false)
  const [showLessonForm, setShowLessonForm] = useState(false)
  const [showLearnerForm, setShowLearnerForm] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [lessonIdforBooking, setLessonIdforBooking] = useState('')
  const [showAvailableChoose, setShowAvailableChoose] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)


  return <ModalContext.Provider value={{
    showLogin, setShowLogin,
    showTeacherForm, setShowTeacherForm,
    showLessonForm, setShowLessonForm,
    showLearnerForm, setShowLearnerForm,
    showBooking, setShowBooking,
    lessonIdforBooking, setLessonIdforBooking,
    showAvailableChoose, setShowAvailableChoose,
    showReviewForm, setShowReviewForm
  }}>{children}</ModalContext.Provider>
}

export { ModalContext, ModalProvider }
