/* eslint-disable react/prop-types */
import React from 'react'

import { CPaginationItem, CPagination } from '@coreui/react'

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
    <div style={{ width: '100%', marginLeft: '70%' }}>
      <CPagination>
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
          <span style={{ display: 'inline-block', marginLeft: '10px' }}>
            Page
            <strong>
              {page + 1} sur {lastPage + 1}
            </strong>
          </span>
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
    </div>
  )
}

export default TablePaginationActions
