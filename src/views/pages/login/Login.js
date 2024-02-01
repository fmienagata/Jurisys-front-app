import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import labels from 'src/translations/labels.json'
import authService from 'src/services/authServices'
import { useMessageContext } from 'src/Context/MessageContext'

const Login = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { displaySuccess } = useMessageContext()

  const { control, handleSubmit } = useForm()

  const handleLogin = async (data) => {
    setIsLoading(true)
    try {
      const response = await authService.login(data)
      localStorage.setItem('token', response.token)
      setIsLoading(false)
      displaySuccess('yes logged - in')

      //navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCard className=" py-4 mb-1" style={{ width: '65%' }}>
            <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" />
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
                            placeholder="Nom d'utilisateur"
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
                          {isLoading ? labels.login.action.loading : labels.login.action.login}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          {labels.login.action.forgotPassword}
                        </CButton>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>{labels.login.action.inscrire}</h2>
                    <p>{labels.description}</p>
                    <Link to="/register">
                      <CButton color="secondary" className="mt-3" active tabIndex={-1}>
                        {labels.login.action.inscrire}
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
