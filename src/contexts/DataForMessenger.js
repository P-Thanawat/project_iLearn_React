import React, { createContext, useState } from 'react'

const DataForMessengerContext = createContext();

function DataFromMessengerProvider({ children }) {
  const [dataForMessenger, setDataForMessenger] = useState('')
  return <DataForMessengerContext.Provider value={{ dataForMessenger, setDataForMessenger }}>{children}</DataForMessengerContext.Provider>
}

export { DataForMessengerContext, DataFromMessengerProvider }
