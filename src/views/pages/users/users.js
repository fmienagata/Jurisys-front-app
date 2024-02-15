import React, { useState, useReducer, useRef, useEffect } from 'react'
import { useRowSelect } from 'react-table'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { CButton } from '@coreui/react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import ModalAction from 'src/components/Modal'

import baseUrlMock from 'src/services/mock-users.json'
import { useSelector, useDispatch } from 'react-redux'

import { getUsers } from '../../../services/usersService'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    width: -webkit-fill-available;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const Users = () => {
  const tableRefUsers = useRef(typeof useRowSelect)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.dataUsers.data)

  const columns2 = [
    {
      Header: 'nom',
      accessor: 'nom',
    },
    {
      Header: 'prenom',
      accessor: 'prenom',
    },
    {
      Header: 'username',
      accessor: 'username',
    },
    {
      Header: 'userIdentifier',
      accessor: 'userIdentifier',
    },
    {
      Header: 'societe',
      accessor: 'societe',
    },
    {
      Header: 'email',
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
  const [errors, setError] = useState(true)
  const [columns, setColumns] = useState([])

  const fetchData = async () => {
    try {
      const usersData = await getUsers()
      setUsers(usersData)
      setColumns(columns2)
      dispatch({ type: 'GET_DATA_USERS', payload: usersData })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Styles>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong className="align-self-start">Liste des Clients</strong>
                <CButton
                  className="align-self-end"
                  color="success"
                  variant="outline"
                  onClick={() => navigate('/user-add')}
                >
                  <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                </CButton>
              </CCardHeader>
              <CCardBody>
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
                />
              </CCardBody>
            </CCard>
            <ModalAction openModal={openModal} setOpenModal={setOpenModal} />
          </CCol>
        </CRow>
      </Styles>
    </div>
  )
}

export default Users
