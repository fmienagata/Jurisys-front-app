import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'

import { useAuth } from 'src/Context/AuthContext'

//eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element, ...rest }) => {
  const { isLogged } = useAuth()
  return isLogged ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
