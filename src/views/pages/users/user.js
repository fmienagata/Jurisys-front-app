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
import { capitalizeFirstLetter, formatFrenchDate } from 'src/utils/utils'

const User = () => {
  const location = useLocation()
  const { state } = location
  const { id, password, ...data } = state.data

  function getKeyName(key) {
    let result = ''
    switch (key) {
      case 'createdAt':
        result = 'Créé le'
        break
      case 'updatedAt':
        result = 'Mis à jour'
        break
      case 'user':
        result = 'Utilisateur'
        break
      case 'username':
        result = `Nom d'utilisateur`
        break
      case 'userType':
        result = `Role`
        break
      default:
        result = key
    }
    return capitalizeFirstLetter(result)
  }
  function getKeyValue(key, value) {
    let result = ''
    if (key === 'updatedAt' || key === 'createdAt') result = formatFrenchDate(value)
    else if (key === 'userType') result = value.roles
    else result = value === null ? '---' : value

    return capitalizeFirstLetter(result)
  }

  const generateMetadatas = () => {
    return (
      <div>
        {Object.entries(data).map(([key, value]) => (
          <CListGroupItem key={key}>
            <CRow className="align-items-center">
              <CCol className="text-start" xs={6}>
                {getKeyName(key)}
              </CCol>
              <CCol className="text-start" xs={6}>
                <b>{value === null ? '---' : getKeyValue(key, value)}</b>
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
