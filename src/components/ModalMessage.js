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
import { capitalizeFirstLetter, formatFrenchDate } from 'src/utils/utils'

const ModalMessage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { openModal, setOpenModal, action, dataMessage } = props
  const { id, messageFiles, ...newData } = dataMessage

  console.log('newData --> ', newData)

  function getKeyName(key) {
    let result = ''
    switch (key) {
      case 'createdAt':
        result = 'Créé le'
        break
      case 'updatedAt':
        result = 'Mis à jour'
        break
      case 'user':
        result = 'Utilisateur'
        break
      default:
        result = key
    }
    return capitalizeFirstLetter(result)
  }

  function getValue(key, value) {
    let result = ''
    switch (key) {
      case 'createdAt':
        result = formatFrenchDate(value)
        break
      case 'updatedAt':
        result = formatFrenchDate(value)
        break
      case 'dateAudience':
        result = formatFrenchDate(value)
        break
      case 'user':
        result = value.username
        break
      default:
        result = value
    }
    return capitalizeFirstLetter(result)
  }
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
          <CModalTitle>{capitalizeFirstLetter(dataMessage.type)} </CModalTitle>
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
                      {getKeyName(key)}
                    </CCol>
                    <CCol className="text-start" xs={6}>
                      <b>{value === null ? '---' : getValue(key, value)}</b>
                    </CCol>
                  </CRow>
                </CListGroupItem>
              ))}
          </CListGroup>

          {/* {dataMessage && (
            <CListGroup flush>
              <CListGroupItem key={'type'}>
                <CRow className="align-items-center">
                  <CCol className="text-start" xs={6}>
                    Type
                  </CCol>
                  <CCol className="text-start" xs={6}>
                    <b>
                      {dataMessage.type === null ? '---' : capitalizeFirstLetter(dataMessage.type)}
                    </b>
                  </CCol>
                </CRow>
              </CListGroupItem>
              <CListGroupItem key={'text'}>
                <CRow className="align-items-center">
                  <CCol className="text-start" xs={6}>
                    Text
                  </CCol>
                  <CCol className="text-start" xs={6}>
                    <b>
                      {dataMessage.text === null ? '---' : capitalizeFirstLetter(dataMessage.text)}
                    </b>
                  </CCol>
                </CRow>
              </CListGroupItem>
              <CListGroupItem key={'audience'}>
                <CRow className="align-items-center">
                  <CCol className="text-start" xs={6}>
                    Date audience
                  </CCol>
                  <CCol className="text-start" xs={6}>
                    <b>
                      {dataMessage.dateAudience === null
                        ? '---'
                        : capitalizeFirstLetter(dataMessage.dateAudience)}
                    </b>
                  </CCol>
                </CRow>
              </CListGroupItem>
              <CListGroupItem key={'dossier'}>
                <CRow className="align-items-center">
                  <CCol className="text-start" xs={6}>
                    Dossier
                  </CCol>
                  <CCol className="text-start" xs={6}>
                    <b>
                      {dataMessage.dossier === null
                        ? '---'
                        : capitalizeFirstLetter(dataMessage.dossier)}
                    </b>
                  </CCol>
                </CRow>
              </CListGroupItem>
              <CListGroupItem key={'createdAt'}>
                <CRow className="align-items-center">
                  <CCol className="text-start" xs={6}>
                    Créé le
                  </CCol>
                  <CCol className="text-start" xs={6}>
                    <b>
                      {dataMessage.createdAt === null
                        ? '---'
                        : capitalizeFirstLetter(dataMessage.createdAt)}
                    </b>
                  </CCol>
                </CRow>
              </CListGroupItem>
              <CListGroupItem key={'jour'}>
                <CRow className="align-items-center">
                  <CCol className="text-start" xs={6}>
                    Mis à jour
                  </CCol>
                  <CCol className="text-start" xs={6}>
                    <b>
                      {dataMessage.updatedAt === null
                        ? '---'
                        : capitalizeFirstLetter(dataMessage.updatedAt)}
                    </b>
                  </CCol>
                </CRow>
              </CListGroupItem>
            </CListGroup>
          )} */}
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
    dossier: PropTypes.string,
    dateAudience: PropTypes.string,
    updatedAt: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
}

export default ModalMessage
