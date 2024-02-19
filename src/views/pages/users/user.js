import React from 'react'
import {
  CCard,
  CCol,
  CContainer,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react'
import { useLocation } from 'react-router-dom'

const User = () => {
  const location = useLocation()
  const { state } = location
  const { id, password, ...data } = state.data

  const generateMetadatas = () => {
    return (
      <div>
        {Object.entries(data).map(([key, value]) => (
          <CListGroupItem key={key}>
            <CRow className="align-items-center">
              <CCol className="text-start" xs={6}>
                {key}
              </CCol>
              <CCol className="text-start" xs={6}>
                <b>{value === null ? '---' : value}</b>
              </CCol>
            </CRow>
          </CListGroupItem>
        ))}
      </div>
    )
  }

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={8}>
            <CCard className="mx-8" md={9} lg={7} xl={6}>
              <CCardHeader className="text-center">Information utilisateur</CCardHeader>
              <CListGroup flush>{generateMetadatas()}</CListGroup>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default User
