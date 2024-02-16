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
  const { openModal, setOpenModal, action } = props
  return (
    <>
      <CModal visible={openModal} onClose={() => setOpenModal(false)}>
        <CModalHeader>
          <CModalTitle>Suppression </CModalTitle>
        </CModalHeader>
        <CModalBody>Voulez vous vraiment le supprimer ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setOpenModal(false)}>
            Fermer
          </CButton>
          {action}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalAction
