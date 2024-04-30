// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useQueryClient } from 'react-query'

import PropTypes from 'prop-types'

const AuthContext = createContext()

const initState = {
  token: '',
  user: {
    username: '',
    firstName: '',
    lastName: '',
    roles: '',
  },
  isAuthenticated: false,
}

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token')?.length ? true : false)
  const [state, setState] = useState({ ...initState, token: localStorage.getItem('token') })
  const queryClient = useQueryClient()

  useEffect(() => {
    extractTokenData()
  }, [isLogged])

  const extractTokenData = (tk) => {
    try {
      if (isLogged) {
        const decoded = jwtDecode(localStorage.getItem('token'))

        setState({
          ...state,
          isAuthenticated: true,
          user: {
            username: decoded.username,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            roles: decoded.roles[0],
          },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const connect = () => {
    extractTokenData()
    setIsLogged(true)
  }

  const disconnect = () => {
    localStorage.clear()
    setIsLogged(false)
    queryClient.clear()
  }

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }

  return (
    <AuthContext.Provider value={{ isLogged, user: state.user, disconnect, connect }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
