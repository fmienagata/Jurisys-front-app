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
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { editUser } from 'src/services/usersService'
import { useMessageContext } from 'src/Context/MessageContext'

const UserEdit = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const { displaySuccess, displayError } = useMessageContext()

  const { control, handleSubmit } = useForm()

  const handleEdit = async (data) => {
    try {
      await editUser(state.data.id, data)
      displaySuccess("L'utilisateur a bien été modifié avec sucess")
      navigate('/users')
    } catch (error) {
      displayError("error est survenue lors de la modification d'un utilisateur")
      navigate('/users')
    }
  }

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
                  <CInputGroup className="mb-3">
                    <Controller
                      name="userType"
                      control={control}
                      defaultValue={state.data.userType}
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
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      name="prenom"
                      control={control}
                      defaultValue={state.data.prenom}
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
                      defaultValue={state.data.societe}
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
                      defaultValue={state.data.email}
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
