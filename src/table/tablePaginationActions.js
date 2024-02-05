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
    <CPagination aria-label="Page navigation example" style={{ justifyContent: 'center' }}>
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
            <span>
              Page
              <strong>
                {page + 1} of {lastPage + 1}
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
        </div>
      </div>
    </CPagination>
  )
}

export default TablePaginationActions
