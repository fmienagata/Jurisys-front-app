import React from 'react'
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
import { useNavigate } from 'react-router-dom'

import { addUser } from 'src/services/usersService'
import { useMessageContext } from 'src/Context/MessageContext'

const AddUser = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { displaySuccess, displayError } = useMessageContext()

  const handleAddUser = async (data) => {
    console.log('handleAddUser call API ', data)
    try {
      await addUser(data)
      displaySuccess("L'utilisateur a bien été créé avec sucess")
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
                <form onSubmit={handleSubmit(handleAddUser)}>
                  {/* <h1>{labels.registre.titleHeader}</h1> */}
                  <p className="text-body-secondary">Ajouter un utilisateur</p>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="userType"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="userType"
                          placeholder="userType"
                          autoComplete="userType"
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
                        <CFormInput
                          {...field}
                          id="nom"
                          placeholder="Nom d'utilisateur"
                          autoComplete="nom"
                        />
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
                          placeholder="Prenom d'utilisateur"
                          autoComplete="prenom"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="username"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CFormInput
                          {...field}
                          id="username"
                          placeholder="username"
                          autoComplete="username"
                        />
                      )}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
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
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
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

export default AddUser
