import React from 'react'
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
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import { useMessageContext } from 'src/Context/MessageContext'
import { addMessageType } from 'src/services/messagesTypesService'
import { handleErrorResponse } from '../../../utils/handleErrorResponse'
import { useAuth } from 'src/Context/AuthContext'

const CreateMessageType = () => {
  const navigate = useNavigate()
  const { disconnect } = useAuth()

  const { control, handleSubmit } = useForm()
  const { displaySuccess, displayError } = useMessageContext()
  const queryClient = useQueryClient()

  const handleCreateMessagesTypes = async (data) => {
    try {
      await addMessageType(data)
      queryClient.invalidateQueries(['getAllMsgsType'])
      displaySuccess(`L'Ajout d'un message type `, 'Le message a bien été créé avec sucess')
      navigate('/messages/prewritten')
    } catch (error) {
      handleErrorResponse(error, disconnect, displayError, navigate)
    }
  }

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={8}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit(handleCreateMessagesTypes)}>
                  <p className="text-body-secondary">Ajouter un message pré-rédigés</p>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Titre </CHeaderText>
                      <Controller
                        name="type"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Ce champs est requis' }}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="type"
                            placeholder="Libellé du message à renseigner"
                            autoComplete="Libellé du message à renseigner"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
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
                        defaultValue=""
                        rules={{ required: 'Ce champs est requis' }}
                        render={({ field, fieldState: { error } }) => (
                          <CFormTextarea
                            {...field}
                            id="text"
                            placeholder="Contenu du message à renseigner"
                            autoComplete="text"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
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
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default CreateMessageType
