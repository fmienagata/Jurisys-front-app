import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useAuth } from 'src/Context/AuthContext'

// routes config
import routes from '../routes'

const AppContent = () => {
  const { user } = useAuth()

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {user.roles &&
            routes.map((route, idx) => {
              const { path, element: Element, allowedRoles } = route
              const isAllowed = allowedRoles
                ? allowedRoles.some((role) => user.roles.includes(role))
                : true
              return (
                <Route
                  key={idx}
                  path={path}
                  element={isAllowed ? <Element /> : <Navigate to="/unauthorized" replace />}
                />
              )
            })}
          <Route path="/" element={<Navigate to="login" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
