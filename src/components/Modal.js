import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CRow,
  CTooltip,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const ModalAction = (props) => {
  // eslint-disable-next-line react/prop-types
  const { openModal, setOpenModal } = props
  return (
    <>
      <CModal visible={openModal} onClose={() => setOpenModal(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>Woohoo, you&#39;re reading this text in a modal!</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setOpenModal(false)}>
            Fermer
          </CButton>
          <CButton color="danger">Supprimer</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalAction
