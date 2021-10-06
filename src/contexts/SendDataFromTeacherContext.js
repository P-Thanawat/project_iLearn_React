import React, { createContext, useState } from 'react'


const SendDataFromTeacherContext = createContext()

function SendDataFromTeacherProvider({ children }) {
  const [lessons, setLessons] = useState([])
  return <SendDataFromTeacherContext.Provider value={{ lessons, setLessons }}>{children}</SendDataFromTeacherContext.Provider>
}

export { SendDataFromTeacherContext, SendDataFromTeacherProvider }