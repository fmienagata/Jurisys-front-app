import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CSpinner,
  CRow,
  CModal,
  CCardHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import labels from 'src/translations/labels.json'
import authService from 'src/services/authServices'
import { useMessageContext } from 'src/Context/MessageContext'
import { useAuth } from 'src/Context/AuthContext'

// Import du CSS personnalisé
import './Login.css'

const Login = () => {
  const { connect, isLogged } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { displayError } = useMessageContext()

  const { control, handleSubmit } = useForm()

  const handleLogin = async (data) => {
    setIsLoading(true)
    try {
      const response = await authService.login(data)
      localStorage.setItem('token', response.token)
      connect()
      setIsLoading(false)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      displayError('Votre Identifiant et/ou mot de passe est incorrect')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard')
    }
  }, [isLogged, navigate])

  return (
    <div className="login-wrapper min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          {/* Logo */}
          <CCard className="py-4 mb-3 shadow-sm border-0" style={{ width: '65%' }}>
            <img
              src={`${process.env.PUBLIC_URL}/images/logojurisys.jpg`}
              alt="Logo"
              className="login-logo"
            />
          </CCard>

          <CCol md={8}>
            <CCardGroup>
              {/* Formulaire */}
              <CCard className="p-4 shadow-sm border-0 login-card">
                <CCardBody>
                  <form onSubmit={handleSubmit(handleLogin)}>
                    <h1 className="login-title">{labels.login.titleHeader}</h1>
                    <p className="text-body-secondary">{labels.login.title}</p>

                    {/* Username */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText className="login-icon">
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="username"
                            placeholder="E-Mail d'utilisateur"
                            autoComplete="username"
                          />
                        )}
                      />
                    </CInputGroup>

                    {/* Password */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText className="login-icon">
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="password"
                            type="password"
                            placeholder="Mot de passe"
                            autoComplete="current-password"
                          />
                        )}
                      />
                    </CInputGroup>

                    {/* Bouton login */}
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          type="submit"
                          className="login-btn"
                          disabled={isLoading}
                        >
                          {isLoading ? <CSpinner size="sm" className="me-2" /> : null}
                          {isLoading ? labels.login.action.loading : labels.login.action.login}
                        </CButton>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>

              {/* Panneau droit */}
              <CCard className="text-white py-5 login-right">
                <CCardBody className="text-center fw-semibold">
                  <h2>Bienvenue</h2>
                  <br />
                  <p>{labels.description}</p>
                  <span className="login-version">V1.13.15</span>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>

      {/* Modal reset password */}
      <CModal visible={false} aria-labelledby="VerticallyCenteredExample" alignment="center">
        <CCardHeader className="login-modal-header">
          <img
            className="login-modal-logo"
            src={`${process.env.PUBLIC_URL}/images/logo_1.png`}
            alt="Logo"
          />
        </CCardHeader>
        <CCardBody className="p-4">
          <form>
            <h3 className="d-flex justify-content-center">Récupération de Mot de Passe</h3>

            <CInputGroup className="mb-3">
              <CInputGroupText>@</CInputGroupText>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CFormInput
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                  />
                )}
              />
            </CInputGroup>

            <div className="d-flex justify-content-center">
              <CButton type="submit" color="success" className="mx-3">
                Envoyer
              </CButton>
            </div>
          </form>
        </CCardBody>
      </CModal>
    </div>
  )
}

export default Login
