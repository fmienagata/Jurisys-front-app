import React from 'react'
import { CButton, CCol, CContainer, CInputGroup, CRow } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-body-tertiary min-vh-60 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">401</h1>
              <h4 className="pt-3">Aucune autorisation</h4>
              <p className="text-body-secondary float-start">
                {"Désolé, vous n'êtes actuellement pas autorisé à consulter cette page."}
              </p>
            </div>
            <CInputGroup className="justify-content-center">
              <CButton color="secondary" onClick={() => navigate('/dashboard')}>
                Dashboard
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
