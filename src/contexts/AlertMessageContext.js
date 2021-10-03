import React, { createContext, useEffect, useState } from 'react'

const AlertMessageContext = createContext()

function AlertMessageProvider({ children }) {
  const [showAlertMessage, setShowAlertMessage] = useState(false)
  const [messageText, setMessageText] = useState('')
  return <AlertMessageContext.Provider value={{ showAlertMessage, setShowAlertMessage, messageText, setMessageText }}>{children}</AlertMessageContext.Provider>
}

export { AlertMessageContext, AlertMessageProvider }
