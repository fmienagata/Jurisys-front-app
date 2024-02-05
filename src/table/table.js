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
  (
    {
      columns,
      data,
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
      canPreviousPage,
      canNextPage,
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
                    color={i % 2 === 0 ? '#563d7c' : 'primary'}
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

          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={data.length}
            rowsPerPage={10}
            page={pageIndex}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
            ActionsComponent={TablePaginationActions}
          />
        </Styles>
      </>
    )
  },
)

export default Table
