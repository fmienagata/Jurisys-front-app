import React, { useEffect, useState } from 'react'
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
  CSpinner,
  CHeaderText,
  CForm,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

import { addUser, useGetAllUsers, useGetUsersTypes } from 'src/services/usersService'
import { useGetAllSocietes } from 'src/services/societeService'
import { useMessageContext } from 'src/Context/MessageContext'
import { useQueryClient } from 'react-query'
import { Typeahead } from 'react-bootstrap-typeahead'
import { jwtDecode } from 'jwt-decode'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const AddUser = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, setValue } = useForm()
  const { displaySuccess, displayError } = useMessageContext()
  const queryClient = useQueryClient()
  const [usersTypes, setUsersTypes] = useState([])
  const [societes, setSocietes] = useState([])
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false)

  const { data, isLoading } = useGetUsersTypes({
    onSuccess: (dataUsers) => {
      setUsersTypes(dataUsers.data)
    },
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé. Veuillez réessayer plus tard.',
      )
    },
  })
  const { data: dataUsers } = useGetAllUsers({})

  const { data: dataSocietes, isLoading: isLoadingSocietes } = useGetAllSocietes({
    onSuccess: (dataSocietes) => {
      setSocietes(dataSocietes.data)
    },
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé. Veuillez réessayer plus tard.',
      )
    },
  })

  useEffect(() => {
    if (!isLoading && data) {
      setUsersTypes(data.data)
    } else {
      queryClient.invalidateQueries(['getUsersTypes'])
    }
  }, [isLoading, data, queryClient])

  useEffect(() => {
    if (!isLoadingSocietes && dataSocietes) {
      setSocietes(dataSocietes.data)
    } else {
      queryClient.invalidateQueries(['getAllSocietes'])
    }
  }, [queryClient, isLoadingSocietes, dataSocietes])

  const user = dataUsers?.data?.find((user) => user.email === decodedToken.username)
  useEffect(() => {
    if (user && (user.userType?.label === 'ADMIN_USER' || user.userType?.label === 'USER')) {
      const userSociete = user.societe // Récupérer la société de l'utilisateur
      // Remplir le champ avec l'ID de la société et afficher le nom
      const societe = societes.find((soc) => soc.id === userSociete.id)
      if (societe) {
        setValue('societe', societe.id) // Remplir avec l'ID de la société
      }
    }
  }, [user, societes, decodedToken, setValue])

  const handleAddUser = async (data) => {
    try {
      await addUser(data)
      displaySuccess('Ajout un utilisateur', "L'utilisateur a bien été créé avec succès")
      queryClient.invalidateQueries(['getAllUsers'])
      queryClient.invalidateQueries(['getCountUsers'])
      navigate('/users')
    } catch (error) {
      displayError(error.messages)
    }
  }

  // Filtrer les usersTypes pour exclure 'AVOCAT' si l'utilisateur est 'ADMIN_USER' ou 'USER'
  const filteredUserTypes =
    user?.userType?.label === 'ADMIN_USER' || user?.userType?.label === 'USER'
      ? usersTypes.filter((type) => type.label !== 'AVOCAT')
      : usersTypes

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm
                  onSubmit={handleSubmit(handleAddUser)}
                  noValidate
                  className="row g-3 needs-validation"
                >
                  <p className="text-body-secondary">Ajouter un utilisateur</p>

                  <CInputGroup className="mb-0">
                    <CCol>
                      <CHeaderText>
                        <b> Nom</b>
                      </CHeaderText>
                      <Controller
                        name="nom"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="nom"
                            placeholder="Nom"
                            autoComplete="nom"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  <CInputGroup className="mb-0">
                    <CCol>
                      <CHeaderText>
                        <b>Prénom</b>
                      </CHeaderText>
                      <Controller
                        name="prenom"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="prenom"
                            placeholder="Prénom"
                            autoComplete="prenom"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  <CInputGroup className="mb-0">
                    <CCol>
                      <CHeaderText>
                        <b>Fonction</b>
                      </CHeaderText>
                      <Controller
                        name="fonction"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="fonction"
                            placeholder="fonction"
                            autoComplete="fonction"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  {!isLoading && filteredUserTypes.length > 0 ? (
                    <CInputGroup className="mb-0">
                      <CCol>
                        <CHeaderText>
                          <b>Type d&apos;utilisateur</b>
                        </CHeaderText>
                        <Controller
                          name="userType"
                          control={control}
                          defaultValue={filteredUserTypes.length > 0 ? filteredUserTypes[0].id : ''}
                          render={({ field }) => (
                            <CFormSelect id="userType" {...field}>
                              {filteredUserTypes.map((item, key) => (
                                <option value={item.id} key={key}>
                                  {item.label}
                                </option>
                              ))}
                            </CFormSelect>
                          )}
                        />
                      </CCol>
                    </CInputGroup>
                  ) : (
                    isLoading && <CSpinner color="primary" variant="grow" />
                  )}

                  <CInputGroup className="mb-0">
                    <CCol>
                      <CHeaderText>
                        <b>Mot de passe</b>
                      </CHeaderText>
                      <Controller
                        name="password"
                        control={control}
                        rules={{
                          required: 'Ce champs est requis',
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&_*]).{8,}$/,
                            message:
                              'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un caractère spécial.',
                          },
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <div>
                            <CInputGroup>
                              <CFormInput
                                {...field}
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Mot de passe"
                                invalid={Boolean(error)}
                                feedbackInvalid={error?.message}
                              />
                              <CInputGroupText
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: 'pointer' }}
                              >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                              </CInputGroupText>
                            </CInputGroup>
                            <small className="text-muted">
                              Le mot de passe doit contenir au moins 8 caractères, au moins une
                              majuscule, une minuscule et l’un des caractères spéciaux suivants: ! @
                              # $ % ^ & _ *
                            </small>
                          </div>
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        <b>Client</b>
                      </CHeaderText>
                      {!isLoadingSocietes && societes.length > 0 ? (
                        user &&
                        (user.userType?.label === 'ADMIN_USER' ||
                          user.userType?.label === 'USER') ? (
                          <Controller
                            name="societe"
                            control={control}
                            rules={{ required: 'Ce champ est requis' }}
                            render={({ field, fieldState }) => {
                              const selectedSociete = societes.find(
                                (societe) => societe.id === field.value,
                              )
                              return (
                                <CFormInput
                                  {...field}
                                  id="societe"
                                  value={selectedSociete ? selectedSociete.nomSociete : ''}
                                  placeholder="Choisir un client"
                                  disabled={true}
                                  invalid={Boolean(fieldState?.error)}
                                  feedbackInvalid={fieldState?.error?.message}
                                />
                              )
                            }}
                          />
                        ) : (
                          <Controller
                            name="societe"
                            control={control}
                            rules={{ required: 'Ce champ est requis' }}
                            render={({ field, fieldState }) => (
                              <Typeahead
                                {...field}
                                id="societe-autocomplete"
                                labelKey="nomSociete"
                                options={societes}
                                selected={societes.filter((societe) => societe.id === field.value)}
                                onChange={(selected) => {
                                  field.onChange(selected.length > 0 ? selected[0].id : '')
                                }}
                                placeholder="Choisir  un client"
                                isInvalid={!!fieldState.error}
                              />
                            )}
                          />
                        )
                      ) : (
                        isLoadingSocietes && <CSpinner color="primary" variant="grow" />
                      )}
                    </CCol>
                  </CInputGroup>

                  <CInputGroup className="mb-0">
                    <CInputGroupText>@</CInputGroupText>
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: 'Ce champs est requis' }}
                      defaultValue=""
                      render={({ field, fieldState: { error } }) => (
                        <CFormInput
                          {...field}
                          id="email"
                          placeholder="Email"
                          autoComplete="off"
                          invalid={Boolean(error)}
                          feedbackInvalid={error?.message}
                        />
                      )}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Ajouter
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default AddUser
