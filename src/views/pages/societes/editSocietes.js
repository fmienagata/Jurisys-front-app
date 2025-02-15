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
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      type: state.data.type,
    },
  })

  const selectedType = watch('type')

  const handleEditSociete = async (data) => {
    //if true do nothing
    //else // changer les champs :
    if (data.type !== state.data.type) {
      if (data.type === 'Particulier') {
        data.denominationSociale = null
        data.nui = null
        data.rccm = null
        data.capitalSocial = null
      } else {
        data.nationalite = null
        data.etatCivil = null
      }
    }

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
                  <p className="text-body-secondary">Modifier un client</p>

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        <b>Nom du client</b>
                      </CHeaderText>
                      <Controller
                        name="nomSociete"
                        control={control}
                        defaultValue={state.data.nomSociete}
                        render={({ field }) => (
                          <CFormInput {...field} id="nomSociete" placeholder={`Nom du client`} />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        <b>Type de client</b>
                      </CHeaderText>
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

                  {selectedType === 'Société' && (
                    <>
                      <CInputGroup className="mb-3">
                        <CCol>
                          <CHeaderText>
                            <b>Dénomination sociale</b>
                          </CHeaderText>
                          <Controller
                            name="denominationSociale"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue={state.data.denominationSociale}
                            render={({ field, fieldState: { error } }) => (
                              <CFormInput
                                {...field}
                                id="denominationSociale"
                                placeholder="Dénomination sociale"
                                autoComplete="Dénomination sociale"
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
                            <b>Capital social</b>
                          </CHeaderText>
                          <Controller
                            name="capitalSocial"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue={state.data.capitalSocial}
                            render={({ field, fieldState: { error } }) => (
                              <CFormInput
                                {...field}
                                id="capitalSocial"
                                placeholder="Capital social"
                                autoComplete="Capital social"
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
                            <b>Crédit Mobilier (RCCM)</b>
                          </CHeaderText>
                          <Controller
                            name="rccm"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue={state.data.rccm}
                            render={({ field, fieldState: { error } }) => (
                              <CFormInput
                                {...field}
                                id="rccm"
                                placeholder="Crédit Mobilier (RCCM)"
                                autoComplete="Crédit Mobilier (RCCM)"
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
                            <b>{`Numéro d'identification unique (NIU)`}</b>
                          </CHeaderText>
                          <Controller
                            name="nui"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue={state.data.nui}
                            render={({ field, fieldState: { error } }) => (
                              <CFormInput
                                {...field}
                                id="nui"
                                placeholder="Numéro d'identification unique (NIU)"
                                autoComplete="Numéro d'identification unique (NIU)"
                                invalid={Boolean(error)}
                                feedbackInvalid={error?.message}
                              />
                            )}
                          />
                        </CCol>
                      </CInputGroup>
                    </>
                  )}
                  {selectedType === 'Particulier' && (
                    <>
                      <CInputGroup className="mb-3">
                        <CCol>
                          <CHeaderText>
                            <b>Nationalité</b>
                          </CHeaderText>
                          <Controller
                            name="nationalite"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue={state.data.nationalite}
                            render={({ field, fieldState: { error } }) => (
                              <CFormInput
                                {...field}
                                id="nationalite"
                                placeholder="Nationalité"
                                autoComplete="Nationalité"
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
                            <b>Etat civil</b>
                          </CHeaderText>
                          <Controller
                            name="etatCivil"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue={state.data.etatCivil}
                            render={({ field, fieldState: { error } }) => (
                              <CFormInput
                                {...field}
                                id="etatCivil"
                                placeholder="Etat civil"
                                autoComplete="Etat civil"
                                invalid={Boolean(error)}
                                feedbackInvalid={error?.message}
                              />
                            )}
                          />
                        </CCol>
                      </CInputGroup>
                    </>
                  )}

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        <b>Téléphone</b>
                      </CHeaderText>
                      <Controller
                        name="telephone"
                        control={control}
                        defaultValue={state.data.telephone}
                        rules={{
                          required: selectedType === 'Particulier' ? 'Ce champs est requis' : false, // Règle conditionnelle
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="telephone"
                            placeholder="Téléphone"
                            autoComplete="Téléphone"
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
                        <b>Ville</b>
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
                        <b>Adresse</b>
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

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        <b>B.P. (Boite Postale)</b>
                      </CHeaderText>
                      <Controller
                        name="fax"
                        control={control}
                        defaultValue={state.data.fax ? state.data.fax : '0000'}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="fax"
                            placeholder="B.P. (Boite Postale)"
                            autoComplete="B.P. (Boite Postale)"
                          />
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
