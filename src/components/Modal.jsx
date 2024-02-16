import React from 'react'
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import PropTypes from 'prop-types'

const Modal = (props) => {
  const { message, title, visible, onClose } = props

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    onClose(event, reason)
  }

  return (
    <>
      <CModal
        size="lg"
        visible={visible}
        onClose={handleClose}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample2">{title}</CModalTitle>
        </CModalHeader>
        <CModalBody color="danger">{message}</CModalBody>
      </CModal>
    </>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Modal
