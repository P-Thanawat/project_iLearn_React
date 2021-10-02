import React, { createContext, useState } from 'react'


const showLearnerFormContext = createContext();

function ShowLearnerFormProvider({ children }) {
  const [showLearnerForm, setShowLearnerForm] = useState(false)
  return <showLearnerFormContext.Provider value={{ showLearnerForm, setShowLearnerForm }}>{children}</showLearnerFormContext.Provider>
}


export { showLearnerFormContext, ShowLearnerFormProvider }
