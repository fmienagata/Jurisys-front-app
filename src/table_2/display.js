import React, { useState, useEffect, useRef } from 'react'
import { Datatable } from './table2'
import { useRowSelect } from 'react-table'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { CButton } from '@coreui/react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CPaginationItem,
  CPagination,
} from '@coreui/react'
import styled from 'styled-components'

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

const Display = () => {
  const tableRef = useRef(typeof useRowSelect)

  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Visits',
      accessor: 'visits',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Profile Progress',
      accessor: 'progress',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]

  const data = [
    {
      id: '0001',
      firstName: 'revenue',
      lastName: 'instance',
      age: 16,
      visits: 50,
      progress: 4,
      status: 'single',
    },
    {
      id: '0002',
      firstName: 'hearing',
      lastName: 'calendar',
      age: 8,
      visits: 47,
      progress: 0,
      status: 'single',
    },
    {
      id: '0003',
      firstName: 'proposal',
      lastName: 'account',
      age: 26,
      visits: 5,
      progress: 79,
      status: 'single',
    },
    {
      id: '0004',
      firstName: 'girlfriend',
      lastName: 'driving',
      age: 10,
      visits: 8,
      progress: 88,
      status: 'single',
    },
    {
      id: '0005',
      firstName: 'partner',
      lastName: 'toad',
      age: 21,
      visits: 7,
      progress: 42,
      status: 'relationship',
    },
    {
      id: '0006',
      firstName: 'entertainment',
      lastName: 'offer',
      age: 5,
      visits: 52,
      progress: 63,
      status: 'complicated',
    },
    {
      id: '0007',
      firstName: 'start',
      lastName: 'situation',
      age: 23,
      visits: 74,
      progress: 89,
      status: 'single',
    },
    {
      id: '0008',
      firstName: 'student',
      lastName: 'employee',
      age: 16,
      visits: 21,
      progress: 14,
      status: 'relationship',
    },
    {
      id: '0009',
      firstName: 'steak',
      lastName: 'shock',
      age: 28,
      visits: 64,
      progress: 85,
      status: 'relationship',
    },
    {
      id: '00010',
      firstName: 'twig',
      lastName: 'arithmetic',
      age: 25,
      visits: 72,
      progress: 75,
      status: 'single',
    },
    {
      id: '12123',
      firstName: 'son',
      lastName: 'park',
      age: 20,
      visits: 85,
      progress: 10,
      status: 'complicated',
    },
    {
      id: '12123',
      firstName: 'vase',
      lastName: 'trees',
      age: 13,
      visits: 65,
      progress: 66,
      status: 'relationship',
    },
    {
      id: '12123',
      firstName: 'attack',
      lastName: 'responsibility',
      age: 9,
      visits: 29,
      progress: 33,
      status: 'complicated',
    },
    {
      id: '12123',
      firstName: 'category',
      lastName: 'grass',
      age: 17,
      visits: 58,
      progress: 70,
      status: 'complicated',
    },
    {
      id: '12123',
      firstName: 'prose',
      lastName: 'home',
      age: 6,
      visits: 67,
      progress: 84,
      status: 'single',
    },
    {
      id: '12123',
      firstName: 'coat',
      lastName: 'door',
      age: 8,
      visits: 73,
      progress: 72,
      status: 'single',
    },
    {
      id: '12123',
      firstName: 'hammer',
      lastName: 'rail',
      age: 15,
      visits: 86,
      progress: 90,
      status: 'complicated',
    },
    {
      id: '12123',
      firstName: 'cars',
      lastName: 'class',
      age: 21,
      visits: 43,
      progress: 94,
      status: 'relationship',
    },
    {
      id: '12123',
      firstName: 'volume',
      lastName: 'apple',
      age: 2,
      visits: 2,
      progress: 36,
      status: 'complicated',
    },
    {
      id: '12123',
      firstName: 'airplane',
      lastName: 'sleep',
      age: 25,
      visits: 85,
      progress: 95,
      status: 'relationship',
    },
    {
      id: '12123',
      firstName: 'revenue',
      lastName: 'instance',
      age: 16,
      visits: 50,
      progress: 4,
      status: 'single',
    },
    {
      id: '12123',
      firstName: 'hearing',
      lastName: 'calendar',
      age: 8,
      visits: 47,
      progress: 0,
      status: 'single',
    },
    {
      id: '12123',
      firstName: 'proposal',
      lastName: 'account',
      age: 26,
      visits: 5,
      progress: 79,
      status: 'single',
    },
    {
      id: '12123',
      firstName: 'girlfriend',
      lastName: 'driving',
      age: 10,
      visits: 8,
      progress: 88,
      status: 'single',
    },
    {
      id: '12123',
      firstName: 'partner',
      lastName: 'toad',
      age: 21,
      visits: 7,
      progress: 42,
      status: 'relationship',
    },
    {
      id: '12123',
      firstName: 'entertainment',
      lastName: 'offer',
      age: 5,
      visits: 52,
      progress: 63,
      status: 'complicated',
    },
    {
      id: '12123',
      firstName: 'start',
      lastName: 'situation',
      age: 23,
      visits: 74,
      progress: 89,
      status: 'single',
    },
    {
      id: '12123',
      firstName: 'student',
      lastName: 'employee',
      age: 16,
      visits: 21,
      progress: 14,
      status: 'relationship',
    },
    {
      id: '12123',
      firstName: 'steak',
      lastName: 'shock',
      age: 28,
      visits: 64,
      progress: 85,
      status: 'relationship',
    },
    {
      id: '12123',
      firstName: 'twig',
      lastName: 'arithmetic',
      age: 25,
      visits: 72,
      progress: 75,
      status: 'single',
    },
    {
      id: '12123',
      firstName: 'son',
      lastName: 'park',
      age: 20,
      visits: 85,
      progress: 10,
      status: 'complicated',
    },
    {
      id: '12123',
      firstName: 'vase',
      lastName: 'trees',
      age: 13,
      visits: 65,
      progress: 66,
      status: 'relationship',
    },
    {
      id: '12123',
      firstName: 'attack',
      lastName: 'responsibility',
      age: 9,
      visits: 29,
      progress: 33,
      status: 'complicated',
    },
    {
      id: '12123',
      firstName: 'category',
      lastName: 'grass',
      age: 17,
      visits: 58,
      progress: 70,
      status: 'complicated',
    },
    {
      id: '12123',
      firstName: 'prose',
      lastName: 'home',
      age: 6,
      visits: 67,
      progress: 84,
      status: 'single',
    },
    {
      id: '12123',
      firstName: 'coat',
      lastName: 'door',
      age: 8,
      visits: 73,
      progress: 72,
      status: 'single',
    },
    {
      id: '12123',
      firstName: 'hammer',
      lastName: 'rail',
      age: 15,
      visits: 86,
      progress: 90,
      status: 'complicated',
    },
    {
      id: '12123',
      firstName: 'cars',
      lastName: 'class',
      age: 21,
      visits: 43,
      progress: 94,
      status: 'relationship',
    },
    {
      id: '12123',
      firstName: 'volume',
      lastName: 'apple',
      age: 2,
      visits: 2,
      progress: 36,
      status: 'complicated',
    },
    {
      id: '12123',
      firstName: 'airplane',
      lastName: 'sleep',
      age: 25,
      visits: 85,
      progress: 95,
      status: 'relationship',
    },
  ]

  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])

  return (
    <div>
      <h1>DataTable with Pagination, Sorting, and Row Selection</h1>
      {/* <DataTable columns={columns} data={data} /> */}
      {/* <Datatable
        ref={tableRef}
        columns={columns}
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSelectedRowChange={setSelection}
        onLineClick={handleLineClick}
        selection={selection}
      /> */}

      <div>
        <Styles>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong className="align-self-start">Liste des Clients</strong>
                  <CButton className="align-self-end" color="success" variant="outline">
                    <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                  </CButton>
                </CCardHeader>
                <CCardBody>
                  <Table
                    ref={tableRef}
                    columns={columns}
                    data={data}
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

export default Display
