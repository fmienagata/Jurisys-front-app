/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
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
import { Typeahead } from 'react-bootstrap-typeahead'
import { editUser, useGetAllUsers, useGetUsersTypes } from 'src/services/usersService'
import { useNavigate } from 'react-router-dom'
import { useMessageContext } from 'src/Context/MessageContext'
import { useQueryClient } from 'react-query'
import { jwtDecode } from 'jwt-decode'
import { useGetAllSocietes } from 'src/services/societeService'

const Profile = () => {
  const { control, handleSubmit, setValue } = useForm()
  const { displaySuccess, displayError } = useMessageContext()
  const [selectedSociete, setSelectedSociete] = useState('')

  const { data: dataUsers } = useGetAllUsers({})

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  // Trouver l'utilisateur connecté
  const currentUser = dataUsers?.data?.find((user) => user.email === decodedToken.username)
const { data: dataSocietes } = useGetAllSocietes({
  enabled: !!currentUser,
  onSuccess: (dataSocietes) => {
    const societe = dataSocietes.data.find(
      (item) => item.nomSociete.toLowerCase() === currentUser?.societe?.toLowerCase(),
    )
    setSelectedSociete(societe)
  },
})

 
  // Pré-remplir le formulaire avec les données de l'utilisateur
  useEffect(() => {
    if (currentUser) {
      setValue('nom', currentUser.nom)
      setValue('prenom', currentUser.prenom)
      setValue('fonction', currentUser.fonction || '')
      setValue('email', currentUser.email)
      setValue('userType', currentUser.userType?.id || '')
      setValue('societe', currentUser.societe || '') // Pré-remplissage du client
    }
  }, [currentUser, setValue])
  const handleEdit = async (data) => {
    if (!currentUser) return

    try {
      const modifData = {
        nom: data.nom,
        prenom: data.prenom,
        fonction: data.fonction,
        email: data.email,
        societe: selectedSociete?.id,
        password: data.password,
        userType: currentUser.userType.id
      }
 
     await editUser(currentUser?.id, modifData)
      displaySuccess('Modification réussie', 'Le profile a bien été modifié')
    } catch (error) {
      displayError('Erreur lors de la modification du profile')
    }
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <form onSubmit={handleSubmit(handleEdit)}>

                {/* Nom */}
                <CInputGroup className="mb-1">
                  <CCol>
                    <CHeaderText>
                      <b>Nom</b>
                    </CHeaderText>
                    <Controller
                      name="nom"
                      control={control}
                      render={({ field }) => (
                        <CFormInput {...field} placeholder="Nom d'utilisateur" />
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
                      render={({ field }) => (
                        <CFormInput {...field} placeholder="Prénom d'utilisateur" />
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
                      render={({ field }) => <CFormInput {...field} placeholder="Fonction" />}
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
                        <CFormInput {...field} type="password" placeholder="Mot de passe" />
                      )}
                    />
                  </CCol>
                </CInputGroup>

                {/* Email */}
                <CInputGroup className="mb-3 mt-4">
                  <CInputGroupText>@</CInputGroupText>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <CFormInput {...field} placeholder="Email" />}
                  />
                </CInputGroup>

                {/* Bouton Modifier */}
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
  )
}

export default Profile
