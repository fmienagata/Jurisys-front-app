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
  CCardTitle,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { capitalizeFirstLetter, formatFrenchDate } from 'src/utils/utils'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { getFileDossier } from 'src/services/dossiersService'
import { useMessageContext } from 'src/Context/MessageContext'

const ModalMessage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { openModal, setOpenModal, action, dataMessage } = props
  const { id, messageFiles, ...newData } = dataMessage
  const { displaySuccess, displayError } = useMessageContext()

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

  const downloadFile = async (file) => {
    try {
      const blobData = await getFileDossier(file)
      const url = window.URL.createObjectURL(blobData)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${file}`)
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      displayError(error.messages, 'Une erreur est survenue lors de téléchargement du fichier')
    }
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
        <CModalHeader alignment="center" aria-labelledby="VerticallyCenteredExample">
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
          {dataMessage.messageFiles.length > 0 && (
            <CListGroup flush>
              <CCardTitle className="mt-4 teal " style={{ color: 'teal' }}>
                Liste des piéces jointes:
              </CCardTitle>
              {dataMessage &&
                // eslint-disable-next-line react/prop-types
                dataMessage.messageFiles.map((value, key) => (
                  <CListGroupItem key={key}>
                    <CRow className="align-items-center">
                      <CCol className="text-start" xs={1}>
                        {key + 1}
                      </CCol>
                      <CCol className="text-start " xs={8}>
                        <b className="fw-semibold">{value === null ? '---' : value.fileName}</b>
                      </CCol>
                      <CCol className="text-start" xs={3}>
                        <CButton
                          color="dark"
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadFile(value.fileName)}
                        >
                          <CIcon icon={icon.cilCloudDownload} size="sm" /> Télécharger
                        </CButton>
                      </CCol>
                    </CRow>
                  </CListGroupItem>
                ))}
            </CListGroup>
          )}
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
