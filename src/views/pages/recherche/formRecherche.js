import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CCard,
  CCol,
  CFormSelect,
  CContainer,
  CInputGroup,
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
  CRow,
  CSpinner,
  CFormCheck,
} from '@coreui/react'
import { Controller, useForm } from 'react-hook-form'
import { getRechercheDossiers } from '../../../services/dossiersService'
import { removeEmptyAttributes } from '../../../utils/utils'
import { useMessageContext } from 'src/Context/MessageContext'
import { useAuth } from 'src/Context/AuthContext'
import PropTypes from 'prop-types'

const FormRecherche = ({ setDossiers, setIsActif }) => {
  const { displayError } = useMessageContext()
  const [loading, setLoading] = useState(false)
  const { disconnect } = useAuth()
  const navigate = useNavigate()

  const { control, reset, handleSubmit } = useForm()

  const handleSearch = async (data) => {
    setLoading(true)
    let criteria = removeEmptyAttributes(data)
    try {
      const dossiersData = await getRechercheDossiers(criteria)
      setDossiers(dossiersData)
      setIsActif(Boolean(data.statut == 1))
      setLoading(false)
    } catch (error) {
      // displayError(error.response.data.message)
      // setLoading(false)
      // disconnect()
      // navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={12}>
              <CCard className="mx-8" md={9} lg={7} xl={6}>
                <form onSubmit={handleSubmit(handleSearch)}>
                  <CListGroup flush>
                    <CListGroupItem>
                      <CRow className="align-items-center mb-1">
                        <CCol className="text-end" xs={4}>
                          <CInputGroup>
                            <Controller
                              name="typeDossier"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <CFormSelect
                                  id="floatingSelect"
                                  {...field}
                                  floatingLabel="Type de dossier"
                                  aria-label="Small select example"
                                  floatingClassName="pt-2"
                                >
                                  <option value="">-- Selectionner un type de dossier --</option>
                                  <option value="Conciliation">Conciliation</option>
                                  <option value="Référé">Référé</option>
                                  <option value="Au pied de requête">Au pied de requête</option>
                                  <option value="Du fond">Du fond</option>
                                </CFormSelect>
                              )}
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol className="text-end" xs={4}>
                          <CInputGroup>
                            <Controller
                              name="reference"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <CFormInput
                                  {...field}
                                  id="reference"
                                  placeholder="Reference"
                                  floatingLabel="Reference du dossier"
                                  floatingClassName="pt-2"
                                  aria-label="example sm input example"
                                />
                              )}
                            />
                          </CInputGroup>
                        </CCol>

                        <CCol className="text-start" xs={4}>
                          <CInputGroup>
                            <Controller
                              name="nom"
                              control={control}
                              defaultValue=""
                              render={({ field }) => (
                                <CFormInput
                                  {...field}
                                  id="nom"
                                  floatingClassName="pt-2"
                                  aria-label="example sm input example"
                                  size="sm"
                                  placeholder="nom"
                                  floatingLabel="Nom du débiteur ou du demandeur"
                                />
                              )}
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>
                      <CRow className="align-items-center mb-2" size="sm">
                        <CCol size="sm" className="text-center" xs={4}>
                          <CInputGroup className="mb-3">
                            <Controller
                              name="statut"
                              control={control}
                              defaultValue={1}
                              render={({ field }) => (
                                <>
                                  <CFormCheck
                                    type="radio"
                                    id="actif"
                                    label="Dossiers actifs"
                                    {...field}
                                    value={1}
                                    checked={field.value == 1}
                                  />
                                  <span style={{ marginRight: '20px' }}></span>
                                  <CFormCheck
                                    type="radio"
                                    id="archive"
                                    label="Dossiers archivés"
                                    {...field}
                                    value={0}
                                    checked={field.value == 0}
                                  />
                                </>
                              )}
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol className="text-end" xs={4}>
                          <CButton type="button" color="success" onClick={() => reset()}>
                            Reset
                          </CButton>
                          <span style={{ marginRight: '10px' }}></span>
                          <CButton color="success" type="submit">
                            {loading ? <CSpinner size="sm" className="me-2" /> : null}
                            {!loading ? 'Rechercher' : 'Charger...'}
                          </CButton>
                        </CCol>
                        <CCol className="text-start" xs={4}></CCol>
                      </CRow>
                    </CListGroupItem>
                  </CListGroup>
                </form>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  )
}

FormRecherche.propTypes = {
  setDossiers: PropTypes.array.isRequired,
  setIsActif: PropTypes.array.isRequired,
}

export default FormRecherche
