import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from 'src/Context/AuthContext'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { isLogged } = useAuth()
  //const userRole = getUserRole()

  return (
    <Route
      {...rest}
      render={(props) =>
        // eslint-disable-next-line react/prop-types
        isLogged && roles.includes('ROLE_ADMIN') ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  )
}

export default ProtectedRoute
