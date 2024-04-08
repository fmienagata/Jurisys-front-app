import React from 'react'
import { useDropzone } from 'react-dropzone'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CHeaderText,
  CSpinner,
} from '@coreui/react'

export function DropzoneWithoutDrag(props) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ noDrag: true })
  const files = acceptedFiles.map((file) => <li key={file.path}>{file.path}</li>)

  return (
    <CCard className="container" style={{ backgroundColor: 'dark' }}>
      <CCardBody {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Dropzone with no drag events</p>
        <em>(Drag drop is disabled)</em>
      </CCardBody>
      <CCardBody>
        <h4>Files</h4>
        <ul>{files}</ul>
      </CCardBody>
    </CCard>
  )
}
