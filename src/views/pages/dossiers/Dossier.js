import React, { useState } from 'react'
import { CCol, CContainer, CRow } from '@coreui/react'
import InformationCard from './InformationCard'
import { useLocation } from 'react-router-dom'
import MessagesView from './MessagesView'

const Dossier = () => {
  const location = useLocation()
  const { state } = location

  return (
    <CContainer>
      <CRow xs={{ gutterX: 4 }}>
        <CCol xs={4} direction="column">
          <InformationCard dataDossier={state.data} />
        </CCol>
        <CCol xs={8}>
          <MessagesView dataDossier={state.data} />
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Dossier
