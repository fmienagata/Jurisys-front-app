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
  CModal,
  CModalHeader,
  CModalTitle,
  CForm,
  CModalBody,
  CInputGroup,
  CHeaderText,
  CFormInput,
  CFormSelect,
  CModalFooter,
  CFormTextarea,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import PropTypes from 'prop-types'
import ModalMessage from '../../../components/ModalMessage'
import { addMessage, addMessageFiles, deleteMessage } from '../../../services/messagesService'
import { useMessageContext } from 'src/Context/MessageContext'
import { useQueryClient } from 'react-query'
import ModalAction from 'src/components/ModalAction'
import dayjs from 'dayjs'

import moment from 'moment'
import { Controller, useForm } from 'react-hook-form'
import { useGetAllDossiers } from 'src/services/dossiersService'
import { handleErrorResponse } from 'src/utils/handleErrorResponse'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/Context/AuthContext'
import { useGetAllMessagesTypes } from 'src/services/messagesTypesService'

const MessagesView = ({ messages, isDashboard, setListPJ, setOpenModalPJ, setTitleModal }) => {
  const { displaySuccess, displayError } = useMessageContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { disconnect } = useAuth()
  const [openMessage, setOpenMessage] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [IDDelete, setIDDelete] = useState('')
  const [keyForModal, setKeyForModal] = useState(0)
  const [visible, setVisible] = useState(false) // État pour contrôler la visibilité du modal
  const [files, setFiles] = useState([]) // État pour gérer les fichiers sélectionnés
  const [selectedMessageType, setSelectedMessageType] = useState('')

  const { control, handleSubmit, reset, setValue } = useForm()
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
  const { dossiers, isLoading: loadingDossiers } = useGetAllDossiers({
    onError: (error) => {
      handleErrorResponse(error, disconnect, displayError, navigate)
    },
  })
  const {
    dataMessagesTypes: messagesTypes,
    isLoading,
    refetch,
  } = useGetAllMessagesTypes({
    onError: (error) => {
      displayError('Erreur lors de la requête dans le composant !')
    },
  })
  const handleSend = async (data) => {
    if (data.dateAudience) {
      if (typeof data.dateAudience === 'string' || data.dateAudience instanceof String) {
        const parsedDate = dayjs(data.dateAudience)
        if (parsedDate.isValid()) {
          data.dateAudience = parsedDate.toISOString()
        } else {
          data.dateAudience = new Date().toISOString()
        }
      } else if (data.dateAudience instanceof Date || dayjs.isDayjs(data.dateAudience)) {
        data.dateAudience = dayjs(data.dateAudience).toISOString()
      } else {
        data.dateAudience = new Date().toISOString()
      }
    } else {
      data.dateAudience = new Date().toISOString()
    }
    try {
      const result = await addMessage(data)
      if (files.length > 0) {
        handleSubmitFile(result.id)
      } else {
        displaySuccess('Ajout un message', 'Le message a bien été créé avec sucess')
        // invalidate navigate'
        queryClient.invalidateQueries(['getAllDossiers'])
        navigate('/messages/messaging')
      }
    } catch (error) {
      displayError(error.messages)
    }
    reset() // Réinitialiser le formulaire après l'envoi
    setFiles([]) // Réinitialiser les fichiers après l'envoi
    setVisible(false) // Fermer le modal après l'envoi
  }

  const handleSubmitFile = async (id) => {
    const form = new FormData()
    files.forEach((file, index) => {
      form.append(`file${index}`, file)
    })

    try {
      const response = await addMessageFiles(form, id)
      displaySuccess('Ajout un message', 'Le message a bien été créé avec sucess')
      queryClient.invalidateQueries(['getAllDossiers'])
      navigate('/messages/messaging')

      setFiles([])
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'envoi des fichiers:", error)
    }
  }

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files)
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
  }

  const handleFileRemove = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
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
              <CButton
                color="success"
                variant="ghost"
                size="sm"
                title="Ajouter un message"
                onClick={() => setVisible(true)} // Ouvrir le modal lorsque le bouton est cliqué
              >
                <CIcon icon={icon.cilLibraryAdd} size="sm" />
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CListGroup flush>
          {messages &&
            messages.map((item, key) => (
              <CListGroupItem key={key} style={{ borderBottom: '1px solid gray' }}>
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
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Envoyer un Message</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={handleSubmit(handleSend)} noValidate className="row g-3 needs-validation">
          <CModalBody>
            <CInputGroup className="mb-3">
              {!loadingDossiers && dossiers.length > 0 ? (
                <CCol>
                  <CHeaderText> Liste des references </CHeaderText>
                  <Controller
                    name="dossier"
                    control={control}
                    rules={{ required: 'Ce champs est requis' }}
                    defaultValue={dossiers.length > 0 ? dossiers[0].id : ''}
                    render={({ field, fieldState: { error } }) => (
                      <CFormSelect
                        id="dossier"
                        {...field}
                        invalid={Boolean(error)}
                        feedbackInvalid={error?.message}
                      >
                        {!loadingDossiers ? (
                          dossiers &&
                          dossiers.map((item, key) => (
                            <option value={item.id} key={key}>
                              {item.reference}
                            </option>
                          ))
                        ) : (
                          <CSpinner color="primary" variant="grow" />
                        )}
                      </CFormSelect>
                    )}
                  />
                </CCol>
              ) : (
                <CSpinner color="primary" variant="grow" />
              )}
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CHeaderText>
                  <b>Date et heure d&apos;audience</b>
                </CHeaderText>
                <Controller
                  name="dateAudience"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <CFormInput
                      {...field}
                      type="datetime-local"
                      id="dateAudience"
                      placeholder="Date et heure d'audience"
                      autoComplete="dateAudience"
                      invalid={Boolean(error)}
                      feedbackInvalid={error?.message}
                    />
                  )}
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol className="mb-2">
                <CHeaderText> Titre du message </CHeaderText>
                <Controller
                  name="titre"
                  defaultValue=""
                  rules={{ required: 'Ce champs est requis' }}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CFormInput
                      {...field}
                      id="titre"
                      placeholder="Titre du message"
                      invalid={Boolean(error)}
                      feedbackInvalid={error?.message}
                    />
                  )}
                />
              </CCol>
              <CInputGroup className="mb-3">
                <CCol className="mb-2">
                  <CHeaderText> Type du message </CHeaderText>
                  <Controller
                    name="typeMessage"
                    defaultValue=""
                    rules={{ required: 'Ce champs est requis' }}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <CFormInput
                        {...field}
                        id="typeMessage"
                        placeholder="Type du message"
                        invalid={Boolean(error)}
                        feedbackInvalid={error?.message}
                      />
                    )}
                  />
                </CCol>
              </CInputGroup>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CHeaderText> Liste des messages types </CHeaderText>
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CFormSelect
                      id="type"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setSelectedMessageType(e.target.value)
                        setValue('text', e.target.value)
                      }}
                    >
                      <option value="" key="key">
                        {' -- Selectionner un message -- '}
                      </option>
                      {!isLoading ? (
                        messagesTypes &&
                        messagesTypes.data.map((item, key) => (
                          <option value={item.text} key={key} id={key}>
                            {item.type}
                          </option>
                        ))
                      ) : (
                        <CSpinner color="primary" variant="grow" />
                      )}
                    </CFormSelect>
                  )}
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CHeaderText>
                  <b>Message</b>
                </CHeaderText>
                <Controller
                  name="text"
                  control={control}
                  rules={{ required: 'Ce champ est requis' }}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <CFormTextarea
                      {...field}
                      id="message"
                      placeholder="Message"
                      autoComplete="message"
                      rows={3}
                      invalid={Boolean(error)}
                      feedbackInvalid={error?.message}
                    />
                  )}
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CCol>
                <CHeaderText>
                  <b>Importer des fichiers</b>
                </CHeaderText>
                <CFormInput type="file" id="files" multiple onChange={handleFileChange} />
                <div className="mt-3">
                  {files.length > 0 && (
                    <ul>
                      {files.map((file, index) => (
                        <li key={index}>
                          {file.name}
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => handleFileRemove(index)}
                            className="ms-2"
                            variant="outline"
                          >
                            <CIcon icon={icon.cilTrash} size="sm" />
                            Supprimer
                          </CButton>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </CCol>
            </CInputGroup>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="success">
              Envoyer
            </CButton>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Annuler
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
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
