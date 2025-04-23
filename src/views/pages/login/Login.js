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
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCard className="py-4 mb-1" style={{ width: '65%' }}>
            <img
              src={`${process.env.PUBLIC_URL}/images/logo_2.png`}
              alt="Logo"
              style={{ height: '100px', objectFit: 'contain' }}
            />
          </CCard>

          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={handleSubmit(handleLogin)}>
                    <h1>{labels.login.titleHeader}</h1>
                    <p className="text-body-secondary">{labels.login.title}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
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
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
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
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="success" type="submit" disabled={isLoading}>
                          {isLoading ? <CSpinner size="sm" className="me-2" /> : null}
                          {isLoading ? labels.login.action.loading : labels.login.action.login}
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton
                          color="link"
                          className="px-0"
                          onClick={() => navigate('/forgot-pwd')}
                        >
                          {labels.login.action.forgotPassword}
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-gray py-5"
                style={{ width: '44%', backgroundColor: 'gray' }}
              >
                <CCardBody className="text-center fw-semibold">
                  <div>
                    {/* <h2>{labels.login.action.inscrire}</h2> */}
                    <h2> </h2>
                    <br></br>
                    <br></br>
                    <p>{labels.description}</p>
                    <span className="ml-6">V1.13.15</span>

                    {/* <Link to="/register">
                      <CButton color="secondary" className="mt-3" active tabIndex={-1}>
                        {labels.login.action.inscrire}
                      </CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <CModal visible={false} aria-labelledby="VerticallyCenteredExample" alignment="center">
        <CCardHeader style={{ backgroundColor: '#785a38' }}>
          <img
            style={{ width: '100%' }}
            src={`${process.env.PUBLIC_URL}/images/logo_1.png`}
            alt="Logo"
          />
        </CCardHeader>
        <CCardBody className="p-4">
          <form>
            <h3 className="d-flex justify-content-center">Récupération de Mot de Passe</h3>
            <p className="text-body-secondary"> </p>

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
