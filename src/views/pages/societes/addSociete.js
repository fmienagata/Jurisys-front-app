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
  const { control, handleSubmit } = useForm()
  const { displaySuccess, displayError } = useMessageContext()
  const queryClient = useQueryClient()

  const handleAddSociete = async (data) => {
    try {
      await addSociete(data)
      displaySuccess("Ajout d'une entreprise", "L'entreprise a bien été créé avec sucess")
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
                  <p className="text-body-secondary">Ajouter une entreprise</p>

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        <b>{`Nom de l'entreprise`}</b>
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
                            placeholder={`Nom de l'entreprise`}
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
                        <b>Type d&apos;entreprise</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="type"
                        control={control}
                        defaultValue="Société"
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
                      {/* <Controller
                        name="type"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="type"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                            placeholder="type"
                            autoComplete="type"
                          />
                        )}
                      /> */}
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
                        rules={{ required: 'Ce champs est requis' }}
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
                        rules={{ required: 'Ce champs est requis' }}
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
                        rules={{ required: 'Ce champs est requis' }}
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
                        <b>Téléphone</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="telephone"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Ce champs est requis' }}
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
                        <b>Fax</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="fax"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="fax"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                            placeholder="Fax"
                            autoComplete="Fax"
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
