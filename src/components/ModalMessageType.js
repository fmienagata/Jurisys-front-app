import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import PropTypes from 'prop-types'

const ModalMessageType = (props) => {
  // eslint-disable-next-line react/prop-types
  const { openModal, setOpenModal, action, dataMessage } = props

  return (
    <>
      <CModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="VerticallyCenteredExample"
        alignment="center"
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>{dataMessage.type}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{dataMessage.text}</p>
        </CModalBody>
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

ModalMessageType.propTypes = {
  dataMessage: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.string,
  }),
}

export default ModalMessageType
