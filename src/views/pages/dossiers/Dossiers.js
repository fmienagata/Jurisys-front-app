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
import { getDossiers, deleteDossier } from '../../../services/dossiersService'
import { useDispatch } from 'react-redux'
import ModalAction from 'src/components/ModalAction'
import { useNavigate } from 'react-router-dom'
import { useMessageContext } from 'src/Context/MessageContext'
import Styles from './../../../table/TableStyles'
import { handleErrorResponse } from '../../../utils/handleErrorResponse'
import { filtredValues } from 'src/utils/utils'

const Dossiers = () => {
  const navigate = useNavigate()
  const { displayError, displaySuccess } = useMessageContext()
  const tableRefDossiers = useRef(typeof useRowSelect)
  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])
  const [dossiers, setDossiers] = useState([])
  const [dossiersInitial, setDossiersInitial] = useState([])
  const [loading, setLoading] = useState(false)
  const [columns, setColumns] = useState([])

  const [openModal, setOpenModal] = useState(false)

  const [dossierIDDelete, setDossierIDDelete] = useState('')

  const columnsDossiers = [
    {
      Header: 'Reference',
      accessor: 'reference',
    },
    {
      Header: 'Nom',
      accessor: 'nom',
    },
    {
      Header: 'Prenom',
      accessor: 'prenom',
    },
    {
      Header: 'Adresse',
      accessor: 'adresse',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Telephone',
      accessor: 'telephone',
    },
    {
      Header: 'Societe',
      accessor: 'societe',
    },
    {
      Header: 'Ville',
      accessor: 'ville',
    },
    {
      Header: 'Pays',
      accessor: 'pays',
    },
    {
      Header: 'Juridiction',
      accessor: 'juridiction',
    },
    {
      Header: 'Montant',
      accessor: 'montantPrejudice',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]

  const dispatch = useDispatch()

  const fetchData = async () => {
    setLoading(true)
    try {
      const dossiersData = await getDossiers()
      if (Array.isArray(dossiersData)) {
        setDossiers(dossiersData)
        setDossiersInitial(dossiersData)
        setColumns(columnsDossiers)
        dispatch({ type: 'GET_DATA_DOSSIERS', payload: dossiersData })
      } else {
        displayError(
          'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
        )
      }
    } catch (error) {
      let msg = handleErrorResponse(error)
      displayError(msg)
    } finally {
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = (dossierId) => {
    setOpenModal(true)
    setDossierIDDelete(dossierId)
  }

  async function deleteAction() {
    try {
      if (dossierIDDelete !== '') {
        await deleteDossier(dossierIDDelete)
      } else {
        console.log('selection pour delete =>', selection)
      }

      displaySuccess('Supprimer avec sucess')
    } catch (error) {
      displayError(error.messages)
    } finally {
      setOpenModal(false)
    }
    setDossierIDDelete('')
    setOpenModal(false)
  }

  function DeleteMultiDossiers() {
    console.log('selection =>', selection)
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
            {!loading ? (
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
                          onClick={() => DeleteMultiDossiers()}
                        >
                          <CIcon icon={icon.cilLibraryAdd} size="sm" /> Supprimer
                        </CButton>
                      )}
                      <CButton
                        className="align-middle ml-2"
                        color="success"
                        variant="outline"
                        onClick={() => navigate('/dossier-add')}
                      >
                        <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>

                {dossiers.length > 1 && Array.isArray(dossiers) && (
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
                    />
                  </CCardBody>
                )}
              </CCard>
            ) : (
              loading && <CSpinner color="primary" variant="grow" />
            )}
            <ModalAction
              openModal={openModal}
              setOpenModal={setOpenModal}
              action={
                <CButton color="danger" onClick={deleteAction}>
                  Supprimer
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
