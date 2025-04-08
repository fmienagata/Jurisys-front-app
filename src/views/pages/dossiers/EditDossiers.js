/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useRef, useEffect } from 'react'
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
  CHeaderText,
  CFormSelect,
  CFormCheck,
} from '@coreui/react'
import { useQueryClient } from 'react-query'
import { updateDossier } from '../../../services/dossiersService'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMessageContext } from 'src/Context/MessageContext'
import { useGetAllSocietes } from 'src/services/societeService'
import { prepareDataUpdate } from 'src/utils/utils'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { jwtDecode } from 'jwt-decode'
import { useGetAllUsers } from 'src/services/usersService'

const EditDossier = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { state } = location
  const { displayError } = useMessageContext()
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([])
  const [filesLen, setFilesLen] = useState(0)
  const fileInputRef = useRef(null)
  const [societes, setSocietes] = useState([])
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const { control, handleSubmit, setValue } = useForm()

  const { data: dataUsers, isLoading } = useGetAllUsers({})

  const { dataSocietesAPI: dataSocietes, isLoading: isLoadingSocietes } = useGetAllSocietes({
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
      )
    },
  })
  const user = dataUsers?.data?.find((user) => user.email === decodedToken.username)
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles([...files, ...newFiles])
    setFilesLen(files.length)
  }
  const handleRemoveFile = (index, e) => {
    e.preventDefault()
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
    setFilesLen(files.length)
  }
  const handleEdit = async (data) => {
    try {
      await updateDossier(state.data.id, data)
      queryClient.invalidateQueries(['getAllDossiers'])
      navigate('/dossiers/actifs')
    } catch (error) {
      console.log(error)
      displayError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <CContainer>
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <form onSubmit={handleSubmit(handleEdit)}>
              <CRow className="justify-content-center">
                <CCol sm="3">
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Nom</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="nom"
                        defaultValue={state.data.nom}
                        rules={{ required: 'Ce champs est requis' }}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                            id="nom"
                            placeholder="nom"
                            autoComplete="nom"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Prénom</b>{' '}
                      </CHeaderText>
                      <Controller
                        defaultValue={state.data.prenom}
                        name="prenom"
                        rules={{ required: 'Ce champs est requis' }}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="prenom"
                            placeholder="prénom"
                            autoComplete="prenom"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
                        )}
                      />{' '}
                    </CCol>
                  </CInputGroup>
                  <CCol>
                    <CHeaderText>
                      {' '}
                      <b>E-mail</b>{' '}
                    </CHeaderText>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <Controller
                        name="email"
                        defaultValue={state.data.email}
                        rules={{ required: 'Ce champs est requis' }}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="email"
                            type="email"
                            placeholder="email"
                            autoComplete="email"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
                        )}
                      />
                    </CInputGroup>
                  </CCol>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Téléphone</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="telephone"
                        defaultValue={state.data.telephone}
                        rules={{ required: 'Ce champs est requis' }}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="telephone"
                            type="number"
                            placeholder="téléphone"
                            autoComplete="telephone"
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
                        <b>Adresse</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="adresse"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        defaultValue={state.data.adresse}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="adresse"
                            placeholder="adresse"
                            autoComplete="adresse"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
                        )}
                      />{' '}
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
                        defaultValue={state.data.ville}
                        rules={{ required: 'Ce champs est requis' }}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="ville"
                            placeholder="ville"
                            autoComplete="ville"
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
                        defaultValue={state.data.pays}
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="pays"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                            placeholder="pays"
                            autoComplete="pays"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                </CCol>
                <CCol sm="3">
                  {' '}
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Référence</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="reference"
                        control={control}
                        defaultValue={state.data.reference}
                        rules={{ required: 'Ce champs est requis' }}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="reference"
                            placeholder="référence"
                            autoComplete="reference"
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
                        <b>Type de procédure</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="typeProcedure"
                        control={control}
                        defaultValue={state.data.typeProcedure}
                        render={({ field, fieldState: { error } }) => (
                          <CFormSelect id="typeProcedure" {...field}>
                            <option value="">-- Sélectionner un type de dossier --</option>
                            <option value="Conciliation">Conciliation</option>
                            <option value="Référé">Référé</option>
                            <option value="Au pied de requête">Au pied de requête</option>
                            <option value="Du fond">Du fond</option>
                          </CFormSelect>
                        )}
                      />{' '}
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Honoraires</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="montantPrejudice"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        defaultValue={state.data.montantPrejudice}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            type="number"
                            id="montantPrejudice"
                            placeholder="Honoraires"
                            autoComplete="montant Prejudice"
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
                        <b>Client</b>
                      </CHeaderText>
                      {!isLoadingSocietes ? (
                        dataSocietes && dataSocietes.data.length > 0 ? (
                          user?.userType?.label === 'ADMIN_USER' ||
                          user?.userType?.label === 'USER' ? (
                            <Controller
                              name="societe"
                              control={control}
                              defaultValue={state.data?.societe?.id || user.societe?.id} // Utilise l'id de la société dans le user pour ADMIN_USER ou USER
                              render={({ field }) => {
                                const selectedSociete =
                                  dataSocietes.data.find(
                                    (societe) =>
                                      societe.id === field.value ||
                                      societe.nomSociete === field.value,
                                  ) || null
                                return (
                                  <CFormInput
                                    {...field} // Inclut "field" correctement ici
                                    id="societe"
                                    value={selectedSociete ? selectedSociete.nomSociete : ''}
                                    disabled
                                    placeholder="Client (non modifiable)"
                                  />
                                )
                              }}
                            />
                          ) : (
                            <Controller
                              name="societe"
                              control={control}
                              render={({ field }) => (
                                <Typeahead
                                  {...field} // Utilisez ici field correctement
                                  id="societe-autocomplete"
                                  labelKey="nomSociete"
                                  options={dataSocietes.data}
                                  selected={dataSocietes.data.filter(
                                    (societe) => societe.id === field.value,
                                  )}
                                  onChange={(selected) =>
                                    field.onChange(selected.length > 0 ? selected[0].id : '')
                                  }
                                  placeholder="Choisir ou rechercher une société"
                                />
                              )}
                            />
                          )
                        ) : (
                          <p>Aucune société disponible</p>
                        )
                      ) : (
                        <CSpinner color="primary" variant="grow" />
                      )}
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Juridiction</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="juridiction"
                        defaultValue={state.data.juridiction}
                        rules={{ required: 'Ce champs est requis' }}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="juridiction"
                            placeholder="juridiction"
                            autoComplete="juridiction"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="statut"
                      id="statut"
                      control={control}
                      defaultValue={Boolean(state.data.statut)}
                      render={({ field }) => (
                        <>
                          {' '}
                          <CHeaderText>
                            <b>Statut dossier :</b>
                          </CHeaderText>
                          <span style={{ marginRight: '20px' }}></span>
                          <CFormCheck
                            type="radio"
                            label="Actif"
                            {...field}
                            value={Boolean(true)}
                            checked={field.value === true}
                            onChange={() => field.onChange(true)}
                          />
                          <span style={{ marginRight: '20px' }}></span>
                          <CFormCheck
                            type="radio"
                            label="Archivé"
                            {...field}
                            value={Boolean(false)}
                            onChange={() => field.onChange(false)}
                            checked={field.value === false}
                          />
                        </>
                      )}
                    />
                  </CInputGroup>
                </CCol>

                <CCol sm="3" style={{ paddingBottom: '10px' }}>
                  <fieldset className="blue-info" id="shifter">
                    <h5 style={{ color: 'purple' }}>Partie conseil</h5>

                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText>
                          {' '}
                          <b>Nom</b>{' '}
                        </CHeaderText>
                        <Controller
                          name="partieConseilNom"
                          defaultValue={state.data.partieConseilNom}
                          control={control}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              invalid={Boolean(error)}
                              feedbackInvalid={error?.message}
                              id="partieConseilNom"
                              placeholder="Nom"
                            />
                          )}
                        />
                      </CCol>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText>
                          {' '}
                          <b>Prénom</b>{' '}
                        </CHeaderText>
                        <Controller
                          name="partieConseilPrenom"
                          control={control}
                          defaultValue={state.data.partieConseilPrenom}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieConseilPrenom"
                              placeholder="Prénom"
                              invalid={Boolean(error)}
                              feedbackInvalid={error?.message}
                            />
                          )}
                        />{' '}
                      </CCol>
                    </CInputGroup>
                    <CCol className="mb-3">
                      <CCol>
                        <CHeaderText>
                          {' '}
                          <b>E-mail</b>{' '}
                        </CHeaderText>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>@</CInputGroupText>
                          <Controller
                            name="partieConseilEmail"
                            control={control}
                            defaultValue={state.data.partieConseilEmail}
                            rules={{ required: 'Ce champs est requis' }}
                            render={({ field, fieldState: { error } }) => (
                              <CFormInput
                                {...field}
                                id="partieConseilEmail"
                                type="email"
                                placeholder="E-mail"
                                invalid={Boolean(error)}
                                feedbackInvalid={error?.message}
                              />
                            )}
                          />
                        </CInputGroup>
                      </CCol>
                    </CCol>

                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText>
                          {' '}
                          <b>Adresse</b>{' '}
                        </CHeaderText>

                        <Controller
                          name="partieConseilAdresse"
                          defaultValue={state.data.partieConseilAdresse}
                          control={control}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieConseilAdresse"
                              placeholder="Adresse"
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
                          name="partieConseilVille"
                          control={control}
                          defaultValue={state.data.partieConseilVille}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieConseilVille"
                              placeholder="Ville"
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
                          name="partieConseilPays"
                          control={control}
                          defaultValue={state.data.partieConseilPays}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieConseilPays"
                              placeholder="Pays"
                              invalid={Boolean(error)}
                              feedbackInvalid={error?.message}
                            />
                          )}
                        />{' '}
                      </CCol>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText>
                          {' '}
                          <b>Téléphone</b>{' '}
                        </CHeaderText>

                        <Controller
                          name="partieConseilTelephone"
                          control={control}
                          defaultValue={state.data.partieConseilTelephone}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieConseilTelephone"
                              placeholder="Téléphone"
                              invalid={Boolean(error)}
                              feedbackInvalid={error?.message}
                            />
                          )}
                        />
                      </CCol>
                    </CInputGroup>
                  </fieldset>
                </CCol>
              </CRow>

              <CRow>
                <CCol sm="8"></CCol>
                <CCol sm="4">
                  <CRow>
                    <CCol sm="4">
                      <CButton
                        type="button"
                        color="success"
                        variant="outline"
                        onClick={() => navigate('/dossiers/actifs')}
                      >
                        Retour
                      </CButton>
                    </CCol>
                    <CCol sm="4">
                      {' '}
                      <CButton type="submit" variant="outline" color="dark">
                        Modifier
                      </CButton>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </form>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  )
}

export default EditDossier
