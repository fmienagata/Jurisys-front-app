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
import { useQueryClient } from 'react-query'

const AddSociete = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { displaySuccess, displayError } = useMessageContext()
  const queryClient = useQueryClient()

  const handleAddSociete = async (data) => {
    try {
      await addSociete(data)
      displaySuccess("L'utilisateur a bien été créé avec sucess")
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
                <form onSubmit={handleSubmit(handleAddSociete)}>
                  {/* <h1>{labels.registre.titleHeader}</h1> */}
                  <p className="text-body-secondary">Ajouter une entreprise</p>

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>{`Nom de l'entreprise`}</CHeaderText>
                      <Controller
                        name="nomSociete"
                        control={control}
                        defaultValue=""
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
                      <CHeaderText> Pays </CHeaderText>
                      <Controller
                        name="pays"
                        control={control}
                        render={({ field }) => (
                          <CFormInput {...field} id="pays" placeholder="Pays" />
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
                      <CHeaderText> Téléphone </CHeaderText>
                      <Controller
                        name="telephone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="telephone"
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
