import React, { useState } from 'react'
import {
  CCol,
  CCardText,
  CCardTitle,
  CRow,
  CCard,
  CListGroup,
  CCardHeader,
  CListGroupItem,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import PropTypes from 'prop-types'
import ModalMessage from '../../../components/ModalMessage'

const MessagesView = ({ messages }) => {
  const [openMessage, setOpenMessage] = useState(false)
  return (
    <>
      <CCard>
        <CCardHeader className="text-center">Listes des messages</CCardHeader>
        <CListGroup flush>
          <CListGroupItem>
            <CCardHeader className="text-center">
              <CRow className="align-items-center">
                <CCol className="text-start" xs={4}>
                  <CRow>
                    <small className="text-medium-emphasis">12/01/2024</small>
                  </CRow>
                </CCol>
                <CCol className="text-start" xs={4}>
                  <CCardTitle>
                    <small>Title messages</small>
                  </CCardTitle>
                </CCol>
                <CCol className="text-end" xs={4}>
                  <CButton
                    color="success"
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpenMessage(true)}
                  >
                    <CIcon icon={icon.cilFolderOpen} size="sm" />
                  </CButton>
                  <CButton color="success" variant="ghost" size="sm">
                    <CIcon icon={icon.cilTrash} size="sm" />
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CListGroup flush>
              <CListGroupItem>
                <CRow className="align-items-center">
                  <CCol className="text-start" xs={12}>
                    <CCardText onDoubleClick={() => setOpenMessage(true)}>
                      Ce texte généré aléatoirement (lorem ipsum) peut être utilisé dans vos
                      maquettes (webdesign, sites internet, livres, affiches...) gratuitement. Ce
                      texte est entièrement libre de droit. Ce texte généré aléatoirement (lorem
                      ipsum) peut être utilisé dans vos maquettes (webdesign, sites internet,
                      livres, affiches...) gratuitement. Ce texte est entièrement libre de droit.
                    </CCardText>
                  </CCol>
                </CRow>
              </CListGroupItem>
            </CListGroup>
          </CListGroupItem>
          <CListGroupItem>
            <CCardHeader className="text-center">
              <CRow className="align-items-center">
                <CCol className="text-start" xs={4}>
                  <CRow>
                    <small className="text-medium-emphasis">12/01/2024</small>
                  </CRow>
                </CCol>
                <CCol className="text-start" xs={4}>
                  <CCardTitle>
                    <small>Title messages</small>
                  </CCardTitle>
                </CCol>
                <CCol className="text-end" xs={4}>
                  <CButton
                    color="success"
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpenMessage(true)}
                  >
                    <CIcon icon={icon.cilFolderOpen} size="sm" />
                  </CButton>
                  <CButton color="success" variant="ghost" size="sm">
                    <CIcon icon={icon.cilTrash} size="sm" />
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CListGroup flush>
              <CListGroupItem>
                <CRow className="align-items-center">
                  <CCol className="text-start" xs={12}>
                    <CCardText onDoubleClick={() => setOpenMessage(true)}>
                      Ce texte généré aléatoirement (lorem ipsum) peut être utilisé dans vos
                      maquettes (webdesign, sites internet, livres, affiches...) gratuitement. Ce
                      texte est entièrement libre de droit. Ce texte généré aléatoirement (lorem
                      ipsum) peut être utilisé dans vos maquettes (webdesign, sites internet,
                      livres, affiches...) gratuitement. Ce texte est entièrement libre de droit.
                    </CCardText>
                  </CCol>
                </CRow>
              </CListGroupItem>
            </CListGroup>
          </CListGroupItem>
          <CListGroupItem>
            <CCardHeader className="text-center">
              <CRow className="align-items-center">
                <CCol className="text-start" xs={4}>
                  <CRow>
                    <small className="text-medium-emphasis">12/01/2024</small>
                  </CRow>
                </CCol>
                <CCol className="text-start" xs={4}>
                  <CCardTitle>
                    <small>Title messages</small>
                  </CCardTitle>
                </CCol>
                <CCol className="text-end" xs={4}>
                  <CButton
                    color="success"
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpenMessage(true)}
                  >
                    <CIcon icon={icon.cilFolderOpen} size="sm" />
                  </CButton>
                  <CButton color="success" variant="ghost" size="sm">
                    <CIcon icon={icon.cilTrash} size="sm" />
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CListGroup flush>
              <CListGroupItem>
                <CRow className="align-items-center">
                  <CCol className="text-start" xs={12}>
                    <CCardText onDoubleClick={() => setOpenMessage(true)}>
                      Ce texte généré aléatoirement (lorem ipsum) peut être utilisé dans vos
                      maquettes (webdesign, sites internet, livres, affiches...) gratuitement. Ce
                      texte est entièrement libre de droit. Ce texte généré aléatoirement (lorem
                      ipsum) peut être utilisé dans vos maquettes (webdesign, sites internet,
                      livres, affiches...) gratuitement. Ce texte est entièrement libre de droit.
                    </CCardText>
                  </CCol>
                </CRow>
              </CListGroupItem>
            </CListGroup>
          </CListGroupItem>
        </CListGroup>
      </CCard>
      {messages[0] && (
        <ModalMessage
          openModal={openMessage}
          setOpenModal={setOpenMessage}
          dataMessage={messages[0]}
        />
      )}
    </>
  )
}

MessagesView.propTypes = {
  messages: PropTypes.shape({
    messages: PropTypes.array,
  }),
}

export default MessagesView
