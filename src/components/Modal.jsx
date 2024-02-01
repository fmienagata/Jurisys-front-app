import React, { useState } from 'react'
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import PropTypes from 'prop-types'

const Modal = (props) => {
  //const { titleMessage, bodyMessage } = props

  // eslint-disable-next-line react/prop-types
  const { message, bodyMessage, visible, titleMessage, onClose } = props

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    onClose(event, reason)
  }
  //const [visible, setVisible] = useState(true)
  return (
    <>
      <CModal
        size="lg"
        visible={visible}
        onClose={handleClose}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample2">{titleMessage}</CModalTitle>
        </CModalHeader>
        <CModalBody>{message}</CModalBody>
      </CModal>
    </>
  )
}

// Modal.propTypes = {
//   titleMessage: PropTypes.string.isRequired,
//   bodyMessage: PropTypes.string.isRequired,
// }

export default Modal
