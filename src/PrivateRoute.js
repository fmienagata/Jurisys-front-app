import React from 'react'
import { Route, Navigate } from 'react-router-dom'

import { useAuth } from 'src/Context/AuthContext'

//eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element, ...rest }) => {
  const { isLogged } = useAuth()
  return isLogged ? <Route {...rest} element={element} /> : <React.Fragment />
}

export default PrivateRoute
