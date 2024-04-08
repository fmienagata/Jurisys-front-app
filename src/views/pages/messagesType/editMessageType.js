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
import { useNavigate, useLocation } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import { useMessageContext } from 'src/Context/MessageContext'
import { updateMessageType } from 'src/services/messagesTypesService'

const EditMessageType = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { displaySuccess, displayError } = useMessageContext()
  const queryClient = useQueryClient()

  const handleCreateMessagesTypes = async (data) => {
    try {
      await updateMessageType(state.data.id, data)
      displaySuccess('Mise à jours ', 'Le message a bien été créé avec sucess')
      queryClient.invalidateQueries(['getAllMsgsType'])
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
                  <p className="text-body-secondary">Modifier un message pré-rédigés</p>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Titre </CHeaderText>
                      <Controller
                        name="type"
                        control={control}
                        defaultValue={state.data.type}
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
                        defaultValue={state.data.text}
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
                      Modifier
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

export default EditMessageType
