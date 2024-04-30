import React, { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import { CSpinner } from '@coreui/react'
import './scss/style.scss'
import PrivateRoute from './PrivateRoute'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const ForgotPwd = React.lazy(() => import('./views/pages/register/forgot-pwd'))

const App = () => {
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/forgot-pwd" name="Recuperer-mot-de-passe" element={<ForgotPwd />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route element={<PrivateRoute />}>
            <Route path="/500" element={<Page500 />} />
          </Route>

          <Route path="*" name="Accueil" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
