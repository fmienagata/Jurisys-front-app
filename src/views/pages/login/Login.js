import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  CButton,
  CCardBody,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CSpinner,
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
import packageInfo from '../../../../package.json'

import './Login.css'

const LOGO_SRC = `${process.env.PUBLIC_URL}/images/logojurisys.jpg`

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
      localStorage.setItem('clientCode', (data.clientCode || '').trim())
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
    <div className="login-page">
      <div className="login-bg-shape login-bg-shape--1" aria-hidden="true" />
      <div className="login-bg-shape login-bg-shape--2" aria-hidden="true" />
      <div className="login-bg-shape login-bg-shape--3" aria-hidden="true" />

      <div className="login-shell">
        <div className="login-brand-panel">
          <div className="login-brand-content">
            <div className="login-logo-frame">
              <img src={LOGO_SRC} alt="Jurisys" className="login-logo" />
            </div>
            <h2 className="login-brand-title">Bienvenue</h2>
            <p className="login-brand-tagline">{labels.description}</p>
            <ul className="login-brand-features">
              <li>Gestion des dossiers</li>
              <li>Messagerie &amp; agenda</li>
              <li>Suivi client simplifié</li>
            </ul>
            <span className="login-version">v{packageInfo.version}</span>
          </div>
        </div>

        <div className="login-form-panel">
          <CCardBody className="login-form-body">
            <div className="login-form-header">
              <img src={LOGO_SRC} alt="" className="login-form-logo-mobile" aria-hidden="true" />
              <h1 className="login-title">{labels.login.titleHeader}</h1>
              <p className="login-subtitle">{labels.login.title}</p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="login-form">
              <div className="login-field">
                <label htmlFor="clientCode" className="login-label">
                  Code client
                </label>
                <CInputGroup className="login-input-group">
                  <CInputGroupText className="login-icon">ID</CInputGroupText>
                  <Controller
                    name="clientCode"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <CFormInput
                        {...field}
                        id="clientCode"
                        className="login-input"
                        placeholder="Code client"
                        autoComplete="off"
                      />
                    )}
                  />
                </CInputGroup>
              </div>

              <div className="login-field">
                <label htmlFor="username" className="login-label">
                  Adresse e-mail
                </label>
                <CInputGroup className="login-input-group">
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
                        className="login-input"
                        placeholder="vous@exemple.com"
                        autoComplete="username"
                      />
                    )}
                  />
                </CInputGroup>
              </div>

              <div className="login-field">
                <label htmlFor="password" className="login-label">
                  Mot de passe
                </label>
                <CInputGroup className="login-input-group">
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
                        className="login-input"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                      />
                    )}
                  />
                </CInputGroup>
              </div>

              <CButton type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? <CSpinner size="sm" className="me-2" /> : null}
                {isLoading ? labels.login.action.loading : labels.login.action.login}
              </CButton>
            </form>

            <p className="login-footer-note">Plateforme sécurisée de gestion juridique</p>
          </CCardBody>
        </div>
      </div>

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
