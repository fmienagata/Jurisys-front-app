/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react'
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
  CRow,
  CSpinner,
} from '@coreui/react'

import { updateDossier } from '../../../services/dossiersService'
import { useLocation } from 'react-router-dom'
import { useMessageContext } from 'src/Context/MessageContext'

const EditDossier = () => {
  const location = useLocation()
  const { state } = location
  const { displayError } = useMessageContext()
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit, reset } = useForm()

  const handleEdit = async (data) => {
    try {
      await updateDossier(state.data.id, data)
    } catch (error) {
      displayError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <form onSubmit={handleSubmit(handleEdit)}>
                  {/* <h1>{labels.registre.titleHeader}</h1> */}
                  <p className="text-body-secondary">Modifier un dossier</p>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="reference"
                      control={control}
                      defaultValue={state.data.reference}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="reference"
                          placeholder="reference"
                          autoComplete="reference"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="procedure"
                      control={control}
                      defaultValue={state.data.procedure}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="procedure"
                          placeholder="procedure"
                          autoComplete="procedure"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="nom"
                      control={control}
                      defaultValue={state.data.nom}
                      render={({ field }) => (
                        <CFormInput {...field} id="nom" placeholder="nom" autoComplete="nom" />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="prenom"
                      control={control}
                      defaultValue={state.data.prenom}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="prenom"
                          placeholder="prenom"
                          autoComplete="prenom"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <Controller
                      name="email"
                      defaultValue={state.data.email}
                      control={control}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="email"
                          type="email"
                          placeholder="email"
                          autoComplete="email"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="telephone"
                      control={control}
                      defaultValue={state.data.telephone}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="telephone"
                          type="number"
                          placeholder="telephone"
                          autoComplete="telephone"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="adresse"
                      control={control}
                      defaultValue={state.data.adresse}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="adresse"
                          placeholder="adresse"
                          autoComplete="adresse"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="ville"
                      control={control}
                      defaultValue={state.data.ville}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="ville"
                          placeholder="ville"
                          autoComplete="ville"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="pays"
                      control={control}
                      defaultValue={state.data.pays}
                      render={({ field }) => (
                        <CFormInput {...field} id="pays" placeholder="pays" autoComplete="pays" />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="juridiction"
                      control={control}
                      defaultValue={state.data.juridiction}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="juridiction"
                          placeholder="juridiction"
                          autoComplete="juridiction"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="statut"
                      control={control}
                      defaultValue={state.data.statut}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="statut"
                          placeholder="statut"
                          autoComplete="statut"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="montantPrejudice"
                      control={control}
                      defaultValue={state.data.montantPrejudice}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="montantPrejudice"
                          placeholder="montant Prejudice"
                          autoComplete="montant Prejudice"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="societe"
                      control={control}
                      defaultValue={state.data.societe}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="societe"
                          placeholder="societe"
                          autoComplete="societe"
                        />
                      )}
                    />
                  </CInputGroup>
                  <div>
                    <CButton
                      color="dark"
                      variant="ghost"
                      onClick={() => {
                        reset()
                      }}
                    >
                      Reset
                    </CButton>

                    <CButton color="success" type="submit" disabled={loading}>
                      {loading ? <CSpinner size="sm" className="me-2" /> : null}
                      {loading ? 'en cours ...' : 'Modifier'}
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

export default EditDossier
