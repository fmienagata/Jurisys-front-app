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
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useMessageContext } from 'src/Context/MessageContext'
import { addFacture } from 'src/services/factureService'

const AddFacture = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { displaySuccess, displayError } = useMessageContext()

  const handleAddFacture = async (data) => {
    try {
      await addFacture(data)
      displaySuccess("L'utilisateur a bien été créé avec sucess")
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

                  <CInputGroup className="mb-3">
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
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Dossier </CHeaderText>
                      <Controller
                        name="dossier"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="dossier"
                            placeholder="dossier"
                            autoComplete="dossier"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Montant </CHeaderText>
                      <Controller
                        name="montant"
                        control={control}
                        defaultValue=""
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
                        render={({ field }) => (
                          <CFormInput {...field} id="statut" placeholder="statut" />
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
