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
  CFormSelect,
} from '@coreui/react'
import { useMessageContext } from 'src/Context/MessageContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { updateFacture } from 'src/services/factureService'
import { useQueryClient } from 'react-query'

const EditFacture = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { displaySuccess, displayError } = useMessageContext()

  const { control, handleSubmit } = useForm()

  const handleEditFacture = async (data) => {
    try {
      await updateFacture(state.data.id, data)
      displaySuccess('La facture a bien été mis à jour avec sucess')
      queryClient.invalidateQueries(['getAllFactures'])
      navigate('/factures')
    } catch (error) {
      displayError(error.messages)
      navigate('/factures')
    }
  }

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <form onSubmit={handleSubmit(handleEditFacture)}>
                  {/* <h1>{labels.registre.titleHeader}</h1> */}
                  <p className="text-body-secondary">Modifier une facture</p>

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Nom de l utilisateur</b>{' '}
                      </CHeaderText>
                      <CFormInput
                        id="user"
                        value={state.data.user}
                        placeholder="Nom de l'utilisateur"
                        disabled
                      />
                      {/* <Controller
                        name="user"
                        control={control}
                        defaultValue={state.data.user}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="user"
                            placeholder="Nom de l'utilisateur"
                            disabled
                          />
                        )}
                      /> */}
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Dossier</b>{' '}
                      </CHeaderText>
                      <CFormInput
                        id="dossier"
                        placeholder="dossier"
                        autoComplete="dossier"
                        value={state.data.dossier}
                        disabled
                      />
                      {/* <Controller
                        name="dossier"
                        control={control}
                        defaultValue={state.data.dossier}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="dossier"
                            placeholder="dossier"
                            autoComplete="dossier"
                            disabled
                          />
                        )}
                      /> */}
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Montant</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="montant"
                        control={control}
                        defaultValue={state.data.montant}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="montant"
                            placeholder="montant"
                            autoComplete="montant"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    {/* <CCol>
                      <CHeaderText> statut </CHeaderText>
                      <Controller
                        name="statut"
                        control={control}
                        defaultValue={state.data.statut}
                        render={({ field }) => (
                          <CFormInput {...field} id="statut" placeholder="statut" />
                        )}
                      />
                    </CCol> */}
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>statut</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="statut"
                        control={control}
                        defaultValue={state.data.statut}
                        render={({ field }) => (
                          <CFormSelect id="statut" {...field}>
                            <option value="Payer">Payer</option>
                            <option value="Envoyée">Envoyée</option>
                            <option value="Annulée">Annulée</option>
                          </CFormSelect>
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

export default EditFacture
