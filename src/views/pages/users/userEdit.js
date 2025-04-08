import React, { useState, useEffect } from 'react'
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
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { editUser, useGetAllUsers } from 'src/services/usersService'
import { useMessageContext } from 'src/Context/MessageContext'
import { useGetAllSocietes } from 'src/services/societeService'
import { useGetUsersTypes } from 'src/services/usersService'
import { useQueryClient } from 'react-query'
import { Typeahead } from 'react-bootstrap-typeahead'
import { jwtDecode } from 'jwt-decode'

const UserEdit = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { displaySuccess, displayError } = useMessageContext()
  const [societes, setSocietes] = useState([])
  const [usersTypes, setUsersTypes] = useState([])
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const { control, handleSubmit, setValue } = useForm()

  const { data: dataUsers, isLoading } = useGetUsersTypes({
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
      )
    },
  })

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

  const { data: dataAllUsers, isLoading: isLoadingUsers } = useGetAllUsers({})

  const user = dataAllUsers?.data?.find((user) => user.email === decodedToken.username)
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

  const handleEdit = async (data) => {
    try {
      await editUser(state.data.id, data)
      displaySuccess('Modifié avec succès', "L'utilisateur a bien été modifié avec succès")
      navigate('/users')
      queryClient.invalidateQueries(['getAllUsers'])
    } catch (error) {
      displayError("Une erreur est survenue lors de la modification de l'utilisateur")
      navigate('/users')
    }
  }

  useEffect(() => {
    if (!isLoading && dataUsers) {
      setUsersTypes(dataUsers.data)
    }
  }, [isLoading, dataUsers])

  // Filtrage des rôles : Exclure 'AVOCAT' si l'utilisateur est 'ADMIN_USER' ou 'USER'
  const filteredUserTypes =
    user && (user.userType?.label === 'ADMIN_USER' || user.userType?.label === 'USER')
      ? usersTypes.filter((type) => type?.label !== 'AVOCAT')
      : usersTypes

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <form onSubmit={handleSubmit(handleEdit)}>
                  <p className="text-body-secondary">Modifier un utilisateur</p>

                  {/* Type d'utilisateur */}
                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        <b>Type d&apos;utilisateur</b>
                      </CHeaderText>
                      {!isLoading && usersTypes?.length > 0 ? (
                        <Controller
                          name="userType"
                          control={control}
                          defaultValue={state?.data?.userType?.id}
                          render={({ field }) => (
                            <CFormSelect id="userType" {...field}>
                              {filteredUserTypes?.map((item, key) => (
                                <option value={item.id} key={key}>
                                  {item.label}
                                </option>
                              ))}
                            </CFormSelect>
                          )}
                        />
                      ) : (
                        isLoading && <CSpinner color="primary" variant="grow" />
                      )}
                    </CCol>
                  </CInputGroup>

                  {/* Nom */}
                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        <b>Nom</b>
                      </CHeaderText>
                      <Controller
                        name="nom"
                        control={control}
                        defaultValue={state.data.nom}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="nom"
                            placeholder="Nom d'utilisateur"
                            autoComplete="nom"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  {/* Prénom */}
                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        <b>Prénom</b>
                      </CHeaderText>
                      <Controller
                        name="prenom"
                        control={control}
                        defaultValue={state.data.prenom}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="prenom"
                            placeholder="Prénom d'utilisateur"
                            autoComplete="prenom"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  {/* Fonction */}
                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        <b>Fonction</b>
                      </CHeaderText>
                      <Controller
                        name="fonction"
                        control={control}
                        defaultValue={state.data.fonction ?? ''}
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

                  {/* Mot de passe */}
                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        <b>Mot de passe</b>
                      </CHeaderText>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="password"
                            type="password"
                            placeholder="Mot de passe"
                            autoComplete="current-password"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  {/* Client */}
                  {/* Client */}
                  {!(
                    user?.userType?.label === 'ADMIN_USER' || user?.userType?.label === 'USER'
                  ) && (
                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText>
                          <b>Client</b>
                        </CHeaderText>
                        {!isLoadingSocietes ? (
                          societes && societes.length > 0 ? (
                            <Controller
                              name="societe"
                              control={control}
                              defaultValue={state.data.societe?.id || ''}
                              render={({ field }) => {
                                const selectedSociete = societes.find(
                                  (societe) => societe.id === field.value,
                                )
                                return (
                                  <Typeahead
                                    {...field}
                                    id="societe-autocomplete"
                                    labelKey="nomSociete"
                                    options={societes}
                                    selected={selectedSociete ? [selectedSociete] : []}
                                    onChange={(selected) => {
                                      field.onChange(selected.length > 0 ? selected[0].id : '')
                                    }}
                                    placeholder="Choisir ou rechercher une société"
                                    disabled={
                                      user?.userType?.label === 'ADMIN_USER' ||
                                      user?.userType?.label === 'USER'
                                    }
                                  />
                                )
                              }}
                            />
                          ) : (
                            <p>Aucune société disponible</p>
                          )
                        ) : (
                          <CSpinner color="primary" variant="grow" />
                        )}
                      </CCol>
                    </CInputGroup>
                  )}

                  {/* Email */}
                  <CInputGroup className="mb-3 mt-4">
                    <CInputGroupText>@</CInputGroupText>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={state.data.email ?? ''}
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="email"
                          placeholder="Email"
                          autoComplete="email"
                        />
                      )}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Modifier
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

export default UserEdit
