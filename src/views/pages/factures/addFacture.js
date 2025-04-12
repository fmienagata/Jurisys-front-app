import React, { useEffect, useRef, useState } from 'react'
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
  CFormSelect,
  CSpinner,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useMessageContext } from 'src/Context/MessageContext'
import { addFacture, addFactureFiles } from 'src/services/factureService'
import { useGetAllUsers } from '../../../services/usersService'
import { useGetAllDossiers } from '../../../services/dossiersService'
import { useQueryClient } from 'react-query'
import { handleErrorResponse } from '../../../utils/handleErrorResponse'
import { Typeahead } from 'react-bootstrap-typeahead'

const AddFacture = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { displaySuccess, displayError } = useMessageContext()
  const [users, setUsers] = useState([])
  const [dossiersData, setDossiersData] = useState([])
  const queryClient = useQueryClient()

  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  const { data: dataUsers, isLoading } = useGetAllUsers({
    onSuccess: (dataUsers) => {
      setUsers(dataUsers.data)
    },
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
      )
    },
  })

  const validUsers = dataUsers?.data?.filter((user) => user.isDeleted === false) || []
  const { dossiers, isLoading: isLoadingDossiers } = useGetAllDossiers({
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
      )
    },
  })
  const validDossiers = dossiers?.filter((dossier) => dossier.statut === true) || []
  const handleAddFacture = async (data) => {
    try {
      // Crée la facture via votre service existant
      const result = await addFacture(data)

      // Si des fichiers ont été sélectionnés, on les upload ensuite
      if (files.length > 0) {
        await handleSubmitFile(result.id)
      }

      displaySuccess('Ajout facture', 'La facture a bien été créée.')
      queryClient.invalidateQueries(['getAllFactures'])
      navigate('/factures')
    } catch (error) {
      displayError(error.message || 'Erreur lors de la création de la facture')
      navigate('/factures')
    }
  }

  const handleSubmitFile = async (factureId) => {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`file${index}`, file)
    })
    try {
      await addFactureFiles(formData, factureId)
      // Optionnel : on peut remettre les fichiers à zéro après un upload réussi
      setFiles([])
    } catch (error) {
      console.error("Erreur lors de l'envoi des fichiers :", error)
    }
  }

  // Gestion de l'ajout de fichiers
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    // Vous pouvez faire une vérification de taille globale si besoin, par exemple :
    const totalSize =
      newFiles.reduce((acc, file) => acc + file.size, 0) +
      files.reduce((acc, file) => acc + file.size, 0)
    if (totalSize > 1 * 1024 * 1024) {
      // par exemple, limite 1Mo
      displayError('La taille totale des fichiers doit être inférieure à 1 Mo.')
      return
    }
    setFiles([...files, ...newFiles])
  }

  const handleRemoveFile = (index, e) => {
    e.preventDefault()
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  // Permet d'ouvrir la boîte de dialogue des fichiers manuellement (optionnel)
  const handleButtonClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click()
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

                  <CRow>
                    <CCol>
                      {!isLoading && validUsers?.length > 0 ? (
                        <Controller
                          name="user"
                          control={control}
                          rules={{ required: 'Ce champ est requis' }}
                          render={({ field, fieldState: { error } }) => {
                            // Trouver l'utilisateur correspondant à l'ID sélectionné
                            const selectedUser =
                              validUsers?.find((user) => user.id === field.value) || null

                            return (
                              <>
                                <Typeahead
                                  {...field}
                                  id="user-autocomplete"
                                  labelKey={(option) => `${option.nom} ${option.prenom}`}
                                  options={validUsers} // Liste des utilisateurs
                                  selected={selectedUser ? [selectedUser] : []} // Affichage du bon utilisateur
                                  onChange={(selected) => {
                                    field.onChange(selected.length > 0 ? selected[0].id : '')
                                  }}
                                  placeholder="Choisir ou rechercher un utilisateur"
                                />
                                {error && <p className="text-danger">{error.message}</p>}
                              </>
                            )
                          }}
                        />
                      ) : (
                        isLoading && <CSpinner color="primary" variant="grow" />
                      )}
                    </CCol>
                  </CRow>

                  {/* Ajout d'un espace entre les champs */}
                  <div style={{ marginBottom: '16px' }}></div>

                  <CRow>
                    <CCol>
                      {!isLoadingDossiers && validDossiers?.length > 0 ? (
                        <Controller
                          name="dossier"
                          control={control}
                          rules={{ required: 'Ce champ est requis' }}
                          render={({ field, fieldState }) => (
                            <Typeahead
                              {...field}
                              id="dossier-autocomplete"
                              labelKey="reference"
                              options={validDossiers}
                              selected={validDossiers?.filter(
                                (dossier) => dossier.id === field.value,
                              )}
                              onChange={(selected) => {
                                field.onChange(selected.length > 0 ? selected[0].id : '')
                              }}
                              placeholder="Choisir ou rechercher une référence"
                              isInvalid={!!fieldState.error}
                            />
                          )}
                        />
                      ) : (
                        isLoadingDossiers && <CSpinner color="primary" variant="grow" />
                      )}
                    </CCol>
                  </CRow>
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Montant en FCFA</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="montant"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="montant"
                            placeholder="montant"
                            autoComplete="montant"
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
                        <b>Statut</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="statut"
                        control={control}
                        defaultValue="Payer"
                        render={({ field }) => (
                          <CFormSelect id="statut" {...field}>
                            <option value="Payée">Payée</option>
                            <option value="Envoyée">Envoyée</option>
                            <option value="Annulée">Annulée</option>
                          </CFormSelect>
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <div style={{ marginBottom: '16px' }}>
                    <CHeaderText>
                      <b>Ajouter des fichiers</b>
                    </CHeaderText>
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
                            Supprimer
                          </CButton>
                        </li>
                      ))}
                    </ul>
                  </div>
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
