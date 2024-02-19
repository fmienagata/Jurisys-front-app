/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import {
  useMountedLayoutEffect,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table'
import { useNavigate } from 'react-router-dom'

import { IconButton, TableSortLabel, TablePagination } from '@mui/material'
import {
  CButton,
  CTable,
  CTableRow,
  CTableDataCell,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

import { Checkbox } from './checkbox'

import TablePaginationActions from './tablePaginationActions'

import styled from 'styled-components'

const Styles = styled.div`
  .table > :not(caption) > * > * {
    padding: 0rem 0rem;
    color: var(--cui-table-color-state, var(--cui-table-color-type, var(--cui-table-color)));
    background-color: var(--cui-table-bg);
    border-bottom-width: var(--cui-border-width);
    box-shadow: inset 0 0 0 9999px
      var(--cui-table-bg-state, var(--cui-table-bg-type, var(--cui-table-accent-bg)));
  }

  .muStyle {
    margin: 0;
    /* padding: 0.5rem; */
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    vertical-align: middle;
    text-align: center;
  }
`
const Table = forwardRef(
  (
    {
      columns,
      data,
      onDelete,
      fromPage,
      manualPagination = false,
      onSelectedRowChange,
      isFetchDataFinished = true,
      filterValue = '',
      count,
      onLineClick,
      ischeckbox,
      isRadio,
      icons,
      currentPage,
      setCurrentPage,
      setOpenModal,
      setSortColumn,
      selectedFlatRows,
      heightTree,
    },
    ref,
  ) => {
    // Customizable header
    const anchorRef = useRef(null)
    const [openMenu, setOpenMenu] = useState(false)
    const toggleMenu = () => setOpenMenu(!openMenu)
    const navigate = useNavigate()

    const generateIconMenu = (hooks) =>
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          Header: () => (
            <IconButton
              data-testid="table-header-menu"
              ref={anchorRef}
              onClick={toggleMenu}
              sx={{
                color: 'inherit',
                '&:hover': { opacity: 0.5 },
              }}
            >
              {/* <CobaltIcon name="settings" fontSize={20} /> */}
              <CIcon icon={cilList} className="text-primary" size="xl" />
            </IconButton>
          ),
          id: 'icons',
          Cell: () => icons,
        },
      ])

    const generateDefaultRows = (hooks) => hooks.visibleColumns.push((columns) => [...columns])

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

    // Table main hook
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      // canPreviousPage,
      // canNextPage,
      toggleAllRowsSelected,
      gotoPage,
      setPageSize,
      state: { pageIndex, selectedRowIds },
    } = useTable(
      {
        columns,
        data,
        initialState: {
          pageIndex: currentPage,
          pageSize: 10,
          selectedRowIds: {},
          hiddenColumns: ['id'],
        },
        manualPagination: manualPagination,
        autoResetPage: manualPagination,
        autoResetSelectedRows: false,
      },
      useSortBy,
      usePagination,
      useRowSelect,
      (hooks) => {
        if (ischeckbox) generateCheckboxRows(hooks)
        if (icons) return generateIconMenu(hooks)
        return generateDefaultRows(hooks)
      },
    )

    // Pagination
    const handleChangePage = (event, newPage) => {
      setCurrentPage(newPage)
      return gotoPage(newPage)
    }
    // Row selection
    useImperativeHandle(ref, () => ({
      toggleAllRowsSelected,
    }))

    const getSelectedRows = () => {
      const selectedIds = Object.keys(selectedRowIds)
      return selectedIds.map((x) => data[x]).filter((x) => x !== null)
    }

    // Renew selected rows header count
    useMountedLayoutEffect(() => {
      if (onSelectedRowChange !== undefined) {
        onSelectedRowChange(getSelectedRows())
      }
    }, [selectedRowIds])

    const handleLineClick = (row) => {
      return onLineClick !== undefined ? onLineClick(row.original) : null
    }

    return (
      <>
        <Styles>
          <CTable {...getTableProps()}>
            <CTableHead>
              {headerGroups.map((headerGroup) => (
                <CTableRow {...headerGroup.getHeaderGroupProps()} className="muStyle">
                  {headerGroup.headers.map((column) => (
                    <CTableHeaderCell
                      className="muStyle"
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
                    className="muStyle"
                    color={i % 2 === 0 ? '#563d7c' : 'primary'}
                    {...row.getRowProps()}
                    onClick={() => handleLineClick(row)}
                  >
                    {row.cells.map((cell) => {
                      if (cell.column.Header === 'Actions') {
                        return (
                          <CTableDataCell className="muStyle">
                            <CButton
                              color="success"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                fromPage && fromPage === 'users'
                                  ? navigate('/user-display/' + row.original.id, {
                                      state: { data: row.original },
                                    })
                                  : navigate('/dossier/' + row.original.id, {
                                      state: { data: row.original },
                                    })
                              }}
                            >
                              <CIcon icon={icon.cilFolderOpen} size="sm" />
                            </CButton>
                            <CButton
                              color="primary"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                fromPage && fromPage === 'users'
                                  ? navigate('/user-edit/' + row.original.id, {
                                      state: { data: row.original },
                                    })
                                  : navigate('/dossier-edit/' + row.original.id, {
                                      state: { data: row.original },
                                    })
                              }}
                            >
                              <CIcon icon={icon.cilPen} size="sm" />
                            </CButton>
                            <CButton
                              color="danger"
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete(row.original.id)}
                            >
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
          <div style={{ display: 'inline-block', marginLeft: '10px', width: '100%' }}>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={data.length}
              rowsPerPage={10}
              page={pageIndex}
              // canNextPage={canNextPage}
              // canPreviousPage={canPreviousPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
              ActionsComponent={TablePaginationActions}
            />
          </div>
        </Styles>
      </>
    )
  },
)

export default Table
