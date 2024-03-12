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
  CHeaderText,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

import { addSociete } from 'src/services/societeService'
import { useMessageContext } from 'src/Context/MessageContext'

const AddSociete = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { displaySuccess, displayError } = useMessageContext()

  const handleAddSociete = async (data) => {
    console.log('handleAddSociete call API ', data)
    try {
      await addSociete(data)
      displaySuccess("L'utilisateur a bien été créé avec sucess")
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
                  <p className="text-body-secondary">Ajouter une societe</p>

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Nom de la société/Syndic </CHeaderText>
                      <Controller
                        name="nom"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <CFormInput {...field} id="nom" placeholder="Nom de la société/Syndic" />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Ville </CHeaderText>
                      <Controller
                        name="ville"
                        control={control}
                        defaultValue=""
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
                      <CHeaderText> Adresse </CHeaderText>
                      <Controller
                        name="adresse"
                        control={control}
                        defaultValue=""
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
                      <CHeaderText> Code Postal </CHeaderText>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <CFormInput {...field} id="code" placeholder="Code Postal" />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CRow>
                        <CHeaderText> Email </CHeaderText>
                      </CRow>
                      <CRow>
                        <CInputGroup className="mb-0">
                          <CInputGroupText>@</CInputGroupText>
                          <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <CFormInput
                                {...field}
                                id="email"
                                placeholder="Email"
                                autoComplete="email"
                              />
                            )}
                          />
                        </CInputGroup>
                      </CRow>
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Téléphone </CHeaderText>
                      <Controller
                        name="téléphone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="téléphone"
                            placeholder="Téléphone"
                            autoComplete="Téléphone"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Fax </CHeaderText>
                      <Controller
                        name="fax"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <CFormInput {...field} id="fax" placeholder="Fax" autoComplete="Fax" />
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
