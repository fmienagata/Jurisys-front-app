import React, { useState, useRef, useEffect } from 'react'
import { useRowSelect } from 'react-table'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { CButton } from '@coreui/react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CFormInput } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import ModalAction from 'src/components/ModalAction'

import { filtredValues } from 'src/utils/utils'

import { deleteUser, useGetAllUsers } from '../../../services/usersService'
import { useMessageContext } from 'src/Context/MessageContext'
import Styles from './../../../table/TableStyles'
import { useQueryClient } from 'react-query'
import { useAuth } from 'src/Context/AuthContext'

const Users = () => {
  const { user } = useAuth()

  const tableRefUsers = useRef(typeof useRowSelect)
  const navigate = useNavigate()

  const { displayError, displaySuccess } = useMessageContext()
  const queryClient = useQueryClient()

  const columnsUsers = [
    {
      Header: 'Nom',
      accessor: 'nom',
    },
    {
      Header: 'Prenom',
      accessor: 'prenom',
    },
    {
      Header: 'Username',
      accessor: 'username',
    },
    // {
    //   Header: 'UserIdentifier',
    //   accessor: 'userIdentifier',
    // },
    {
      Header: 'Societe',
      accessor: 'societe',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]
  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const [users, setUsers] = useState([])
  const [initialUsers, setInitialUsers] = useState([])

  const [userIDDelete, setUserIDDelete] = useState('')

  const { data: dataUsers, isLoading } = useGetAllUsers({
    // onSuccess: (values) => {
    //   setInitialUsers(values.data)
    //   setUsers(values.data)
    // },
    // onError: (error) => {
    //   handleErrorResponse(error, disconnect, displayError, navigate)
    // },
  })

  const handleDeleteUser = (userId) => {
    setOpenModal(true)
    setUserIDDelete(userId)
  }

  useEffect(() => {
    if (!isLoading && dataUsers) {
      setInitialUsers(dataUsers.data)
      setUsers(dataUsers.data)
    }
  }, [isLoading, dataUsers])

  async function deleteAction() {
    try {
      if (userIDDelete !== '') {
        await deleteUser(userIDDelete)
      }
      displaySuccess('Supprimer avec sucess', "L'utilisateur a bien été supprimer avec sucess")
      queryClient.invalidateQueries(['getAllUsers'])
      queryClient.invalidateQueries(['getCountUsers'])
    } catch (error) {
      displayError(error.messages)
    } finally {
      setOpenModal(false)
    }
    setUserIDDelete('')
    setOpenModal(false)
  }

  function DeleteMultiUsers() {
    setOpenModal(true)
  }

  function handleChange(event) {
    const filter = event.target.value.trim().toLowerCase()
    const result = filtredValues(initialUsers, filter)
    setUsers(filter === '' ? initialUsers : result)
  }

  return (
    <div>
      <Styles>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-2">
              <CCardHeader>
                <CRow>
                  <CCol xs={4} className="d-flex align-items-center">
                    <strong className="text-primary">Liste des utilisateurs</strong>
                  </CCol>

                  <CCol xs={4} className="align-self-center">
                    <CFormInput
                      id="recherche"
                      size="sm"
                      placeholder="Chercher ..."
                      onChange={handleChange}
                    />
                  </CCol>
                  <CCol xs={4} className="d-flex align-items-center justify-content-end">
                    {selection.length >= 1 && (
                      <CButton
                        color="danger"
                        className="align-middle mx-3"
                        variant="outline"
                        shape="rounded-pill"
                        onClick={() => DeleteMultiUsers()}
                      >
                        <CIcon icon={icon.cilLibraryAdd} size="sm" /> Supprimer
                      </CButton>
                    )}
                    <CButton
                      className="align-middle ml-2"
                      color="success"
                      variant="outline"
                      shape="rounded-pill"
                      onClick={() =>
                        navigate('/user-add', {
                          state: { userTypes: 'UserTypeAbdel' },
                        })
                      }
                    >
                      <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                    </CButton>
                  </CCol>
                </CRow>
              </CCardHeader>

              {users && Array.isArray(users) ? (
                <CCardBody className="custom-card-body">
                  <Table
                    ref={tableRefUsers}
                    columns={columnsUsers}
                    data={users}
                    ischeckbox={true}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setOpenModal={setOpenModal}
                    onSelectedRowChange={setSelection}
                    fromPage={'users'}
                    userConnected={user.username}
                    onDelete={handleDeleteUser}
                  />
                </CCardBody>
              ) : (
                isLoading && <CSpinner color="primary" variant="grow" />
              )}
            </CCard>
            <ModalAction
              openModal={openModal}
              setOpenModal={setOpenModal}
              action={
                <CButton color="danger" onClick={deleteAction}>
                  Désactiver
                </CButton>
              }
            />
          </CCol>
        </CRow>
      </Styles>
    </div>
  )
}

export default Users
