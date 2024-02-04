/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
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
  CTable,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

import styled from 'styled-components'
import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table'
import { Checkbox } from 'src/table/checkbox'

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

function Table({ data, columns, currentPage, setCurrentPage }) {
  const generateCheckboxRows = (hooks) =>
    hooks.visibleColumns.push((columns) => [
      {
        id: 'selection',
        Header: ({ getToggleAllPageRowsSelectedProps }) => (
          <Checkbox {...getToggleAllPageRowsSelectedProps()} />
        ),
        Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
      },
      ...columns,
    ])
  const generateDefaultRows = (hooks) => hooks.visibleColumns.push((columns) => [...columns])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    toggleAllRowsSelected,
    nextPage,
    gotoPage,
    previousPage,
    onPageChange,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: currentPage - 1, pageSize: 10, hiddenColumns: ['id'] },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (true) generateCheckboxRows(hooks)
      return generateDefaultRows(hooks)
    },
  )

  const lastPage = Math.max(0, Math.ceil(data.length / pageSize) - 1)

  const handleFirstPageButtonClick = (event) => {
    console.log('pages -> ', page)
    setCurrentPage(1)
    gotoPage(0)
  }

  const handleBackButtonClick = (event) => {
    console.log('pages -> ', page)
    setCurrentPage(currentPage - 1)
    gotoPage(page - 1)
  }

  const handleNextButtonClick = (event) => {
    console.log('pages -> ', page)
    setCurrentPage(currentPage + 1)
    gotoPage(page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    console.log('pages -> ', page)
    setCurrentPage(lastPage + 1)
    gotoPage(lastPage)
  }

  const handleChangePage = (event, newPage) => {
    console.log('currentPage', currentPage)
    setCurrentPage(newPage)
    gotoPage(newPage)
  }
  const handleLineClick = (row) => {
    console.log('row -> ', row.id, row.original.id)
  }

  // Render the UI for your table
  return (
    <>
      <CDataTable {...getTableProps()} sorter={true}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
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
                onClick={() => handleLineClick(row)}
              >
                {row.cells.map((cell) => {
                  if (cell.column.Header === 'Actions') {
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
      </CTable>
      <CPagination aria-label="Page navigation example">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10PX',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex' }}>
            <CPaginationItem
              aria-label="Previous"
              onClick={() => {
                console.log('page=> ', pageIndex)
                handleFirstPageButtonClick()
              }}
              disabled={!canPreviousPage}
            >
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem
              aria-label="Previous"
              onClick={() => {
                console.log('page=> ', pageIndex)
                handleBackButtonClick()
              }}
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
            <CPaginationItem
              aria-label="Next"
              onClick={() => {
                console.log('page=> ', pageIndex)
                handleNextButtonClick()
              }}
              disabled={!canNextPage}
            >
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
            <CPaginationItem
              aria-label="Next"
              onClick={() => {
                console.log('page=> ', pageIndex)
                handleLastPageButtonClick()
              }}
              disabled={!canNextPage}
            >
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </div>
        </div>
      </CPagination>
    </>
  )
}

const Datatable = ({ data, columns, currentPage, setCurrentPage }) => {
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
              <Table
                columns={columns}
                data={data}
                defaultPageSize={1}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </Styles>
  )
}

export default Datatable
