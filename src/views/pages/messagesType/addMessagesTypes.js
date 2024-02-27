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

import { useMessageContext } from 'src/Context/MessageContext'
import { addMessageType } from 'src/services/messagesTypesService'

const CreateMessageType = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { displaySuccess, displayError } = useMessageContext()

  const handleCreateMessagesTypes = async (data) => {
    console.log('new message call API ', data)
    try {
      await addMessageType(data)
      displaySuccess('Le message a bien été créé avec sucess')
      navigate('/messages/prewritten')
    } catch (error) {
      displayError(error.messages)
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
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="type"
                            placeholder="Libellé du message à renseigner"
                            autoComplete="Libellé du message à renseigner"
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
                        render={({ field }) => (
                          <CFormTextarea
                            {...field}
                            id="text"
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
