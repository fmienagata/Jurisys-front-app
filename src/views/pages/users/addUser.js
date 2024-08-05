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

import { addUser, useGetUsersTypes } from 'src/services/usersService'
import { useGetAllSocietes } from 'src/services/societeService'
import { useMessageContext } from 'src/Context/MessageContext'
import { useQueryClient } from 'react-query'

const AddUser = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { displaySuccess, displayError } = useMessageContext()
  const queryClient = useQueryClient()
  const [usersTypes, setUsersTypes] = useState([])
  const [societes, setSocietes] = useState([])
  //const [validated, setValidated] = useState(false)

  const { data, isLoading } = useGetUsersTypes({
    onSuccess: (dataUsers) => {
      setUsersTypes(dataUsers.data)
    },
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

  const handleAddUser = async (data) => {
    try {
      await addUser(data)
      displaySuccess('Ajout un utilisateur', "L'utilisateur a bien été créé avec sucess")
      queryClient.invalidateQueries(['getAllUsers'])
      queryClient.invalidateQueries(['getCountUsers'])
      navigate('/users')
    } catch (error) {
      displayError(error.messages)
    }
  }

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm
                  onSubmit={handleSubmit(handleAddUser)}
                  //onSubmit={handleSubmitForm}
                  // validated={errors || errors == undefined}
                  noValidate
                  className="row g-3 needs-validation"
                >
                  {/* <h1>{labels.registre.titleHeader}</h1> */}
                  <p className="text-body-secondary">Ajouter un utilisateur</p>

                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        <b> Nom</b>{' '}
                      </CHeaderText>

                      <Controller
                        name="nom"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }}
                        defaultValue=""
                        render={({ field, fieldState: { error } }) => (
                          <div>
                            <CFormInput
                              {...field}
                              id="nom"
                              placeholder="Nom"
                              autoComplete="nom"
                              invalid={Boolean(error)}
                              feedbackInvalid={error?.message}
                            />
                            {/* {errors.nom && <p className="text-danger">{errors.nom.message}</p>} */}
                          </div>
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
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Username</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="username"
                        control={control}
                        // rules={{ required: 'Ce champs est requis' }} // Add rules for required field
                        rules={{ required: 'Ce champs est requis' }} // Add rules for required field
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="username"
                            placeholder="username"
                            autoComplete="username"
                            invalid={Boolean(error)}
                            feedbackInvalid={error?.message}
                          />
                        )}
                      />
                    </CCol>
                  </CInputGroup>

                  {!isLoading && usersTypes.length > 0 ? (
                    <CInputGroup className="mb-3">
                      <CCol>
                        <CHeaderText>
                          {' '}
                          <b>Type d&apos;utilisateur</b>{' '}
                        </CHeaderText>
                        <Controller
                          name="userType"
                          control={control}
                          defaultValue={usersTypes.length > 0 ? usersTypes[0].id : ''}
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
                      </CCol>
                    </CInputGroup>
                  ) : (
                    isLoading && <CSpinner color="primary" variant="grow" />
                  )}
                  <CInputGroup className="mb-3">
                    <CCol>
                      <CHeaderText>
                        {' '}
                        <b>Mot de passe</b>{' '}
                      </CHeaderText>
                      <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Ce champs est requis' }} // Add rules for required field
                        render={({ field, fieldState: { error } }) => (
                          <CFormInput
                            {...field}
                            id="password"
                            type="password"
                            placeholder="Mot de passe"
                            autoComplete="current-password"
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
                      {!isLoadingSocietes && societes.length > 0 ? (
                        <Controller
                          name="societe"
                          control={control}
                          rules={{ required: 'Ce champs est requis' }}
                          defaultValue={societes.length > 0 ? societes[0].id : ''}
                          render={({ field, fieldState: { error } }) => (
                            <CFormSelect
                              id="societe"
                              {...field}
                              invalid={Boolean(error)}
                              feedbackInvalid={error?.message}
                            >
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
                    <CInputGroupText>@</CInputGroupText>
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: 'Ce champs est requis' }} // Add rules for required field
                      defaultValue=""
                      render={({ field, fieldState: { error } }) => (
                        <CFormInput
                          {...field}
                          id="email"
                          placeholder="Email"
                          autoComplete="email"
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
