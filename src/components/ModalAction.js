import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const ModalAction = (props) => {
  // eslint-disable-next-line react/prop-types
  const { openModal, setOpenModal, action } = props
  return (
    <>
      <CModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="VerticallyCenteredExample"
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>Désactiver </CModalTitle>
        </CModalHeader>
        <CModalBody>Voulez vous vraiment le(s) désactiver ?</CModalBody>
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
