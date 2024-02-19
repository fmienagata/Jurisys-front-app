/* eslint-disable react/react-in-jsx-scope */
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
} from '@coreui/react'

import { addDossier, getDossiers } from '../../../services/dossiersService'

const AddDossier = () => {
  const { control, handleSubmit, reset } = useForm()

  const handleEdit = async (data) => {
    console.log('handleEdit call API ', data)
    const responseData = await addDossier(data)
    console.log('responseData --> ', responseData)
    const dossiers = await getDossiers()
    console.log('dossiers -> ', dossiers)
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
                  <p className="text-body-secondary">Ajouter un dossier</p>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="reference"
                      control={control}
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput {...field} id="nom" placeholder="nom" autoComplete="nom" />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="prenom"
                      control={control}
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput {...field} id="pays" placeholder="pays" autoComplete="pays" />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="juridiction"
                      control={control}
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      color="info"
                      variant="ghost"
                      onClick={() => {
                        reset()
                      }}
                    >
                      Reset
                    </CButton>

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

export default AddDossier
