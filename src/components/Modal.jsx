import React from 'react'
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const Modal = (props) => {
  const { message, title, visible, onClose, iconName } = props

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
        aria-labelledby="VerticallyCenteredExample"
        alignment="center"
        visible={visible}
        onClose={handleClose}
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample2">
            <CIcon
              icon={iconName === 'error' ? icon.cilXCircle : icon.cilCheckCircle}
              style={{ color: iconName === 'error' ? 'red' : 'green' }}
              size="lg"
            />{' '}
            {title}
          </CModalTitle>
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
  iconName: PropTypes.string,
}

export default Modal
