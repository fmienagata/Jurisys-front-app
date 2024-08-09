import React, { useEffect, useState } from 'react'
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
  CSpinner,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useMessageContext } from 'src/Context/MessageContext'
import { addFacture } from 'src/services/factureService'
import { useGetAllUsers } from '../../../services/usersService'
import { useGetAllDossiers } from '../../../services/dossiersService'
import { useQueryClient } from 'react-query'
import { handleErrorResponse } from '../../../utils/handleErrorResponse'

const AddFacture = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { displaySuccess, displayError } = useMessageContext()
  const [users, setUsers] = useState([])
  const [dossiersData, setDossiersData] = useState([])
  const queryClient = useQueryClient()

  const { data: dataUsers, isLoading } = useGetAllUsers({
    onSuccess: (dataUsers) => {
      setUsers(dataUsers.data)
    },
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
      )
    },
  })

  const { dossiers, isLoading: isLoadingDossiers } = useGetAllDossiers({
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
      )
    },
  })

  const handleAddFacture = async (data) => {
    try {
      await addFacture(data)
      displaySuccess('Ajout une facture', 'La facture a bien été créé avec sucess')
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
                <form onSubmit={handleSubmit(handleAddFacture)}>
                  {/* <h1>{labels.registre.titleHeader}</h1> */}
                  <p className="text-body-secondary">Ajouter une facture</p>

                  {!isLoading && dataUsers.data.length > 0 ? (
                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText>
                          {' '}
                          <b>Nom de l&apos;utilisateur</b>{' '}
                        </CHeaderText>
                        <Controller
                          name="user"
                          control={control}
                          rules={{ required: 'Ce champs est requis' }}
                          defaultValue={users.length > 0 ? users[0].id : ''}
                          render={({ field, fieldState: { error } }) => (
                            <CFormSelect id="user" {...field}>
                              {dataUsers.data.map((item, key) => (
                                <option value={item.id} key={key}>
                                  {item.nom}
                                </option>
                              ))}
                            </CFormSelect>
                          )}
                        />
                      </CCol>
                    </CInputGroup>
                  ) : (
                    isLoading && <CSpinner color="primary" variant="grow" />
                  )}

                  {!isLoadingDossiers && dossiers.length > 0 ? (
                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText>
                          {' '}
                          <b>Référence du dossier</b>{' '}
                        </CHeaderText>
                        <Controller
                          name="dossier"
                          control={control}
                          defaultValue={dossiers.length > 0 ? dossiers[0].id : ''}
                          render={({ field }) => (
                            <CFormSelect id="dossier" {...field}>
                              {dossiers.map((item, key) => (
                                <option value={item.id} key={key}>
                                  {item.reference}
                                </option>
                              ))}
                            </CFormSelect>
                          )}
                        />
                      </CCol>
                    </CInputGroup>
                  ) : (
                    isLoadingDossiers && <CSpinner color="primary" variant="grow" />
                  )}
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Montant en FCFA</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="montant"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="montant"
                            placeholder="montant"
                            autoComplete="montant"
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
                        {' '}
                        <b>Statut</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="statut"
                        control={control}
                        defaultValue="Payer"
                        render={({ field }) => (
                          <CFormSelect id="statut" {...field}>
                            <option value="Payée">Payée</option>
                            <option value="Envoyée">Envoyée</option>
                            <option value="Annulée">Annulée</option>
                          </CFormSelect>
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Ajouter
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

export default AddFacture
