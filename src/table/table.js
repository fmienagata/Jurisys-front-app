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
  CBadge,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { Checkbox } from './checkbox'
import TablePaginationActions from './tablePaginationActions'
import ModalMessageType from 'src/components/ModalMessageType'
import ModalSociete from 'src/components/ModalSocietes'
import Styles from 'src/table/TableStyles.js'

const Table = forwardRef(
  (
    {
      columns,
      data,
      onDelete,
      isActif,
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
    const [openMessage, setOpenMessage] = useState(false)
    const [message, setMessage] = useState(false)

    const [openSociete, setOpenSociete] = useState(false)
    const [societe, setSociete] = useState(false)

    const title =
      isActif === undefined ? 'Désactiver / Supprimer' : isActif ? 'Archiver' : 'Activer'
    const titleIcon =
      isActif === undefined ? icon.cilTrash : isActif ? icon.cilPowerStandby : icon.cilFont
    const colorIcon = isActif === undefined ? 'danger' : isActif ? 'danger' : 'dark'

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

    useMountedLayoutEffect(() => {
      if (onSelectedRowChange !== undefined) {
        onSelectedRowChange(getSelectedRows())
      }
    }, [selectedRowIds])

    const handleLineClick = (row) => {
      return onLineClick !== undefined ? onLineClick(row.original) : null
    }

    function handleEdit(row) {
      let navigatePath
      switch (fromPage) {
        case 'users':
          navigatePath = '/user-edit/' + row.original.id
          break
        case 'msgtype':
          navigatePath = '/messages/prewritten-edit/' + row.original.id
          break
        case 'societes':
          navigatePath = '/societe-edit/' + row.original.id
          break
        case 'facture':
          navigatePath = '/facture-edit/' + row.original.id
          break
        default:
          navigatePath = '/dossier-edit/' + row.original.id
      }
      navigate(navigatePath, {
        state: { data: row.original },
      })
    }

    function handleDisplay(row) {
      let navigatePath = ''
      switch (fromPage) {
        case 'users':
          navigatePath = '/user-display/' + row.original.id
          break
        case 'dossiers':
          navigatePath = '/dossier/' + row.original.id
          break
        default:
          navigatePath = ''
      }
      if (navigatePath !== '') {
        navigate(navigatePath, {
          state: { data: row.original },
        })
      } else {
        if (fromPage === 'societes' || fromPage === 'facture') {
          setSociete(row.original)
          setOpenSociete(true)
        } else {
          setMessage(row.original)
          setOpenMessage(true)
        }
      }
    }

    return (
      <Styles>
        <div className="table-responsive">
          <CTable {...getTableProps()} class="table table-striped align-middle text-center">
            <CTableHead class="align-middle table-light">
              {headerGroups.map((headerGroup) => (
                <CTableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <CTableHeaderCell
                      class="align-middle"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      {...column.getHeaderProps()}
                    >
                      {/* <i className="cis-sort-ascending"></i> */}

                      {column.canSort ? (
                        <TableSortLabel
                          active={column.isSorted}
                          direction={column.isSortedDesc ? 'desc' : 'asc'}
                        >
                          <i className="cis-sort-ascending"></i>
                          {column.render('Header')}
                        </TableSortLabel>
                      ) : (
                        column.render('Header')
                      )}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              ))}
            </CTableHead>
            <CTableBody {...getTableBodyProps()} class="table-group-divider align-middle">
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <CTableRow {...row.getRowProps()} onClick={() => handleLineClick(row)}>
                    {row.cells.map((cell) => {
                      if (cell.column.Header === 'Actions') {
                        return (
                          <CTableDataCell>
                            <CButton
                              color="success"
                              variant="ghost"
                              title="Consulter"
                              size="sm"
                              onClick={() => handleDisplay(row)}
                            >
                              <CIcon icon={icon.cilFolderOpen} size="sm" />
                            </CButton>
                            <CButton
                              color="primary"
                              variant="ghost"
                              title="Modifier"
                              size="sm"
                              onClick={() => handleEdit(row)}
                            >
                              <CIcon icon={icon.cilPen} size="sm" />
                            </CButton>
                            <CButton
                              title={title}
                              color={colorIcon}
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                fromPage === 'dossiers'
                                  ? onDelete(row.original)
                                  : onDelete(row.original.id)
                              }
                            >
                              <CIcon icon={titleIcon} size="sm" />
                            </CButton>
                          </CTableDataCell>
                        )
                      }

                      if (cell.column.Header === 'Statut') {
                        return (
                          <CTableDataCell {...cell.getCellProps()}>
                            <CBadge color={cell.value === 'Payer' ? 'dark' : 'danger'}>
                              {cell.render('Cell')}
                            </CBadge>
                          </CTableDataCell>
                        )
                      }

                      return (
                        <CTableDataCell {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </CTableDataCell>
                      )
                    })}
                  </CTableRow>
                )
              })}
            </CTableBody>

            <ModalMessageType
              openModal={openMessage}
              setOpenModal={setOpenMessage}
              dataMessage={message}
            />
            <ModalSociete
              openSociete={openSociete}
              setOpenSociete={setOpenSociete}
              dataSocietes={societe}
            />
          </CTable>
        </div>
        <CRow
          style={{
            // display: 'inline-block',
            marginLeft: '10px',
            width: '100%',
          }}
        >
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={data.length}
            rowsPerPage={10}
            page={pageIndex}
            // canNextPage={canNextPage}
            // canPreviousPage={canPreviousPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${'Éléments'} ${from}
            ${'à'} ${to}
            ${'sur'} ${count}`
            }
            onPageChange={handleChangePage}
            onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
            ActionsComponent={TablePaginationActions}
          />
        </CRow>
      </Styles>
    )
  },
)

export default Table
