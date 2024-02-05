/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import React, { forwardRef, useImperativeHandle } from 'react'

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
  CTableRow,
  CTableDataCell,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
} from '@coreui/react'

import { TableSortLabel } from '@mui/material'

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { deepEqual } from 'src/utils/tableUtils'

import styled from 'styled-components'
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useMountedLayoutEffect,
} from 'react-table'
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

const Table = forwardRef(
  ({ data, columns, currentPage, setCurrentPage, onSelectedRowChange, onLineClick }, ref) => {
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
      state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
      {
        columns,
        data,
        initialState: {
          pageIndex: currentPage - 1,
          pageSize: 10,
          selectedRowIds: {},
          hiddenColumns: ['id'],
        },
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
      setCurrentPage(1)
      gotoPage(0)
    }

    const handleBackButtonClick = (event) => {
      setCurrentPage(currentPage - 1)
      gotoPage(page - currentPage)
    }

    const handleNextButtonClick = (event) => {
      setCurrentPage(currentPage + 1)
      gotoPage(page + currentPage)
    }

    const handleLastPageButtonClick = (event) => {
      setCurrentPage(lastPage + 1)
      gotoPage(lastPage)
    }

    useImperativeHandle(ref, () => ({
      toggleAllRowsSelected,
    }))

    const getSelectedRows = () => {
      const selectedIds = Object.keys(selectedRowIds)

      return selectedIds.map((x) => data[x]).filter((x) => x !== null)
    }

    const handleLineClick = (row) => {
      return onLineClick !== undefined ? onLineClick(row.original) : null
    }

    useMountedLayoutEffect(() => {
      if (onSelectedRowChange !== undefined) {
        // onSelectedRowChange(getSelectedRows())
      }
    }, [selectedRowIds])

    return (
      <>
        <CTable {...getTableProps()} sorter={true}>
          <CTableHead>
            {headerGroups.map((headerGroup) => (
              <CTableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <CTableHeaderCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    {...column.getHeaderProps()}
                  >
                    <i className="cis-sort-ascending"></i>

                    {column.canSort ? (
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      >
                        <i className="cis-sort-ascending">{column.render('Header')}</i>
                      </TableSortLabel>
                    ) : (
                      column.render('Header')
                    )}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            ))}
          </CTableHead>
          <CTableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <CTableRow
                  style={{ backgroundColor: i % 2 === 0 ? 'rgb(237 239 241)' : '' }}
                  {...row.getRowProps()}
                  onClick={() => handleLineClick(row)}
                >
                  {row.cells.map((cell) => {
                    if (cell.column.Header === 'Actions') {
                      return (
                        <CTableDataCell>
                          <CButton color="success" variant="ghost" size="sm">
                            <CIcon icon={icon.cilClone} size="sm" />
                          </CButton>
                          <CButton color="primary" variant="ghost" size="sm">
                            <CIcon icon={icon.cilPen} size="sm" />
                          </CButton>
                          <CButton color="danger" variant="ghost" size="sm">
                            <CIcon icon={icon.cilTrash} size="sm" />
                          </CButton>
                        </CTableDataCell>
                      )
                    }
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </CTableRow>
              )
            })}
          </CTableBody>
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
                  console.og('pade index', pageIndex)
                  handleFirstPageButtonClick()
                }}
                disabled={!canPreviousPage}
              >
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              <CPaginationItem
                aria-label="Previous"
                onClick={() => {
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
                  handleNextButtonClick()
                }}
                disabled={!canNextPage}
              >
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
              <CPaginationItem
                aria-label="Next"
                onClick={() => {
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
  },
)
Table.displayName = 'Table'

const Datatable = ({
  data,
  columns,
  currentPage,
  setCurrentPage,
  onSelectedRowChange,
  onLineClick,
  selection,
  ref,
}) => {
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
                onSelectedRowChange={onSelectedRowChange}
                selection={selection}
                onLineClick={onLineClick}
                ref={ref}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </Styles>
  )
}

export { Datatable, Table }
