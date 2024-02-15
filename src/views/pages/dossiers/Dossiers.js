import React, { useEffect, useState } from 'react'
import Register from '../register/Register'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CPaginationItem,
  CPagination,
  CButton,
} from '@coreui/react'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import styled from 'styled-components'

import baseUrlMock from 'src/services/mock-dossiers.json'

import { getDossiers } from '../../../services/dossiersService'
import { useSelector, useDispatch } from 'react-redux'

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

const Dossiers = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])
  const [dossiers, setDossiers] = useState([])
  const [loading, setLoading] = useState(true)
  const [columns, setColumns] = useState([])
  const [error, setError] = useState(null)

  const columns2 = [
    {
      Header: 'Nom',
      accessor: 'nom',
    },
    {
      Header: 'prenom',
      accessor: 'prenom',
    },
    {
      Header: 'adresse',
      accessor: 'adresse',
    },
    {
      Header: 'email',
      accessor: 'email',
    },
    {
      Header: 'telephone',
      accessor: 'telephone',
    },
    {
      Header: 'societe',
      accessor: 'societe',
    },
    {
      Header: 'ville',
      accessor: 'ville',
    },
    {
      Header: 'pays',
      accessor: 'pays',
    },
    {
      Header: 'juridiction',
      accessor: 'juridiction',
    },
    {
      Header: 'montant',
      accessor: 'montantPrejudice',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]

  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      const dossiersData = await getDossiers()
      setDossiers(dossiersData)
      setColumns(columns2)
      dispatch({ type: 'GET_DATA_DOSSIERS', payload: dossiersData })
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
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      {/* <Modal titleMessage="tester title messages" bodyMessage="tester body messages" /> */}
      <div>
        <Styles>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong className="align-self-start">Liste des dossiers</strong>
                  <CButton className="align-self-end" color="success" variant="outline">
                    <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                  </CButton>
                </CCardHeader>
                <CCardBody>
                  <Table
                    columns={columns}
                    data={dossiers}
                    ischeckbox={true}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    onSelectedRowChange={setSelection}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </Styles>
      </div>
    </div>
  )
}

export default Dossiers
