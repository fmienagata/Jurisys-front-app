/* eslint-disable react/prop-types */
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
import ModalPiecesJointes from '../dossiers/ModalPiecesJointes'

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

  // États pour le modal d'affichage des fichiers de la facture
  const [filesForModal, setFilesForModal] = useState([])
  const [modalTitle, setModalTitle] = useState('')
  const [openModalPJ, setOpenModalPJ] = useState(false)

  const { dataFactures: dataFacturesAPI, isLoading } = useGetAllFactures({
    onSuccess: (data) => {
      // Tri par date décroissante (du plus récent au plus ancien)
      // En supposant que la propriété `createdAt` contient la date de création
      const sortedData = [...data.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )
      setDataFactures(sortedData)
      setInitialFactures(sortedData)
    },
    onError: (error) => {
      displayError('Erreur lors de la requête dans le composant !')
    },
  })
  useEffect(() => {
    if (!isLoading && dataFacturesAPI) {
      const sortedData = [...dataFacturesAPI.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )
      setDataFactures(sortedData)
      setInitialFactures(sortedData)
    }
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
      Header: 'Fichiers',
      accessor: 'factureFiles',
      Cell: ({ value, row }) =>
        value?.length > 0 ? (
          <CButton
            color="primary"
            variant="outline"
            size="sm"
            onClick={() => handleOpenFiles(row.original)}
            style={{
              border: '1px solid currentColor',
              width: '50px',
              marginLeft: '-28px',
            }}
          >
            Voir
          </CButton>
        ) : null,
    },

    {
      Header: 'Statut',
      accessor: 'statut',
    },
    {
      Header: 'Montant en FCFA',
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

  // Fonction pour gérer la pagination
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  function handleChange(event) {
    setCurrentPage(0)
    const filter = event.target.value.trim().toLowerCase()
    let result = filtredValues(initialFactures, filter)
    setDataFactures(result)
    setCurrentPage(0)
  }

  // Fonction pour ouvrir le modal d'affichage des fichiers d'une facture
  const handleOpenFiles = (facture) => {
    if (
      facture.factureFiles &&
      Array.isArray(facture.factureFiles) &&
      facture.factureFiles.length > 0
    ) {
      setFilesForModal(facture.factureFiles)
      setModalTitle(`Fichiers de la facture ${facture.id}`)
      setOpenModalPJ(true)
    }
  }

  const handleFilterChange = (filterValue) => {
    // Appliquez votre filtre aux données
    setCurrentPage(0)

    const filteredData = dataFactures.filter((item) =>
      Object.values(item)
        .flatMap((value) => (typeof value === 'string' ? value : []))
        .some((prop) => prop.toLowerCase().includes(filterValue.toLowerCase())),
    )
    setDataFactures(filteredData)
  }

  useEffect(() => {
    const totalPages = Math.ceil(dataFactures.length / 10)
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1)
    }
  }, [dataFactures, currentPage])

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

              {!isLoading && dataFactures ? (
                <CCardBody className="custom-card-body">
                  <Table
                    ref={tableRefFacture}
                    columns={columnsFacture}
                    data={dataFactures}
                    ischeckbox={false}
                    currentPage={currentPage}
                    setCurrentPage={handlePageChange} // Gérer le changement de page
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
        <ModalPiecesJointes
          openModal={openModalPJ}
          setOpenModalPJ={setOpenModalPJ}
          listPJ={filesForModal}
          titleModal={modalTitle}
        />
      </Styles>
    </div>
  )
}

export default Factures
