import React from 'react'
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
  CModal,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

import { useNavigate } from 'react-router-dom'

const ForgotPwd = () => {
  const { control, handleSubmit } = useForm()
  const navigate = useNavigate()

  const handleRegistre = (data) => {
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CModal visible={false} aria-labelledby="VerticallyCenteredExample" alignment="center">
        <CModalBody>
          {' '}
          <div>
            <img
              style={{ width: '107%', marginLeft: '-3.4%' }}
              className="  "
              src={`${process.env.PUBLIC_URL}/images/logo_1.png`}
              alt="Logo"
            />
            {/* </CCardHeader> */}
            <label htmlFor="recipient-name" className="col-form-label">
              Mail de recupération:
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput id="email" type="email" placeholder="Email" autoComplete="email" />
            </CInputGroup>
          </div>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center">
          <CButton color="secondary">Envoyer</CButton>
        </CModalFooter>
      </CModal>

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10} lg={8} xl={8}>
            <CCard className="mx-4">
              <CCardHeader style={{ backgroundColor: '#785a38' }}>
                <img
                  style={{ width: '100%' }}
                  className="  "
                  src={`${process.env.PUBLIC_URL}/images/logo_1.png`}
                  alt="Logo"
                />
              </CCardHeader>
              <CCardBody className="p-4">
                <form onSubmit={handleSubmit(handleRegistre)}>
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
                    <CButton color="secondary" onClick={() => navigate('/login')}>
                      Retour
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

export default ForgotPwd
