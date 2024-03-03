import React, { useState, useRef, useEffect } from 'react'
import { useRowSelect } from 'react-table'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { CButton } from '@coreui/react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import ModalAction from 'src/components/ModalAction'

import { useDispatch } from 'react-redux'

import { getUsers, deleteUser } from '../../../services/usersService'
import { useMessageContext } from 'src/Context/MessageContext'
import Styles from './../../../table/TableStyles'

const Users = () => {
  const tableRefUsers = useRef(typeof useRowSelect)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { displayError, displaySuccess } = useMessageContext()

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
    {
      Header: 'UserIdentifier',
      accessor: 'userIdentifier',
    },
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
  const [loading, setLoading] = useState(true)
  const [columns, setColumns] = useState([])

  const [userIDDelete, setUserIDDelete] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const usersData = await getUsers()
      if (Array.isArray(usersData)) {
        setUsers(usersData)
        setColumns(columnsUsers)
        dispatch({ type: 'GET_DATA_USERS', payload: usersData })
      } else {
        displayError(
          'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
        )
      }
    } catch (error) {
      displayError(error.messages)
    } finally {
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteUser = (userId) => {
    setOpenModal(true)
    setUserIDDelete(userId)
  }

  async function deleteAction() {
    try {
      if (userIDDelete !== '') {
        await deleteUser(userIDDelete)
      } else {
        console.log('selection pour delete =>', selection)
      }

      displaySuccess('Supprimer avec sucess')
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

  return (
    <div>
      <Styles>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong className="align-self-start">Liste des utilisateurs</strong>
                <div
                  className="align-self-end"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {selection.length >= 2 && (
                    <CButton
                      className="mr-2"
                      color="danger"
                      variant="outline"
                      onClick={() => DeleteMultiUsers()}
                    >
                      <CIcon icon={icon.cilLibraryAdd} size="sm" /> Supprimer
                    </CButton>
                  )}
                  <CButton
                    className="align-self-end"
                    color="success"
                    variant="outline"
                    onClick={() => navigate('/user-add')}
                  >
                    <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                  </CButton>
                </div>
              </CCardHeader>

              {users.length > 1 && Array.isArray(users) ? (
                <CCardBody className="custom-card-body">
                  <Table
                    ref={tableRefUsers}
                    columns={columns}
                    data={users}
                    ischeckbox={true}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setOpenModal={setOpenModal}
                    onSelectedRowChange={setSelection}
                    fromPage={'users'}
                    onDelete={handleDeleteUser}
                  />
                </CCardBody>
              ) : (
                loading && <CSpinner color="primary" variant="grow" />
              )}
            </CCard>
            <ModalAction
              openModal={openModal}
              setOpenModal={setOpenModal}
              action={
                <CButton color="danger" onClick={deleteAction}>
                  Supprimer
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
