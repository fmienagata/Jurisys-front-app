import React from 'react'
import {
  CButton,
  CForm,
  CCol,
  CRow,
  CHeaderText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CListGroupItem,
  CModalTitle,
  CListGroup,
} from '@coreui/react'
import { Controller, useForm } from 'react-hook-form'

import { capitalizeFirstLetter } from 'src/utils/utils'

const ModalAgendaMessage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { showModal, setShowModal, dataMessage } = props

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <CModal
        visible={showModal}
        onClose={() => handleCloseModal()}
        aria-labelledby="VerticallyCenteredExample"
        alignment="center"
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>
            {
              // eslint-disable-next-line react/prop-types
              dataMessage.title || ''
            }{' '}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup flush>
            <CListGroupItem>
              <CRow className="align-items-center">
                <CCol className="text-start" xs={6}>
                  Titre
                </CCol>
                <CCol className="text-start" xs={6}>
                  <b>
                    {
                      // eslint-disable-next-line react/prop-types
                      dataMessage.title || ''
                    }{' '}
                  </b>
                </CCol>
              </CRow>
            </CListGroupItem>

            <CListGroupItem>
              <CRow className="align-items-center">
                <CCol className="text-start" xs={6}>
                  {`Date et heure d'audience :`}
                </CCol>
                <CCol className="text-start " xs={6}>
                  <b>
                    {
                      // eslint-disable-next-line react/prop-types
                      capitalizeFirstLetter(dataMessage.dateAudiance) || ''
                    }{' '}
                  </b>
                </CCol>
              </CRow>
            </CListGroupItem>

            <CListGroupItem>
              <CRow className="align-items-center">
                <CCol className="text-start" xs={6}>
                  Dossier
                </CCol>
                <CCol className="text-start" xs={6}>
                  <b>
                    {
                      // eslint-disable-next-line react/prop-types
                      dataMessage.dossier || ''
                    }{' '}
                  </b>
                </CCol>
              </CRow>
            </CListGroupItem>

            <CListGroupItem>
              <CRow className="align-items-center">
                <CCol className="text-start" xs={6}>
                  Message :
                </CCol>
                <CCol className="text-start" xs={6}>
                  <b>
                    {
                      // eslint-disable-next-line react/prop-types
                      dataMessage.text || ''
                    }{' '}
                  </b>
                </CCol>
              </CRow>
            </CListGroupItem>
          </CListGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => handleCloseModal()}>
            Fermer
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalAgendaMessage
