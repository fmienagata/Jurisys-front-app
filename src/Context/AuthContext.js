// AuthContext.js
import React, { createContext, useContext, useState } from 'react'

import PropTypes from 'prop-types'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token')?.length ? true : false)

  const disconnect = () => {
    localStorage.clear()
    setIsLogged(false)
  }

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }

  return <AuthContext.Provider value={{ isLogged, disconnect }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
