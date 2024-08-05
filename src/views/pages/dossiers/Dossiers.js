import React, { useEffect, useState, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CButton,
  CSpinner,
} from '@coreui/react'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useGetAllDossiers, changeStatutDossier } from '../../../services/dossiersService'
import ModalAction from 'src/components/ModalAction'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMessageContext } from 'src/Context/MessageContext'
import Styles from './../../../table/TableStyles'
import { handleErrorResponse } from '../../../utils/handleErrorResponse'
import { filtredValues, dossierStatusChange } from 'src/utils/utils'
import { useAuth } from 'src/Context/AuthContext'
import { useQueryClient } from 'react-query'

const Dossiers = () => {
  const navigate = useNavigate()
  const { disconnect } = useAuth()
  const queryClient = useQueryClient()

  const location = useLocation()
  const [isActif, setIsActif] = useState(location.pathname.includes('actifs'))

  const { dossiers: dossiersData, isLoading: loadingDossiers } = useGetAllDossiers({
    onError: (error) => {
      handleErrorResponse(error, disconnect, displayError, navigate)
    },
  })

  const { displayError, displaySuccess } = useMessageContext()
  const tableRefDossiers = useRef(typeof useRowSelect)
  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])
  const [dossiers, setDossiers] = useState([])
  const [dossiersInitial, setDossiersInitial] = useState([])
  const [columns, setColumns] = useState([])

  const [dataValue, setDataValue] = useState({})

  const [openModal, setOpenModal] = useState(false)

  const [dossierIDDelete, setDossierIDDelete] = useState({})

  const columnsDossiers = [
    {
      Header: 'Référence',
      accessor: 'reference',
    },
    // {
    //   Header: 'Nom',
    //   accessor: 'nom',
    // },
    // {
    //   Header: 'Prénom',
    //   accessor: 'prenom',
    // },
    {
      Header: 'Société',
      accessor: 'societe',
    },
    {
      Header: 'Adresse',
      accessor: 'adresse',
    },
    // {
    //   Header: 'Email',
    //   accessor: 'email',
    // },
    // {
    //   Header: 'Telephone',
    //   accessor: 'telephone',
    // },

    {
      Header: 'Ville',
      accessor: 'ville',
    },
    // {
    //   Header: 'Pays',
    //   accessor: 'pays',
    // },

    {
      Header: 'Objet',
      accessor: 'objet',
    },
    {
      Header: 'Partie adverse/Nom',
      accessor: 'partieAdverseNom',
    },
    {
      Header: 'Partie adverse/Prénom',
      accessor: 'partieAdversePrenom',
    },

    {
      Header: 'Juridiction',
      accessor: 'juridiction',
    },
    {
      Header: 'Montant en FCFA',
      accessor: 'montantPrejudice',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]

  useEffect(() => {
    setIsActif(location.pathname.includes('actifs'))
  }, [location])

  useEffect(() => {
    if (!loadingDossiers && dossiersData) {
      try {
        if (Array.isArray(dossiersData)) {
          const filteredData = dossiersData.filter((item) => item.statut === isActif)
          setDossiers(filteredData)
          setDossiersInitial(filteredData)
          setColumns(columnsDossiers)
        } else {
          displayError(
            'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
          )
        }
      } catch (error) {
        handleErrorResponse(error, disconnect, displayError, navigate)
      } finally {
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActif, loadingDossiers, dossiersData])

  const handleDelete = (dossierId) => {
    setOpenModal(true)
    setDossierIDDelete(dossierId)
    let data = dossierStatusChange(dossierId)
    setDataValue(data)
  }

  async function deleteAction() {
    try {
      if (dossierIDDelete) {
        await changeStatutDossier(dossierIDDelete.id, dataValue)
      }
      queryClient.invalidateQueries(['getAllDossiers'])
      queryClient.invalidateQueries(['getCountDossiersActifs'])
      displaySuccess(
        'Modification de status avec sucess',
        'Modification de status du dossier avec sucess ',
      )
    } catch (error) {
      displayError(error.messages)
    } finally {
      setOpenModal(false)
    }
    setDossierIDDelete('')
    setOpenModal(false)
  }

  function DeleteMultiDossiers() {
    //console.log('selection =>', selection)
    setOpenModal(true)
  }

  function handleChange(event) {
    const filter = event.target.value.trim().toLowerCase()

    const result = filtredValues(dossiersInitial, filter)
    setDossiers(filter === '' ? dossiersInitial : result)
  }

  return (
    <div>
      <Styles>
        <CRow>
          <CCol xs={12}>
            {!loadingDossiers ? (
              <CCard className="mb-2">
                <CCardHeader>
                  <CRow>
                    <CCol xs={4} className="d-flex align-items-center">
                      <strong className="text-primary">Liste des dossiers</strong>
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
                          onClick={() => DeleteMultiDossiers()}
                        >
                          <CIcon icon={icon.cilLibraryAdd} size="sm" /> Supprimer
                        </CButton>
                      )}
                      <CButton
                        className="align-middle ml-2"
                        color="success"
                        variant="outline"
                        shape="rounded-pill"
                        onClick={() => navigate('/dossier-add')}
                      >
                        <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>
                {!loadingDossiers && dossiers.length > 0 && Array.isArray(dossiers) && (
                  <CCardBody className="custom-card-body">
                    <Table
                      ref={tableRefDossiers}
                      fromPage={'dossiers'}
                      columns={columns}
                      data={dossiers}
                      ischeckbox={true}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      onSelectedRowChange={setSelection}
                      setOpenModal={setOpenModal}
                      onDelete={handleDelete}
                      isActif={isActif}
                    />
                  </CCardBody>
                )}
              </CCard>
            ) : (
              loadingDossiers && <CSpinner color="primary" variant="grow" />
            )}
            <ModalAction
              openModal={openModal}
              setOpenModal={setOpenModal}
              titleModal={'Modifier le status'}
              messageModal={
                dossierIDDelete.statut === false
                  ? 'Voulez vous vraiment activer le dossier?'
                  : 'Voulez vous vraiment archiver le dossier?'
              }
              action={
                <CButton
                  color={dossierIDDelete.statut === false ? 'dark' : 'danger'}
                  onClick={deleteAction}
                  style={{ color: 'white' }}
                  className="fw-medium"
                >
                  {dossierIDDelete.statut === false ? 'Activer' : 'Archiver'}
                </CButton>
              }
            />
          </CCol>
        </CRow>
      </Styles>
    </div>
  )
}

export default Dossiers
