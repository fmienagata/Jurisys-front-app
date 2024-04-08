import React, { useState, useRef, useEffect } from 'react'
import { useRowSelect } from 'react-table'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { CButton } from '@coreui/react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CFormInput } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import ModalAction from 'src/components/ModalAction'
import { filtredValues } from 'src/utils/utils'
import { useMessageContext } from 'src/Context/MessageContext'
import Styles from './../../../table/TableStyles'
import { useGetAllSocietes, daleteSociete } from 'src/services/societeService'
import { useQueryClient } from 'react-query'
import { useAuth } from 'src/Context/AuthContext'
import { handleErrorResponse } from 'src/utils/handleErrorResponse'

const Societes = () => {
  const { disconnect } = useAuth()
  const queryClient = useQueryClient()

  const tableRefUsers = useRef(typeof useRowSelect)
  const navigate = useNavigate()
  const { displayError, displaySuccess } = useMessageContext()
  const [dataSocietes, setDataSocietes] = useState([])
  const [initialSocietes, setInitialSocietes] = useState([])

  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [IDDelete, setIDDelete] = useState('')

  const { dataSocietesAPI, isLoading, refetch } = useGetAllSocietes({
    onSuccess: (data) => {
      setDataSocietes(data.data)
      setInitialSocietes(data.data)
    },
    onError: (error) => {
      handleErrorResponse(error, disconnect, displayError, navigate)
    },
  })

  useEffect(() => {
    if (!isLoading && dataSocietesAPI) {
      setDataSocietes(dataSocietesAPI.data)
      setInitialSocietes(dataSocietesAPI.data)
    } else {
      queryClient.invalidateQueries(['getAllSocietes'])
    }
  }, [isLoading, dataSocietesAPI])

  const columnsSocietes = [
    {
      Header: 'Societe',
      accessor: 'nomSociete',
    },
    {
      Header: 'Pays',
      accessor: 'pays',
    },
    {
      Header: 'Ville',
      accessor: 'ville',
    },
    // {
    //   Header: 'Code',
    //   accessor: 'code',
    // },
    {
      Header: 'Adresse',
      accessor: 'adresse',
    },
    {
      Header: 'Telephone',
      accessor: 'telephone',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]

  const handleDeleteSociete = (societeId) => {
    setOpenModal(true)
    setIDDelete(societeId)
  }

  async function deleteAction() {
    try {
      if (IDDelete !== '') {
        await daleteSociete(IDDelete)
      }
      displaySuccess('Supprimer', 'Suppression de la societe avec sucess')
      queryClient.invalidateQueries(['getAllSocietes'])
      queryClient.invalidateQueries(['getCountNBRBusiness'])
    } catch (error) {
      displayError(error.messages)
    } finally {
      setOpenModal(false)
    }
    setIDDelete('')
    setOpenModal(false)
  }

  function DeleteMultiSocietes() {}

  function handleChange(event) {
    const filter = event.target.value.trim().toLowerCase()
    const result = filtredValues(initialSocietes, filter)
    setDataSocietes(filter === '' ? initialSocietes : result)
  }

  return (
    <div>
      <Styles>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-2">
              <CCardHeader>
                <CRow>
                  <CCol xs={4} className="d-flex align-items-center">
                    <strong className="text-primary">Liste des entreprises</strong>
                  </CCol>

                  <CCol xs={4} className="align-self-center">
                    <CFormInput
                      id="recherche"
                      size="sm"
                      placeholder="Chercher ..."
                      onChange={handleChange}
                    />
                  </CCol>
                  <CCol xs={4} className="d-flex align-items-center justify-content-end">
                    {selection.length >= 1 && (
                      <CButton
                        color="danger"
                        className="align-middle mx-3"
                        variant="outline"
                        shape="rounded-pill"
                        onClick={() => DeleteMultiSocietes()}
                      >
                        <CIcon icon={icon.cilLibraryAdd} size="sm" /> Supprimer
                      </CButton>
                    )}
                    <CButton
                      className="align-middle ml-2"
                      color="success"
                      variant="outline"
                      shape="rounded-pill"
                      onClick={() => navigate('/new-societe')}
                    >
                      <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                    </CButton>
                  </CCol>
                </CRow>
              </CCardHeader>

              {!isLoading ? (
                <CCardBody className="custom-card-body">
                  <Table
                    ref={tableRefUsers}
                    columns={columnsSocietes}
                    data={dataSocietes}
                    ischeckbox={true}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setOpenModal={setOpenModal}
                    onSelectedRowChange={setSelection}
                    fromPage={'societes'}
                    onDelete={handleDeleteSociete}
                  />
                </CCardBody>
              ) : (
                isLoading && <CSpinner color="primary" variant="grow" />
              )}
            </CCard>
            <ModalAction
              openModal={openModal}
              setOpenModal={setOpenModal}
              action={
                <CButton color="danger" onClick={deleteAction}>
                  Désactiver
                </CButton>
              }
            />
          </CCol>
        </CRow>
      </Styles>
    </div>
  )
}

export default Societes
