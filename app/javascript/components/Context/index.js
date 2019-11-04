import React, { useEffect, useState } from 'react'

export const AuthContext = React.createContext(null)

export default ({ children }) => {
  const auth = () => !!window.localStorage.getItem('refreshToken') || !!window.localStorage.getItem('token')
  const [authenticated, setAuthenticated] = useState(auth())

  useEffect(
    () => {
      if (!authenticated) {
        window.localStorage.removeItem('refreshToken')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('expires')
      }
    },
    [authenticated]
  )

  const defaultContext = {
    authenticated,
    setAuthenticated
  }

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  )
}
