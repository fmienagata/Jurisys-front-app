import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const ModalAction = (props) => {
  // eslint-disable-next-line react/prop-types
  const { openModal, setOpenModal, action, titleModal, messageModal } = props
  const title = titleModal ? titleModal : 'Désactiver'
  const message = messageModal ? messageModal : 'Voulez vous vraiment le(s) désactiver ?'

  return (
    <>
      <CModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="VerticallyCenteredExample"
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>{title} </CModalTitle>
        </CModalHeader>
        <CModalBody>{message}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" className="fw-medium" onClick={() => setOpenModal(false)}>
            Fermer
          </CButton>
          {action}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalAction
