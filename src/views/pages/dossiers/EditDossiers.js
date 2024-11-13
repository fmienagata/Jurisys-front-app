/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useRef } from 'react'
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

  const { control, handleSubmit } = useForm()

  const { dataSocietesAPI: dataSocietes, isLoading: isLoadingSocietes } = useGetAllSocietes({
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
      )
    },
  })

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
      await updateDossier(state.data.id, prepareDataUpdate(data))
      queryClient.invalidateQueries(['getAllDossiers'])
      navigate('/dossiers/actifs')
    } catch (error) {
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
                  {/* <CCol>
                    <div>
                      <CInputGroup className="mb-2"></CInputGroup>
                      <h6>Importer des fichiers</h6>

                      <CFormInput
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                      />

                      <CHeaderText>
                        {files.length} fichier{files.length !== 1 ? 's' : ''} sélectionné
                        {files.length !== 1 ? 's' : ''}
                      </CHeaderText>

                      <div>
                        <ul>
                          {files.map((file, index) => (
                            <li key={index}>
                              {file.name} -{' '}
                              <CButton
                                onClick={(e) => handleRemoveFile(index, e)}
                                variant="outline"
                                color="danger"
                                size="sm"
                              >
                                <CIcon icon={icon.cilTrash} size="sm" /> Supprimer
                              </CButton>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CCol> */}
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
                  {/* <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Dossier </CHeaderText>
                      <Controller
                        name="statut"
                        control={control}
                        defaultValue={Boolean(state.data.statut)}
                        render={({ field }) => (
                          <CFormSelect id="statut" {...field}>
                            <option value={Boolean(true)}>Dossier actif</option>
                            <option value={Boolean(false)}>Dossier archivé</option>
                          </CFormSelect>
                        )}
                      />{' '}
                    </CCol>
                  </CInputGroup> */}
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
                        {' '}
                        <b>Entreprise</b>{' '}
                      </CHeaderText>
                      {!isLoadingSocietes
                        ? dataSocietes &&
                          dataSocietes.data.length > 0 && (
                            <Controller
                              name="societe"
                              control={control}
                              //defaultValue={state.data.id}
                              render={({ field }) => (
                                <CFormSelect id="societe" {...field}>
                                  {dataSocietes.data.map((item, key) => (
                                    <option
                                      value={item.id}
                                      key={key}
                                      selected={state.data.societe === item.nomSociete}
                                    >
                                      {item.nomSociete}
                                    </option>
                                  ))}
                                </CFormSelect>
                              )}
                            />
                          )
                        : isLoadingSocietes && <CSpinner color="primary" variant="grow" />}
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
                  <fieldset className="grey" id="shifter">
                    <h5 style={{ color: 'purple' }}>Partie adverse</h5>
                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText>
                          <b>Objet</b>{' '}
                        </CHeaderText>
                        <Controller
                          name="objet"
                          defaultValue={state.data.objet}
                          control={control}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              invalid={Boolean(error)}
                              feedbackInvalid={error?.message}
                              id="objet"
                              placeholder="Partie adverse objet"
                            />
                          )}
                        />
                      </CCol>
                    </CInputGroup>
                    {/* <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText>
                          {' '}
                          <b>Partie adverse</b>{' '}
                        </CHeaderText>
                        <Controller
                          name="partieAdverse"
                          defaultValue={state.data.partieAdverse}
                          control={control}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              invalid={Boolean(error)}
                              feedbackInvalid={error?.message}
                              id="partieAdverse"
                              placeholder="Partie adverse"
                            />
                          )}
                        />
                      </CCol>
                    </CInputGroup> */}
                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText>
                          {' '}
                          <b>Nom</b>{' '}
                        </CHeaderText>
                        <Controller
                          name="partieAdverseNom"
                          control={control}
                          defaultValue={state.data.partieAdverseNom}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieAdverseNom"
                              placeholder="Partie adverse nom"
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
                          <b>Prénom</b>{' '}
                        </CHeaderText>
                        <Controller
                          name="partieAdversePrenom"
                          control={control}
                          rules={{ required: 'Ce champs est requis' }}
                          defaultValue={state.data.partieAdversePrenom}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieAdversePrenom"
                              placeholder="Partie adverse prénom"
                              invalid={Boolean(error)}
                              feedbackInvalid={error?.message}
                            />
                          )}
                        />{' '}
                      </CCol>
                    </CCol>
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>E-mail</b>{' '}
                      </CHeaderText>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <Controller
                          name="partieAdverseEmail"
                          control={control}
                          defaultValue={state.data.partieAdverseEmail}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieAdverseEmail"
                              type="email"
                              placeholder="Partie adverse e-mail"
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
                          <b>Adresse</b>{' '}
                        </CHeaderText>

                        <Controller
                          name="partieAdverseAdresse"
                          defaultValue={state.data.partieAdverseAdresse}
                          control={control}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieAdverseAdresse"
                              placeholder="Partie adverse adresse"
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
                          name="partieAdverseVille"
                          control={control}
                          defaultValue={state.data.partieAdverseVille}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieAdverseVille"
                              placeholder="Partie adverse ville"
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
                          <b>Pays</b>{' '}
                        </CHeaderText>
                        <Controller
                          name="partieAdversePays"
                          control={control}
                          defaultValue={state.data.partieAdversePays}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieAdversePays"
                              placeholder="Partie adverse pays"
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
                          name="partieAdverseTelephone"
                          control={control}
                          defaultValue={state.data.partieAdverseTelephone}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="partieAdverseTelephone"
                              placeholder="Partie adverse téléphone"
                              invalid={Boolean(error)}
                              feedbackInvalid={error?.message}
                            />
                          )}
                        />
                      </CCol>
                    </CInputGroup>
                  </fieldset>
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
                          name="conseilPartieAdverseNom"
                          defaultValue={state.data.conseilPartieAdverseNom}
                          control={control}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              invalid={Boolean(error)}
                              feedbackInvalid={error?.message}
                              id="conseilPartieAdverseNom"
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
                          name="conseilPartieAdversePrenom"
                          control={control}
                          defaultValue={state.data.conseilPartieAdversePrenom}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="conseilPartieAdversePrenom"
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
                            name="conseilPartieAdverseEmail"
                            control={control}
                            defaultValue={state.data.conseilPartieAdverseEmail}
                            rules={{ required: 'Ce champs est requis' }}
                            render={({ field, fieldState: { error } }) => (
                              <CFormInput
                                {...field}
                                id="conseilPartieAdverseEmail"
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
                          name="conseilPartieAdverseAdresse"
                          defaultValue={state.data.conseilPartieAdverseAdresse}
                          control={control}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="conseilPartieAdverseAdresse"
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
                          name="conseilPartieAdverseVille"
                          control={control}
                          defaultValue={state.data.conseilPartieAdverseVille}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="conseilPartieAdverseVille"
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
                          name="conseilPartieAdversePays"
                          control={control}
                          defaultValue={state.data.conseilPartieAdversePays}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="conseilPartieAdversePays"
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
                          name="conseilPartieAdverseTelephone"
                          control={control}
                          defaultValue={state.data.conseilPartieAdverseTelephone}
                          rules={{ required: 'Ce champs est requis' }}
                          render={({ field, fieldState: { error } }) => (
                            <CFormInput
                              {...field}
                              id="conseilPartieAdverseTelephone"
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
