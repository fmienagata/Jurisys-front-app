/* eslint-disable react/prop-types */
import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'

import { CPaginationItem, CPagination, CRow, CCol } from '@coreui/react'

const TablePaginationActions = (props) => {
  const { count, page, rowsPerPage, onPageChange } = props
  const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1)

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, lastPage)
  }

  return (
    // <CCol className="px-5 pl-5 ">
    //   <CPagination>
    //     <CPaginationItem
    //       aria-label="Previous"
    //       onClick={() => {
    //         handleFirstPageButtonClick()
    //       }}
    //       disabled={page === 0}
    //     >
    //       <span aria-hidden="true">&laquo;</span>
    //     </CPaginationItem>
    //     <CPaginationItem
    //       aria-label="Previous"
    //       onClick={() => {
    //         handleBackButtonClick()
    //       }}
    //       disabled={page === 0}
    //     >
    //       <span aria-hidden="true">&laquo;</span>
    //     </CPaginationItem>
    //     <CPaginationItem>
    //       <span style={{ display: 'inline-block' }}>
    //         <strong>
    //           {page + 1} sur {lastPage + 1}
    //         </strong>
    //       </span>
    //     </CPaginationItem>
    //     <CPaginationItem
    //       aria-label="Next"
    //       onClick={() => {
    //         handleNextButtonClick()
    //       }}
    //       disabled={page === lastPage}
    //     >
    //       <span aria-hidden="true">&raquo;</span>
    //     </CPaginationItem>
    //     <CPaginationItem
    //       aria-label="Next"
    //       onClick={() => {
    //         handleLastPageButtonClick()
    //       }}
    //       disabled={page === lastPage}
    //     >
    //       <span aria-hidden="true">&raquo;</span>
    //     </CPaginationItem>
    //   </CPagination>
    // </CCol>
    <Box
      sx={{
        flex: '1 1 auto',
        alignItems: 'center',
        justifyContent: 'flex-end',
        mr: 2.5,
        display: 'ruby',
      }}
      className="col px-5 grid-force"
    >
      <CPagination
        sx={{
          display: 'ruby',
        }}
      >
        <CPaginationItem
          aria-label="Previous"
          onClick={() => {
            handleFirstPageButtonClick()
          }}
          disabled={page === 0}
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem
          aria-label="Previous"
          onClick={() => {
            handleBackButtonClick()
          }}
          disabled={page === 0}
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        <CPaginationItem>
          <CRow>
            <Typography>
              <b style={{ width: 'max-content', display: 'flex' }}>
                {page + 1} sur {lastPage + 1}
              </b>
            </Typography>
          </CRow>
        </CPaginationItem>
        <CPaginationItem
          aria-label="Next"
          onClick={() => {
            handleNextButtonClick()
          }}
          disabled={page === lastPage}
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
        <CPaginationItem
          aria-label="Next"
          onClick={() => {
            handleLastPageButtonClick()
          }}
          disabled={page === lastPage}
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </Box>
  )
}

export default TablePaginationActions
