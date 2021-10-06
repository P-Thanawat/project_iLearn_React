import React, { createContext, useState } from 'react'


const showBookingContext = createContext()

function ShowBookingProvider({ children }) {
  const [showBooking, setShowBooking] = useState(false)
  const [lessonIdforBooking, setLessonIdforBooking] = useState('')
  return <showBookingContext.Provider value={{ showBooking, setShowBooking, lessonIdforBooking, setLessonIdforBooking }}>{children}</showBookingContext.Provider>
}

export { showBookingContext, ShowBookingProvider }
