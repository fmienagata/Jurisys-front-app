import React from 'react'
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

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'

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

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination,
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr
                style={{ backgroundColor: i % 2 === 0 ? 'rgb(237 239 241)' : '' }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  if (cell.column.Header == 'Actions') {
                    return (
                      <td>
                        <CButton color="success" variant="ghost" size="sm">
                          <CIcon icon={icon.cilClone} size="sm" />
                        </CButton>
                        <CButton color="primary" variant="ghost" size="sm">
                          <CIcon icon={icon.cilPen} size="sm" />
                        </CButton>
                        <CButton color="danger" variant="ghost" size="sm">
                          <CIcon icon={icon.cilTrash} size="sm" />
                        </CButton>
                      </td>
                    )
                  }
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <CPagination aria-label="Page navigation example">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10PX',
            width: '100%',
          }}
        >
          <div style={{display:'flex'}}>
            <CPaginationItem
              aria-label="Previous"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem>
              <span>
                Page
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
            </CPaginationItem>
            <CPaginationItem aria-label="Next" onClick={() => nextPage()} disabled={!canNextPage}>
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </CPagination>
    </>
  )
}

const ListUser = () => {
  const columns = React.useMemo(
    () => [
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
    ],
    [],
  )

  const data = [
    {
      firstName: 'revenue',
      lastName: 'instance',
      age: 16,
      visits: 50,
      progress: 4,
      status: 'single',
    },
    {
      firstName: 'hearing',
      lastName: 'calendar',
      age: 8,
      visits: 47,
      progress: 0,
      status: 'single',
    },
    {
      firstName: 'proposal',
      lastName: 'account',
      age: 26,
      visits: 5,
      progress: 79,
      status: 'single',
    },
    {
      firstName: 'girlfriend',
      lastName: 'driving',
      age: 10,
      visits: 8,
      progress: 88,
      status: 'single',
    },
    {
      firstName: 'partner',
      lastName: 'toad',
      age: 21,
      visits: 7,
      progress: 42,
      status: 'relationship',
    },
    {
      firstName: 'entertainment',
      lastName: 'offer',
      age: 5,
      visits: 52,
      progress: 63,
      status: 'complicated',
    },
    {
      firstName: 'start',
      lastName: 'situation',
      age: 23,
      visits: 74,
      progress: 89,
      status: 'single',
    },
    {
      firstName: 'student',
      lastName: 'employee',
      age: 16,
      visits: 21,
      progress: 14,
      status: 'relationship',
    },
    {
      firstName: 'steak',
      lastName: 'shock',
      age: 28,
      visits: 64,
      progress: 85,
      status: 'relationship',
    },
    {
      firstName: 'twig',
      lastName: 'arithmetic',
      age: 25,
      visits: 72,
      progress: 75,
      status: 'single',
    },
    {
      firstName: 'son',
      lastName: 'park',
      age: 20,
      visits: 85,
      progress: 10,
      status: 'complicated',
    },
    {
      firstName: 'vase',
      lastName: 'trees',
      age: 13,
      visits: 65,
      progress: 66,
      status: 'relationship',
    },
    {
      firstName: 'attack',
      lastName: 'responsibility',
      age: 9,
      visits: 29,
      progress: 33,
      status: 'complicated',
    },
    {
      firstName: 'category',
      lastName: 'grass',
      age: 17,
      visits: 58,
      progress: 70,
      status: 'complicated',
    },
    {
      firstName: 'prose',
      lastName: 'home',
      age: 6,
      visits: 67,
      progress: 84,
      status: 'single',
    },
    {
      firstName: 'coat',
      lastName: 'door',
      age: 8,
      visits: 73,
      progress: 72,
      status: 'single',
    },
    {
      firstName: 'hammer',
      lastName: 'rail',
      age: 15,
      visits: 86,
      progress: 90,
      status: 'complicated',
    },
    {
      firstName: 'cars',
      lastName: 'class',
      age: 21,
      visits: 43,
      progress: 94,
      status: 'relationship',
    },
    {
      firstName: 'volume',
      lastName: 'apple',
      age: 2,
      visits: 2,
      progress: 36,
      status: 'complicated',
    },
    {
      firstName: 'airplane',
      lastName: 'sleep',
      age: 25,
      visits: 85,
      progress: 95,
      status: 'relationship',
    },
  ]
  return (
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
              <Table columns={columns} data={data} defaultPageSize={1} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </Styles>
  )
}

export default ListUser
