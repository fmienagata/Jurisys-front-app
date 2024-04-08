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

  const { data, isLoading } = useGetAllUsers({
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
    onSuccess: (data) => {
      setDossiersData(data)
    },
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
      )
    },
  })

  useEffect(() => {
    if (!isLoadingDossiers && dossiers) {
      setDossiersData(dossiers)
    } else {
      queryClient.invalidateQueries(['getAllDossiers'])
    }
  }, [isLoadingDossiers, dossiers, queryClient])

  useEffect(() => {
    if (!isLoading && data) {
      setUsers(data.data)
    } else {
      queryClient.invalidateQueries(['getAllUsers'])
    }
  }, [isLoading, data, queryClient])

  const handleAddFacture = async (data) => {
    try {
      await addFacture(data)
      displaySuccess('Ajout une facture', 'La facture a bien été créé avec sucess')
      // navigate('/factures')
    } catch (error) {
      displayError(error.messages)
      //navigate('/factures')
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

                  {!isLoading && users.length > 0 ? (
                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText> Nom de l utilisateur </CHeaderText>
                        <Controller
                          name="user"
                          control={control}
                          defaultValue={users.length > 0 ? users[0].id : ''}
                          render={({ field }) => (
                            <CFormSelect id="user" {...field}>
                              {users.map((item, key) => (
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

                  {/* <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Nom de l utilisateur </CHeaderText>
                      <Controller
                        name="user"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <CFormInput {...field} id="user" placeholder="Nom de l'utilisateur" />
                        )}
                      />
                    </CCol>
                  </CInputGroup> */}

                  {!isLoadingDossiers && dossiersData.length > 0 ? (
                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText> Dossier </CHeaderText>
                        <Controller
                          name="dossier"
                          control={control}
                          defaultValue={dossiersData.length > 0 ? dossiersData[0].id : ''}
                          render={({ field }) => (
                            <CFormSelect id="dossier" {...field}>
                              {dossiersData.map((item, key) => (
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
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Montant </CHeaderText>
                      <Controller
                        name="montant"
                        control={control}
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
                    <CCol>
                      <CHeaderText> statut </CHeaderText>
                      <Controller
                        name="statut"
                        control={control}
                        defaultValue="Payer"
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
