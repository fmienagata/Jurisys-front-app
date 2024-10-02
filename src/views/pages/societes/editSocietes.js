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
  CRow,
  CInputGroupText,
  CFormSelect,
} from '@coreui/react'
import { useNavigate, useLocation } from 'react-router-dom'

import { updateSociete } from 'src/services/societeService'
import { useMessageContext } from 'src/Context/MessageContext'
import { useQueryClient } from 'react-query'

const EditSociete = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { displaySuccess, displayError } = useMessageContext()
  const { control, handleSubmit } = useForm()

  const handleEditSociete = async (data) => {
    try {
      await updateSociete(state.data.id, data)
      displaySuccess('Societe', 'Societe a été bien mis à jour avec sucess')
      queryClient.invalidateQueries(['getAllSocietes'])
      navigate('/societes')
    } catch (error) {
      displayError(error.messages)
      navigate('/societes')
    }
  }

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <form onSubmit={handleSubmit(handleEditSociete)}>
                  {/* <h1>{labels.registre.titleHeader}</h1> */}
                  <p className="text-body-secondary">Modifier une entreprise</p>

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Nom de l entreprise</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="nomSociete"
                        control={control}
                        defaultValue={state.data.nomSociete}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="nomSociete"
                            placeholder={`Nom de l'entreprise`}
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Type</b>{' '}
                      </CHeaderText>
                      {/* <Controller
                        name="type"
                        control={control}
                        defaultValue={state.data.type ? state.data.type : 'type'}
                        render={({ field }) => (
                          <CFormInput {...field} id="type" placeholder={`type`} />
                        )}
                      /> */}
                      <Controller
                        name="type"
                        control={control}
                        defaultValue={state.data.type}
                        render={({ field, fieldState: { error } }) => (
                          <CFormSelect
                            id="floatingSelect"
                            {...field}
                            aria-label="Small select example"
                            floatingClassName="pt-2"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          >
                            <option value="Société">Société</option>
                            <option value="Particulier">Particulier</option>
                          </CFormSelect>
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        <b>Pays</b>
                      </CHeaderText>
                      <Controller
                        name="pays"
                        control={control}
                        defaultValue={state.data.pays}
                        render={({ field }) => (
                          <CFormInput {...field} id="pays" placeholder="pays" autoComplete="pays" />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>ville</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="ville"
                        control={control}
                        defaultValue={state.data.ville}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="ville"
                            placeholder="Ville"
                            autoComplete="Ville"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Adresse</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="adresse"
                        control={control}
                        defaultValue={state.data.adresse}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="adresse"
                            placeholder="Adresse"
                            autoComplete="Adresse"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  {/* <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Code Postal </CHeaderText>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <CFormInput {...field} id="code" placeholder="Code Postal" />
                        )}
                      />
                    </CCol>
                  </CInputGroup> */}

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Téléphone</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="telephone"
                        control={control}
                        defaultValue={state.data.telephone}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="telephone"
                            placeholder="telephone"
                            autoComplete="telephone"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Fax</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="fax"
                        control={control}
                        defaultValue={state.data.fax ? state.data.fax : '0000'}
                        render={({ field }) => (
                          <CFormInput {...field} id="fax" placeholder="Fax" autoComplete="Fax" />
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Modifier
                    </CButton>
                  </div>
                </form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default EditSociete
