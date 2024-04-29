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
import { useGetAllFactures, deleteFacture } from 'src/services/factureService'
import { useQueryClient } from 'react-query'

const Factures = () => {
  const tableRefFacture = useRef(typeof useRowSelect)
  const navigate = useNavigate()
  const { displayError, displaySuccess } = useMessageContext()
  const [dataFactures, setDataFactures] = useState([])
  const [initialFactures, setInitialFactures] = useState([])
  const [factureIDDelete, setFactureIDDelete] = useState('')

  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])
  const [openModal, setOpenModal] = useState(false)
  //const [IDDelete, setIDDelete] = useState('')
  const queryClient = useQueryClient()

  const { dataFactures: dataFacturesAPI, isLoading } = useGetAllFactures({
    onSuccess: (data) => {
      setDataFactures(data.data)
      setInitialFactures(data.data)
    },
    onError: (error) => {
      displayError('Erreur lors de la requête dans le composant !')
    },
  })

  useEffect(() => {
    if (!isLoading && dataFacturesAPI) {
      setDataFactures(dataFacturesAPI.data)
      setInitialFactures(dataFacturesAPI.data)
    }
    // else {
    //   queryClient.invalidateQueries(['getAllFactures'])
    // }
  }, [isLoading, dataFacturesAPI])

  const columnsFacture = [
    {
      Header: 'Utilisateur',
      accessor: 'user',
    },
    {
      Header: 'Dossier',
      accessor: 'dossier',
    },
    {
      Header: 'Statut',
      accessor: 'statut',
    },
    {
      Header: 'Montant',
      accessor: 'montant',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]

  const handleDeleteFacture = (factureId) => {
    setOpenModal(true)
    setFactureIDDelete(factureId)
  }

  async function deleteAction() {
    try {
      if (factureIDDelete !== '') {
        await deleteFacture(factureIDDelete)
      } else {
      }
      displaySuccess('Supprimer facture', 'Supprimer avec sucess')
      queryClient.invalidateQueries(['getAllFactures'])
    } catch (error) {
      displayError(error.messages)
    } finally {
      setOpenModal(false)
    }
    setFactureIDDelete('')
    setOpenModal(false)
  }

  function DeleteMultiFactures() {}

  function handleChange(event) {
    const filter = event.target.value.trim().toLowerCase()
    const result = filtredValues(initialFactures, filter)
    setDataFactures(filter === '' ? initialFactures : result)
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
                    <strong className="text-primary">Liste des factures</strong>
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
                        onClick={() => DeleteMultiFactures()}
                      >
                        <CIcon icon={icon.cilLibraryAdd} size="sm" /> Supprimer
                      </CButton>
                    )}
                    <CButton
                      className="align-middle ml-2"
                      color="success"
                      variant="outline"
                      shape="rounded-pill"
                      onClick={() => navigate('/add-facture')}
                    >
                      <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                    </CButton>
                  </CCol>
                </CRow>
              </CCardHeader>

              {!isLoading ? (
                <CCardBody className="custom-card-body">
                  <Table
                    ref={tableRefFacture}
                    columns={columnsFacture}
                    data={dataFactures}
                    ischeckbox={true}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setOpenModal={setOpenModal}
                    onSelectedRowChange={setSelection}
                    fromPage={'facture'}
                    onDelete={handleDeleteFacture}
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

export default Factures
