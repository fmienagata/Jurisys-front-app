import React from 'react'
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CListGroupItem,
  CListGroup,
  CRow,
} from '@coreui/react'
import PropTypes from 'prop-types'

const ModalMessage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { openModal, setOpenModal, action, dataMessage } = props
  console.log('dataMessage =>', dataMessage)
  const { id, messageFiles, ...newData } = dataMessage
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
          <CModalTitle>Message Title </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* <CCardHeader className="text-center">Information</CCardHeader> */}
          {/* <CListGroup flush>{generateMetadatas(slicedData)}</CListGroup> */}
          <CListGroup flush>
            {dataMessage &&
              Object.entries(newData).map(([key, value]) => (
                <CListGroupItem key={key}>
                  <CRow className="align-items-center">
                    <CCol className="text-start" xs={6}>
                      {key}
                    </CCol>
                    <CCol className="text-start" xs={6}>
                      <b>{value === null ? '---' : value}</b>
                    </CCol>
                  </CRow>
                </CListGroupItem>
              ))}
          </CListGroup>
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

ModalMessage.propTypes = {
  dataMessage: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.string,
    messageFiles: PropTypes.array,
  }).isRequired,
}

export default ModalMessage
