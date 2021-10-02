import React, { createContext, useState } from 'react'
import { user as initialUser } from '../services/localStorage';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(initialUser)
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider }
