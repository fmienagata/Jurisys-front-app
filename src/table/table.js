/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import CIcon from '@coreui/icons-react'

import { CPaginationItem, CPagination } from '@coreui/react'

import {
  Row,
  useGlobalFilter,
  useMountedLayoutEffect,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table'

import {
  Box,
  CircularProgress,
  IconButton,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  TableSortLabel,
  TablePagination,
} from '@mui/material'

import { Checkbox } from './checkbox'

import TablePaginationActions from './tablePaginationActions'

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

    // Rows
    const emptyRows = !isFetchDataFinished ? 10 : 0

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
      toggleAllRowsSelected,
      allColumns,
      headerGroups,
      page,
      nextPage,
      prepareRow,
      gotoPage,
      setPageSize,
      setGlobalFilter,
      state: { pageIndex, selectedRowIds },
    } = useTable(
      {
        columns,
        data,
        pageCount: count,
        initialState: {
          pageIndex: currentPage - 1,
          selectedRowIds: {},
        },
        manualPagination: manualPagination,
        autoResetPage: manualPagination,
        autoResetSelectedRows: false,
      },
      useGlobalFilter,
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
      console.log('currentPage', currentPage)
      setCurrentPage(newPage)
      console.log('currentPage after newPage:', newPage)
      gotoPage(newPage)
      console.log('currentPage', currentPage)
    }
    // Row selection
    // Make toggle accessible from external components
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
      console.log('row -> ', row.id, row.original.id)
      return onLineClick !== undefined ? onLineClick(row.original) : null
    }

    return (
      <>
        <Stack mt={1.75} spacing={1}>
          <Paper sx={{ pb: 1 }}>
            <TableContainer sx={{ maxHeight: '54vh' }}>
              <MuiTable stickyHeader {...getTableProps()}>
                <TableHead
                  sx={{
                    'tr th': {
                      borderBottom: '1',
                      borderColor: 'cobalt.grey10',
                    },
                  }}
                >
                  {headerGroups.map((headerGroup) => (
                    <TableRow
                      sx={{
                        thead: {
                          borderBottom: 10,
                          borderColor: 'red',
                        },
                        'th:first-of-type': {
                          pl: '24px',
                          position: 'sticky',
                          left: 0,
                          zIndex: 3,
                        },
                        'th:last-child': {
                          position: 'sticky',
                          right: 0,
                          zIndex: 3,
                          textAlign: ischeckbox ? 'end' : 'start',
                        },
                      }}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column, index) => (
                        <TableCell
                          data-testid={`th` + index}
                          sx={{
                            p: '10px',
                            whiteSpace: 'nowrap',
                            maxWidth: column.maxWidth,
                          }}
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                        >
                          {column.canSort ? (
                            <TableSortLabel
                              active={column.isSorted}
                              direction={column.isSortedDesc ? 'desc' : 'asc'}
                            >
                              {column.render('Header')}
                            </TableSortLabel>
                          ) : (
                            column.render('Header')
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>

                <TableBody {...getTableBodyProps()}>
                  {!isFetchDataFinished && (
                    <>
                      <TableRow
                        data-testid={`tr` + 0}
                        sx={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell />
                      </TableRow>
                      <Box
                        sx={{
                          display: 'flex',
                          position: 'fixed',
                          top: '60%',
                          left: '50%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: 100,
                        }}
                      >
                        <CircularProgress disableShrink />
                      </Box>
                    </>
                  )}
                  {isFetchDataFinished &&
                    page.map((row, index) => {
                      prepareRow(row)
                      return (
                        <TableRow
                          data-testid={`tr` + index}
                          hover
                          onClick={() => handleLineClick(row)}
                          selected={row.isSelected}
                          sx={{
                            cursor: onLineClick !== undefined ? 'pointer' : '',
                            backgroundColor: 'cobalt.white',
                            td: {
                              borderBottom: 1,
                              borderColor: 'cobalt.grey10',
                            },

                            'td:first-of-type': {
                              pl: '24px',
                              position: 'sticky',
                              left: 0,
                              zIndex: 1,
                              backgroundColor: 'inherit',
                              cursor: 'default',
                            },
                            'td:last-child': {
                              pr: '24px',
                              position: 'sticky',
                              right: 0,
                              zIndex: 1,
                              backgroundColor: 'inherit',
                              cursor: 'default',
                              textAlign: ischeckbox ? 'end' : 'start',
                            },
                          }}
                          {...row.getRowProps()}
                        >
                          {row.cells.map((cell, i) => {
                            return (
                              <TableCell
                                data-testid={'cell' + index + '-' + i}
                                sx={{
                                  p: '10px',
                                  whiteSpace: 'nowrap',
                                }}
                                {...cell.getCellProps()}
                              >
                                {cell.render('Cell')}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })}
                </TableBody>
              </MuiTable>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={data.length}
              rowsPerPage={10}
              page={pageIndex}
              onPageChange={handleChangePage}
              onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
              ActionsComponent={TablePaginationActions}
            />
          </Paper>
        </Stack>
      </>
    )
  },
)

export default Table
