/* eslint-disable react/prop-types */
import React from 'react'
import { Box, IconButton, Typography, Icon } from '@mui/material'
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material'

const TablePaginationActions = (props) => {
  const { count, page, rowsPerPage, onPageChange } = props
  console.log('props --> ', props)

  const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1)

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    console.log('pages -> ', page)
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, lastPage)
  }

  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     flex: '1 1 auto',
    //     alignItems: 'center',
    //     justifyContent: 'flex-end',
    //     mr: 2.5,
    //   }}
    // >
    //   {/* <Button
    //     data-testid="table-pagination-firstPage"
    //     title="table.pagination.firstPage"
    //     onClick={handleFirstPageButtonClick}
    //     disabled={page === 0}
    //     iconName="cil-chevron-double-left"

    //   /> */}
    //   {/* <Button
    //     title="My Button"
    //     onClick={handleFirstPageButtonClick}
    //     disabled={false}
    //     iconName="ChevronLeft"
    //   />
    //   <Button
    //     data-testid="table-pagination-prevPage"
    //     title="table.pagination.prevPage"
    //     onClick={handleBackButtonClick}
    //     disabled={page === 0}
    //     iconName="chevron-left"
    //   />
    //   <Typography variant="body2" data-testid="pageNumber">
    //     page {page + 1} of {lastPage + 1}
    //   </Typography>
    //   <Button
    //     data-testid="table-pagination-nextPage"
    //     title="table.pagination.nextPage"
    //     onClick={handleNextButtonClick}
    //     disabled={page === lastPage}
    //     iconName="chevron-right"
    //   />
    //   <Button
    //     data-testid="table-pagination-lastPage"
    //     title="table.pagination.lastPage"
    //     onClick={handleLastPageButtonClick}
    //     disabled={page === lastPage}
    //     iconName="chevrons-right" */}
    //   {/* /> */}
    //   {/***** */}
    //   <CPagination aria-label="Page navigation example">
    //     <div
    //       style={{
    //         display: 'flex',
    //         justifyContent: 'space-between',
    //         marginTop: '10PX',
    //         width: '100%',
    //       }}
    //     >
    //       <div style={{ display: 'flex' }}>
    //         <CPaginationItem
    //           aria-label="Previous"
    //           onClick={() => handleFirstPageButtonClick()}
    //           disabled={page === 0}
    //         >
    //           <span aria-hidden="true">&laquo;</span>
    //         </CPaginationItem>
    //         <CPaginationItem>
    //           <span>
    //             Page
    //             <strong>
    //               page {page + 1} of {lastPage + 1}
    //             </strong>
    //           </span>
    //         </CPaginationItem>
    //         <CPaginationItem
    //           aria-label="Next"
    //           onClick={handleLastPageButtonClick}
    //           disabled={page === lastPage}
    //         >
    //           <span aria-hidden="true">&raquo;</span>
    //         </CPaginationItem>
    //       </div>
    //     </div>
    //   </CPagination>
    // </Box>
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        alignItems: 'center',
        justifyContent: 'start',
        mr: 2.0,
      }}
    >
      <IconButton
        data-testid="table-pagination-firstPage"
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        data-testid="table-pagination-prevPage"
        onClick={handleBackButtonClick}
        disabled={page === 0}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <Typography variant="body2" data-testid="pageNumber">
        Page {page + 1} of {lastPage + 1}
      </Typography>
      <IconButton
        data-testid="table-pagination-nextPage"
        onClick={handleNextButtonClick}
        disabled={page === lastPage}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        data-testid="table-pagination-lastPage"
        onClick={handleLastPageButtonClick}
        disabled={page === lastPage}
      >
        <LastPage />
      </IconButton>
    </Box>
  )
}

export default TablePaginationActions
