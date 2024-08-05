import React, { useState, useRef, forwardRef } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
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

import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useMessageContext } from 'src/Context/MessageContext'
import { useGetAllMessagesTypes } from 'src/services/messagesTypesService'
import { useGetAllDossiers } from 'src/services/dossiersService'
import { addMessage, addMessageFiles } from 'src/services/messagesService'
import { handleErrorResponse } from '../../../utils/handleErrorResponse'
import { useAuth } from 'src/Context/AuthContext'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

// import DateTimePicker from 'react-datetime-picker'
// import 'react-datetime-picker/dist/DateTimePicker.css'
// import 'react-calendar/dist/Calendar.css'
// import 'react-clock/dist/Clock.css'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import TextField from '@mui/material/TextField'
dayjs.locale('fr')

const DateTimePickerWrapper = forwardRef(function DateTimePickerWrapper(props, ref) {
  return <DateTimePicker {...props} ref={ref} />
})

DateTimePickerWrapper.displayName = 'DateTimePickerWrapper'
const CreateMessagesDossier = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, setValue } = useForm()
  const { disconnect } = useAuth()

  const { displaySuccess, displayError } = useMessageContext()
  const queryClient = useQueryClient()
  const fileInputRef2 = useRef(null)

  const defaultDate = new Date()

  //  const [value, onChange] = useState(defaultDate)
  const [valueDate, setValueDate] = React.useState(dayjs('2022-04-07'))
  const [files, setFiles] = useState([])
  const [filesLen, setFilesLen] = useState(0)

  const formattedValue = valueDate.toISOString()

  const [selectedMessageType, setSelectedMessageType] = useState('')

  const {
    dataMessagesTypes: messagesTypes,
    isLoading,
    refetch,
  } = useGetAllMessagesTypes({
    onError: (error) => {
      displayError('Erreur lors de la requête dans le composant !')
    },
  })

  const { dossiers, isLoading: loadingDossiers } = useGetAllDossiers({
    onError: (error) => {
      handleErrorResponse(error, disconnect, displayError, navigate)
    },
  })

  const handleCreateMessage = async (data) => {
    if (data.dateAudience === undefined) {
      data.dateAudience = new Date().toISOString()
    } else {
      const formattedDate = data.dateAudience.toISOString()
      data.dateAudience = formattedDate
    }
    if (data.text === undefined) {
      data.text = ''
    }
    console.log('Create message', data)
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

  const handleRemoveFile = (index, e) => {
    e.preventDefault()
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
    setFilesLen(files.length)
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    fileInputRef2.current.click()
  }

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles([...files, ...newFiles])
    setFilesLen(files.length)
  }

  return (
    <div>
      <CContainer>
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <CForm onSubmit={handleSubmit(handleCreateMessage)}>
              <CRow className="justify-content-center">
                <p className="text-body-secondary">Ajouter un message pour un dossier</p>
              </CRow>
              <CRow className="justify-content-center">
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
                              {' -- Selectionner un messages -- '}
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
                    <CButton type="submit" color="success">
                      Ajouter
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  )
}

export default CreateMessagesDossier
