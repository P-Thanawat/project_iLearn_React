import React, { createContext, useState } from 'react'

const ShowLessonFormContext = createContext();

function ShowLessonFormProvider({ children }) {
  const [showLessonForm, setShowLessonForm] = useState(false)
  return <ShowLessonFormContext.Provider value={{ showLessonForm, setShowLessonForm }}>{children}</ShowLessonFormContext.Provider>

}

export { ShowLessonFormContext, ShowLessonFormProvider }
