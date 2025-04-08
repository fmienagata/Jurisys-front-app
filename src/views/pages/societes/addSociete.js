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
  CInputGroupText,
  CFormSelect,
  CHeaderText,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

import { addSociete } from 'src/services/societeService'
import { useMessageContext } from 'src/Context/MessageContext'
import { useQueryClient } from 'react-query'

const AddSociete = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      type: 'Particulier',
    },
  })
  const { displaySuccess, displayError } = useMessageContext()
  const queryClient = useQueryClient()
  const selectedType = watch('type')

  const handleAddSociete = async (data) => {
    try {
      await addSociete(data)
      displaySuccess("Ajout d'un client", 'Le client a bien été créé avec sucess')
      queryClient.invalidateQueries(['getAllSocietes'])
      queryClient.invalidateQueries(['getCountNBRBusiness'])
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
                <form onSubmit={handleSubmit(handleAddSociete)}>
                  {/* <h1>{labels.registre.titleHeader}</h1> */}
                  <p className="text-body-secondary">Ajouter un client</p>

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        <b>{`Nom du client`}</b>
                      </CHeaderText>
                      <Controller
                        name="nomSociete"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="nomSociete"
                            placeholder={`Nom du client`}
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
                        <b>Type de client</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="type"
                        control={control}
                        defaultValue="Particulier"
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
                            {' '}
                            <b>Forme juridique</b>{' '}
                          </CHeaderText>
                          <Controller
                            name="denominationSociale"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue=""
                            render={({ field, fieldState: { error } }) => (
                              <CFormInput
                                {...field}
                                id="denominationSociale"
                                placeholder="Forme juridique"
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
                            <b>Capital social</b>{' '}
                          </CHeaderText>
                          <Controller
                            name="capitalSocial"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue=""
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
                      {/* 
                      <CInputGroup className="mb-3">
                        <CCol>
                          <CHeaderText>
                            {' '}
                            <b>Registre de Commerce</b>{' '}
                          </CHeaderText>
                          <Controller
                            name="registrecommerce"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue=""
                            render={({ field, fieldState: { error } }) => (
                              <CFormInput
                                {...field}
                                id="registrecommerce"
                                placeholder="Registre de Commerce"
                                autoComplete="Registre de Commerce"
                                invalid={Boolean(error)}
                                feedbackInvalid={error?.message}
                              />
                            )}
                          />
                        </CCol>
                      </CInputGroup> */}

                      <CInputGroup className="mb-3">
                        <CCol>
                          <CHeaderText>
                            {' '}
                            <b>Crédit Mobilier (RCCM)</b>{' '}
                          </CHeaderText>
                          <Controller
                            name="rccm"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue=""
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
                            {' '}
                            <b>{`Numéro d'identification unique (NIU)`}</b>{' '}
                          </CHeaderText>
                          <Controller
                            name="nui"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue=""
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
                            {' '}
                            <b>Nationalité</b>{' '}
                          </CHeaderText>
                          <Controller
                            name="nationalite"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue=""
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
                            {' '}
                            <b>Etat civil</b>{' '}
                          </CHeaderText>
                          <Controller
                            name="etatCivil"
                            control={control}
                            rules={{ required: 'Ce champs est requis' }}
                            defaultValue=""
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
                        {' '}
                        <b>Téléphone</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="telephone"
                        control={control}
                        defaultValue=""
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
                        {' '}
                        <b>Ville</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="ville"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="ville"
                            placeholder="Ville"
                            autoComplete="Ville"
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
                        <b>Pays</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="pays"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="pays"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                            placeholder="Pays"
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
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="adresse"
                            placeholder="Adresse"
                            autoComplete="Adresse"
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
                        <b>B.P. (Boite Postale)</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="fax"
                        control={control}
                        // rules={{ required: 'Ce champs est requis' }}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="fax"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                            placeholder="B.P. (Boite Postale)"
                            autoComplete="B.P. (Boite Postale)"
                          />
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

export default AddSociete
