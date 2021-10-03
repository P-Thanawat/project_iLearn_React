import React, { createContext, useState } from 'react'

const TeacherFormContext = createContext();

function TeacherFormProvider({ children }) {
  const [showTeacherForm, setShowTeacherForm] = useState(false)
  return <TeacherFormContext.Provider value={{ showTeacherForm, setShowTeacherForm }}>{children}</TeacherFormContext.Provider>
}

export { TeacherFormContext, TeacherFormProvider }
