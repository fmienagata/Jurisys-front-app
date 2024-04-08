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
import { deleteMessage } from '../../../services/messagesService'
import { useMessageContext } from 'src/Context/MessageContext'
import { useQueryClient } from 'react-query'
import ModalAction from 'src/components/ModalAction'

import moment from 'moment'

const MessagesView = ({ messages, isDashboard, setListPJ, setOpenModalPJ, setTitleModal }) => {
  const { displaySuccess, displayError } = useMessageContext()
  const queryClient = useQueryClient()

  const [openMessage, setOpenMessage] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [IDDelete, setIDDelete] = useState('')
  const [keyForModal, setKeyForModal] = useState(0)
  const title = isDashboard ? 'Derniers messages' : 'Listes des messages'

  function deleteMessageID(id) {
    setIDDelete(id)
    setOpenModalDelete(true)
  }

  const deleteMessageAction = async () => {
    setOpenModalDelete(false)
    try {
      await deleteMessage(IDDelete)
      displaySuccess('Supprimer un  message', 'Le message est supprimé avec  sucess')
      queryClient.invalidateQueries(['getOneDossier'])
    } catch (error) {
      displayError('Supprimer un message', error.messages)
    }
  }
  return (
    <>
      <CCard>
        <CCardHeader className="text-center">
          <CRow>
            <CCol className="text-start" xs={6}>
              <CCardTitle>
                <small>{title}</small>
              </CCardTitle>
            </CCol>
            {/* <CCol className="text-center" xs={3}></CCol> */}
            <CCol className="text-end" xs={6}>
              <CButton color="success" variant="ghost" size="sm" title="Ajouter un message">
                <CIcon icon={icon.cilFolderOpen} size="sm" />
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
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
                        <CButton
                          color="success"
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMessageID(item.id)}
                        >
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
        </CListGroup>
      </CCard>
      <ModalAction
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        titleModal={'Supprimer un  message'}
        messageModal={'Voulez vous vraiment le supprimer ?'}
        action={
          <CButton color="danger" onClick={() => deleteMessageAction()}>
            Supprimer
          </CButton>
        }
      />
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
