/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState, useRef } from 'react'
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
  CFormSelect,
  CHeaderText,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

import { addDossier, addDossierFiles } from '../../../services/dossiersService'
import { useGetAllSocietes } from 'src/services/societeService'
import { useMessageContext } from 'src/Context/MessageContext'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

const AddDossier = () => {
  const navigate = useNavigate()

  const { control, handleSubmit, reset } = useForm()
  const queryClient = useQueryClient()
  const { displaySuccess, displayError } = useMessageContext()

  const [societes, setSocietes] = useState([])
  const [files, setFiles] = useState([])
  const [filesLen, setFilesLen] = useState(0)
  const fileInputRef = useRef(null)

  const { data: dataSocietes, isLoading: isLoadingSocietes } = useGetAllSocietes({
    onSuccess: (dataSocietes) => {
      setSocietes(dataSocietes.data)
    },
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
      )
    },
  })

  useEffect(() => {
    if (!isLoadingSocietes && dataSocietes) {
      setSocietes(dataSocietes.data)
    } else {
      queryClient.invalidateQueries(['getAllSocietes'])
    }
  }, [queryClient, isLoadingSocietes, dataSocietes])

  const handleAdd = async (data) => {
    // files.map((f) => form.append('file', new Blob([f], { type: 'application/pdf' })))
    //await addDossierFiles(data.file)
    // let newDossier = removeEmptyAttributes(data)
    // await addDossier(data)
    //queryClient.invalidateQueries(['getCountDossiersActifs'])
    try {
      const result = await addDossier(data)
      if (files.length > 0) {
        handleSubmitFile(result.id)
      } else {
        queryClient.invalidateQueries(['getCountDossiersActifs'])
        queryClient.invalidateQueries(['getAllDossiers'])
        navigate('/dossiers/actifs')
      }
    } catch (error) {
      displayError(error.messages)
      navigate('/dossiers/actifs')
    }
  }
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles([...files, ...newFiles])
    setFilesLen(files.length)
  }

  const handleSubmitFile = async (id) => {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`file${index}`, file)
    })
    try {
      const response = await addDossierFiles(formData, id)
      queryClient.invalidateQueries(['getCountDossiersActifs'])
      queryClient.invalidateQueries(['getAllDossiers'])
      navigate('/dossiers/actifs')
      displaySuccess("Ajout d'un dossier ", 'Le dossier a bien été créé avec sucess')
      setFiles([]) // Réinitialiser les fichiers après l'envoi réussi
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'envoi des fichiers:", error)
    }
    setFiles([])
  }

  const handleRemoveFile = (index, e) => {
    e.preventDefault()
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
    setFilesLen(files.length)
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click()
  }

  return (
    <div>
      <CContainer>
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <form onSubmit={handleSubmit(handleAdd)}>
              <CRow className="justify-content-center">
                <CCol sm="4">
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Nom </CHeaderText>
                      <Controller
                        name="nom"
                        defaultValue=""
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
                      <CHeaderText> Prenom </CHeaderText>
                      <Controller
                        defaultValue=""
                        name="prenom"
                        rules={{ required: 'Ce champs est requis' }}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="prenom"
                            placeholder="prenom"
                            autoComplete="prenom"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
                        )}
                      />{' '}
                    </CCol>
                  </CInputGroup>
                  <CCol>
                    <CHeaderText> E-mail </CHeaderText>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <Controller
                        name="email"
                        defaultValue=""
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
                      <CHeaderText> Telephone </CHeaderText>
                      <Controller
                        name="telephone"
                        defaultValue=""
                        rules={{ required: 'Ce champs est requis' }}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="telephone"
                            type="number"
                            placeholder="telephone"
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
                      <CHeaderText> Adresse </CHeaderText>
                      <Controller
                        name="adresse"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        defaultValue=""
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
                      <CHeaderText> Ville </CHeaderText>
                      <Controller
                        name="ville"
                        control={control}
                        defaultValue=""
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
                      <CHeaderText> Pays </CHeaderText>

                      <Controller
                        name="pays"
                        defaultValue=""
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
                  <CCol>
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
                  </CCol>
                </CCol>
                <CCol sm="4">
                  {' '}
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Reference </CHeaderText>
                      <Controller
                        name="reference"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Ce champs est requis' }}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="reference"
                            placeholder="reference"
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
                      <CHeaderText> Type procedure </CHeaderText>
                      <Controller
                        name="typeProcedure"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <CFormSelect id="typeProcedure" {...field}>
                            <option value="">-- Selectionner un type de dossier --</option>
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
                      <CHeaderText> Dossier </CHeaderText>
                      <Controller
                        name="statut"
                        control={control}
                        defaultValue={Boolean(true)}
                        render={({ field }) => (
                          <CFormSelect id="statut" {...field}>
                            <option value={Boolean(true)}>Dossier actif</option>
                            <option value={Boolean(false)}>Dossier archivé</option>
                          </CFormSelect>
                        )}
                      />{' '}
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Montant prejudice </CHeaderText>
                      <Controller
                        name="montantPrejudice"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            type="number"
                            id="montantPrejudice"
                            placeholder="montant Prejudice"
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
                      <CHeaderText> Entreprise </CHeaderText>
                      {!isLoadingSocietes && societes.length > 0 ? (
                        <Controller
                          name="societe"
                          control={control}
                          defaultValue={societes.length > 0 ? societes[0].id : ''}
                          render={({ field }) => (
                            <CFormSelect id="societe" {...field}>
                              {societes.map((item, key) => (
                                <option value={item.id} key={key}>
                                  {item.nomSociete}
                                </option>
                              ))}
                            </CFormSelect>
                          )}
                        />
                      ) : (
                        isLoadingSocietes && <CSpinner color="primary" variant="grow" />
                      )}
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Juridiction </CHeaderText>
                      <Controller
                        name="juridiction"
                        defaultValue=""
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
                </CCol>
                <CCol sm="4">
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Partie adverse objet </CHeaderText>
                      <Controller
                        name="objet"
                        defaultValue=""
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
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText> Partie adverse nom </CHeaderText>
                      <Controller
                        name="partieAdverseNom"
                        control={control}
                        defaultValue=""
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
                      <CHeaderText> Partie adverse prenom </CHeaderText>
                      <Controller
                        name="partieAdversePrenom"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="partieAdversePrenom"
                            placeholder="Partie adverse prenom"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
                        )}
                      />{' '}
                    </CCol>
                  </CCol>
                  <CCol>
                    <CHeaderText> Partie adverse e-mail </CHeaderText>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <Controller
                        name="partieAdverseEmail"
                        control={control}
                        defaultValue=""
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
                      <CHeaderText> Partie adverse adresse </CHeaderText>

                      <Controller
                        name="partieAdverseAdresse"
                        defaultValue=""
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
                      <CHeaderText> Partie adverse ville </CHeaderText>
                      <Controller
                        name="partieAdverseVille"
                        control={control}
                        defaultValue=""
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
                      <CHeaderText> Partie adverse pays </CHeaderText>
                      <Controller
                        name="partieAdversePays"
                        control={control}
                        defaultValue=""
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
                      <CHeaderText> Partie adverse telephone </CHeaderText>

                      <Controller
                        name="partieAdverseTelephone"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Ce champs est requis' }}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="partieAdverseTelephone"
                            placeholder="Partie adverse telephone"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol sm="10"></CCol>
                <CCol sm="2">
                  <CRow>
                    <CCol>
                      <CButton
                        type="button"
                        color="success"
                        variant="outline"
                        onClick={() => reset()}
                      >
                        Reset
                      </CButton>
                    </CCol>
                    <CCol>
                      {' '}
                      <CButton type="submit" variant="outline" color="dark">
                        Ajouter
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

export default AddDossier
