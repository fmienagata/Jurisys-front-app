import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import labels from 'src/translations/labels.json'

import { getUsers } from 'src/services/usersService'

const Register = () => {
  const { control, handleSubmit } = useForm()

  const handleRegistre = (data) => {}

  useEffect(() => {
    getUsers()
      .then((data) => {})
      .catch((error) => {})
  }, [])

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardHeader style={{ backgroundColor: '#785a38' }}>
                {' '}
                <img
                  style={{ width: '100%' }}
                  className="  "
                  src={`${process.env.PUBLIC_URL}/images/logo_1.png`}
                  alt="Logo"
                />
              </CCardHeader>
              <CCardBody className="p-4">
                <form onSubmit={handleSubmit(handleRegistre)}>
                  <h1>{labels.registre.titleHeader}</h1>
                  <p className="text-body-secondary">{labels.registre.subTitle}</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <Controller
                      name="userType"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="userType"
                          placeholder="userType"
                          autoComplete="userType"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <Controller
                      name="nom"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="nom"
                          placeholder="Nom d'utilisateur"
                          autoComplete="nom"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <Controller
                      name="prenom"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="prenom"
                          placeholder="Prenom d'utilisateur"
                          autoComplete="prenom"
                        />
                      )}
                    />
                  </CInputGroup>
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
                          placeholder="username"
                          autoComplete="username"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
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
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <Controller
                      name="societe"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="societe"
                          placeholder="societe"
                          autoComplete="societe"
                        />
                      )}
                    />
                  </CInputGroup>
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
                          placeholder="Email"
                          autoComplete="email"
                        />
                      )}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      {labels.registre.action.registre}
                    </CButton>
                  </div>
                </form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
