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

import { editUser } from 'src/services/usersService'
import { useMessageContext } from 'src/Context/MessageContext'
import { useGetAllSocietes } from 'src/services/societeService'
import { useGetUsersTypes } from 'src/services/usersService'

import { useQueryClient } from 'react-query'

const UserEdit = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { displaySuccess, displayError } = useMessageContext()
  const [societes, setSocietes] = useState([])
  const [selectedSociete, setSelectedSociete] = useState('')

  const [usersTypes, setUsersTypes] = useState([])
  const [selectedUsersTypes, setSelectedUsersTypes] = useState('')

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
      setSelectedSociete(dataSocietes.data.find((item) => item.nomSociete === state.data.societe))
    },
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
      )
    },
  })

  const { control, handleSubmit } = useForm()

  const handleEdit = async (data) => {
    try {
      await editUser(state.data.id, data)
      displaySuccess('Modifié avec sucess', "L'utilisateur a bien été modifié avec sucess")
      navigate('/users')
      queryClient.invalidateQueries(['getAllUsers'])
    } catch (error) {
      displayError("error est survenue lors de la modification d'un utilisateur")
      navigate('/users')
    }
  }

  useEffect(() => {
    if (!isLoadingSocietes && dataSocietes) {
      setSocietes(dataSocietes.data)
      setSelectedSociete(dataSocietes.data.find((item) => item.nomSociete === state.data.societe))
    } else {
      queryClient.invalidateQueries(['getAllSocietes'])
    }
  }, [queryClient, isLoadingSocietes, dataSocietes, state.data.societe])

  useEffect(() => {
    if (!isLoading && dataUsers.data) {
      setUsersTypes(dataUsers.data)
      setSelectedUsersTypes(dataUsers.data.find((item) => item.label === state.data.userType.label))
    } else {
      //queryClient.invalidateQueries(['getUsersTypes'])
    }
  }, [isLoading, dataUsers, queryClient, state.data.userType.label])

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <form onSubmit={handleSubmit(handleEdit)}>
                  {/* <h1>{labels.registre.titleHeader}</h1> */}
                  <p className="text-body-secondary">Modifier un utilisateur</p>
                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Type d&apos;utilisateur</b>{' '}
                      </CHeaderText>
                      {!isLoading && usersTypes.length > 0 ? (
                        <Controller
                          name="userType"
                          control={control}
                          defaultValue={selectedUsersTypes.id}
                          render={({ field }) => (
                            <CFormSelect id="userType" {...field}>
                              {usersTypes.map((item, key) => (
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

                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Nom</b>{' '}
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
                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Prénom</b>{' '}
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
                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Fonction</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="fonction"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
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
                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Username</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="username"
                        control={control}
                        defaultValue={state.data.username}
                        render={({ field }) => (
                          <CFormInput
                            {...field}
                            id="username"
                            placeholder="username"
                            autoComplete="username"
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>
                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Mot de passe</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="password"
                        defaultValue={state.data.password}
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
                  <CInputGroup className="mb-1">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Client</b>{' '}
                      </CHeaderText>
                      {!isLoadingSocietes && societes.length > 0 ? (
                        <Controller
                          name="societe"
                          control={control}
                          defaultValue={
                            selectedSociete?.id || (societes.length > 0 ? societes[0].id : '')
                          }
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
