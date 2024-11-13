import React, { useRef, useState } from 'react'
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CInputGroup,
  CHeaderText,
  CForm,
  CFormTextarea,
  CRow,
  CFormSelect,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

import PropTypes from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import { useGetAllMessagesTypes } from 'src/services/messagesTypesService'
import { addMessage, addMessageFiles } from 'src/services/messagesService'

import { useMessageContext } from 'src/Context/MessageContext'
import { useAuth } from 'src/Context/AuthContext'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import TextField from '@mui/material/TextField'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const ModalNewMessageDossier = (props) => {
  const { openModal, setOpenModal, dataDossier, refresh, action } = props
  const { user } = useAuth()

  // eslint-disable-next-line react/prop-types
  const { displaySuccess, displayError } = useMessageContext()
  const [loading, setLoading] = useState(false)
  const fileInputRef2 = useRef(null)

  const { control, handleSubmit, setValue, reset } = useForm()

  const [valueDate, setValueDate] = React.useState(dayjs('2022-04-07'))
  const [files, setFiles] = useState([])
  const [filesLen, setFilesLen] = useState(0)
  const [selectedMessageType, setSelectedMessageType] = useState('')

  const { dataMessagesTypes: messagesTypes, isLoading } = useGetAllMessagesTypes({
    onError: (error) => {
      displayError('Erreur lors de la requête dans le composant !')
    },
  })

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles([...files, ...newFiles])
    setFilesLen(files.length)
  }

  const handleRemoveFile = (index, e) => {
    e.preventDefault()
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
    setFilesLen(files.length)
  }

  const handleSubmitFile = async (id) => {
    const form = new FormData()
    files.forEach((file, index) => {
      form.append(`file${index}`, file)
    })

    try {
      const response = await addMessageFiles(form, id)
      refresh()
      displaySuccess('Ajout un message', 'Le message a bien été créé avec sucess')
      setOpenModal(false)

      setFiles([])
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'envoi des fichiers:", error)
    } finally {
      setLoading(false) // Arrêter le spinner après l'attente
    }
  }

  const handleCreateMessage = async (data) => {
    setLoading(true)
    if (data.dateAudience === undefined) {
      data.dateAudience = new Date().toISOString()
    } else {
      const formattedDate = data.dateAudience.toISOString()
      data.dateAudience = formattedDate
    }
    if (data.text === undefined) {
      data.text = ''
    }
    data.typeMessage = user.roles === 'ROLE_AVOCAT' ? true : false

    data.dossier = dataDossier.id
    try {
      const result = await addMessage(data)

      if (files.length > 0) {
        handleSubmitFile(result.id)
      } else {
        refresh()
        displaySuccess('Ajout un message', 'Le message a bien été créé avec sucess')
        setOpenModal(false)
      }
      reset()
    } catch (error) {
      displayError(error.messages)
    } finally {
      setOpenModal(false)
      setLoading(false) // Arrêter le spinner après l'attente
    }
  }

  return (
    <>
      <CModal
        visible={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="VerticallyCenteredExample"
        alignment="center"
        size="xl"
      >
        <CModalHeader>
          <CModalTitle>Envoyer un message</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="justify-content-center mb-2">
            <CCol sm="5" className="text-start">
              {'Prénom '}
              <b>{dataDossier.prenom}</b>
            </CCol>

            <CCol sm="5">
              {'Type de dossier '} <b>{dataDossier.typeProcedure}</b>{' '}
            </CCol>
            <CCol sm="5" className="text-start">
              {'Nom '}
              <b>{dataDossier.nom}</b>
            </CCol>

            <CCol sm="5" className="text-start">
              {'Référence'} <b>{dataDossier.reference}</b>
            </CCol>
          </CRow>

          {loading && <CSpinner color="danger" variant="grow" />}

          {!loading && (
            <CForm onSubmit={handleSubmit(handleCreateMessage)}>
              <CRow className="justify-content-center ">
                <CCol sm="5">
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
                  {/* <CCol className="mb-2">
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
                  </CCol> */}

                  <CCol>
                    <CInputGroup className="mb-4"></CInputGroup>
                    <CHeaderText>{"Sélectionner une date et l'heure de l'audience"}</CHeaderText>
                    <CInputGroup className="mb-2"></CInputGroup>
                    <Controller
                      name="dateAudience"
                      control={control}
                      // defaultValue={defaultDate}
                      render={({ field, fieldState: { error } }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs} size="small">
                          <DateTimePicker
                            size="small"
                            format="DD/MM/YYYY HH:mm"
                            renderInput={(props) => <TextField size="small" {...props} />}
                            placeholder="Sélectionner une date et une heure"
                            {...field}
                          />
                        </LocalizationProvider>
                      )}
                    />

                    <CRow>
                      <div>
                        <CInputGroup className="mb-2"></CInputGroup>
                        <h6>Importer des fichiers</h6>

                        <CFormInput
                          type="file"
                          ref={fileInputRef2}
                          onChange={handleFileChange}
                          multiple
                        />

                        <span>
                          {files.length} fichier{files.length !== 1 ? 's' : ''} sélectionné
                          {files.length !== 1 ? 's' : ''}
                        </span>

                        <div>
                          <ul>
                            {files.map((file, index) => (
                              <li key={index}>
                                {file.name} -{' '}
                                <CButton
                                  onClick={(e) => handleRemoveFile(index, e)}
                                  variant="outline"
                                  color="danger"
                                  size="sm"
                                >
                                  <CIcon icon={icon.cilTrash} size="sm" /> Supprimer
                                </CButton>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CRow>
                  </CCol>
                </CCol>
                <CCol sm="5">
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
                      <CHeaderText> Message </CHeaderText>
                      <Controller
                        name="text"
                        control={control}
                        render={({ field }) => (
                          <CFormTextarea
                            {...field}
                            id="text"
                            defaultValue={''}
                            value={selectedMessageType !== 'undefined' ? selectedMessageType : ''}
                            onChange={(e) => {
                              field.onChange(e)
                              setSelectedMessageType(e.target.value)
                            }}
                            placeholder="Contenu du message à renseigner"
                            autoComplete="text"
                            rows={8}
                          ></CFormTextarea>
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="success" disabled={loading}>
                      Ajouter
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CForm>
          )}
        </CModalBody>
        {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setOpenModal(false)}>
            Fermer
          </CButton>
          {action}
        </CModalFooter> */}
      </CModal>
    </>
  )
}

ModalNewMessageDossier.propTypes = {
  dataDossier: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    typeProcedure: PropTypes.string,
    reference: PropTypes.string,
    messageFiles: PropTypes.array,
    dossier: PropTypes.string,
    dateAudience: PropTypes.string,
    prenom: PropTypes.string,
    nom: PropTypes.string,
  }).isRequired,
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  action: PropTypes.func,
  refresh: PropTypes.func,
}

export default ModalNewMessageDossier
