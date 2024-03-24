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
import moment from 'moment'

const MessagesView = ({ messages, isDashboard, setListPJ, setOpenModalPJ, setTitleModal }) => {
  const [openMessage, setOpenMessage] = useState(false)
  const [keyForModal, setKeyForModal] = useState(0)
  const title = isDashboard ? 'Derniers messages' : 'Listes des messages'
  return (
    <>
      <CCard>
        <CCardHeader className="text-center">{title}</CCardHeader>
        <CListGroup flush>
          {messages &&
            messages.map((item, key) => (
              <CListGroupItem key={key}>
                <CCardHeader className="text-center">
                  <CRow className="align-items-center">
                    <CCol className="text-start" xs={4}>
                      <CRow>
                        <small className="text-medium-emphasis">
                          {item.createdAt === null
                            ? '---'
                            : moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
                        </small>
                      </CRow>
                    </CCol>
                    <CCol className="text-start" xs={4}>
                      <CCardTitle>
                        <small>{item.type}</small>
                      </CCardTitle>
                    </CCol>
                    {!isDashboard && (
                      <CCol className="text-end" xs={4}>
                        {messages[key].messageFiles.length > 0 && (
                          <CButton
                            color="success"
                            variant="ghost"
                            size="sm"
                            title="Consulter les piéces jointes du message"
                            onClick={() => {
                              setKeyForModal(key)
                              //setOpenMessage(true)
                              setTitleModal('Listes des piéces jointes du message' + item.type)
                              setListPJ(messages[key].messageFiles)
                              setOpenModalPJ(true)
                            }}
                          >
                            <CIcon icon={icon.cilFolderOpen} size="sm" />
                          </CButton>
                        )}
                        <CButton color="success" variant="ghost" size="sm">
                          <CIcon icon={icon.cilTrash} size="sm" />
                        </CButton>
                      </CCol>
                    )}
                  </CRow>
                </CCardHeader>
                <CListGroup flush>
                  <CListGroupItem>
                    <CRow className="align-items-center">
                      <CCol className="text-start" xs={12}>
                        <CCardText
                          onDoubleClick={() => {
                            setKeyForModal(key)
                            setOpenMessage(true)
                          }}
                        >
                          {item.text}
                        </CCardText>
                      </CCol>
                    </CRow>
                  </CListGroupItem>
                </CListGroup>
              </CListGroupItem>
            ))}

          {/* <CListGroupItem>
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
                {!isDashboard && (
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
                )}
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
                {!isDashboard && (
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
                )}
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
                {!isDashboard && (
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
                )}
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
                {!isDashboard && (
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
                )}
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
                {!isDashboard && (
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
                )}
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
          </CListGroupItem> */}
        </CListGroup>
      </CCard>
      {!isDashboard && messages[keyForModal] && (
        <ModalMessage
          openModal={openMessage}
          setOpenModal={setOpenMessage}
          dataMessage={messages[keyForModal]}
        />
      )}
    </>
  )
}

MessagesView.propTypes = {
  isDashboard: PropTypes.bool,
  messages: PropTypes.array,
  setListPJ: PropTypes.func,
  setTitleModal: PropTypes.string,
  setOpenModalPJ: PropTypes.func,
}

export default MessagesView
