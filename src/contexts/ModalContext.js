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
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentData, setPaymentData] = useState({})
  const [showTopup, setShowTopup] = useState(false)
  const [showAddCreditCard, setShowAddCreditCard] = useState(false)
  const [showAlertConfirm, setShowAlertConfirm] = useState(false)
  const [answer, setAnswer] = useState(false)
  const [lessonData, setLessonData] = useState({})
  const [IsEditLesson, setIsEditLesson] = useState(false)

  return <ModalContext.Provider value={{
    showLogin, setShowLogin,
    showTeacherForm, setShowTeacherForm,
    showLessonForm, setShowLessonForm,
    showLearnerForm, setShowLearnerForm,
    showBooking, setShowBooking,
    lessonIdforBooking, setLessonIdforBooking,
    showAvailableChoose, setShowAvailableChoose,
    showReviewForm, setShowReviewForm,
    showRegisterForm, setShowRegisterForm,
    showPayment, setShowPayment,
    paymentData, setPaymentData,
    showTopup, setShowTopup,
    showAddCreditCard, setShowAddCreditCard,
    showAlertConfirm, setShowAlertConfirm,
    answer, setAnswer,
    lessonData, setLessonData,
    IsEditLesson, setIsEditLesson
  }}>{children}</ModalContext.Provider>
}

export { ModalContext, ModalProvider }
