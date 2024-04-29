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
  CCardHeader,
  CListGroup,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import PropTypes from 'prop-types'
import { capitalizeFirstLetter, formatFrenchDate } from 'src/utils/utils'
import { getFileDossier } from 'src/services/dossiersService'
import { useMessageContext } from 'src/Context/MessageContext'

const ModalPiecesJointes = (props) => {
  // eslint-disable-next-line react/prop-types
  const { openModal, action, titleModal, setOpenModalPJ, listPJ } = props
  const { displaySuccess, displayError } = useMessageContext()

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
        onClose={() => setOpenModalPJ(false)}
        aria-labelledby="VerticallyCenteredExample"
        alignment="center"
        size="lg"
      >
        <CModalHeader>
          <CModalTitle className="text-end">Listes des piéces jointes</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup flush>
            {listPJ &&
              // eslint-disable-next-line react/prop-types
              listPJ.map((value, key) => (
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
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setOpenModalPJ(false)}>
            Fermer
          </CButton>
          {action}
        </CModalFooter>
      </CModal>
    </>
  )
}

ModalPiecesJointes.propTypes = {
  listPJ: PropTypes.shape({
    id: PropTypes.string.isRequired,
    filePath: PropTypes.string,
    fileName: PropTypes.string,
    updatedAt: PropTypes.string,
    createdAt: PropTypes.string,
  }),
}

export default ModalPiecesJointes
