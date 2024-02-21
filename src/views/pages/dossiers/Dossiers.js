import React, { useEffect, useState, useRef } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CSpinner } from '@coreui/react'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { getDossiers, deleteDossier } from '../../../services/dossiersService'
import { useDispatch } from 'react-redux'
import ModalAction from 'src/components/ModalAction'
import { useNavigate } from 'react-router-dom'
import { useMessageContext } from 'src/Context/MessageContext'
import Styles from './../../../table/TableStyles'

const Dossiers = () => {
  const navigate = useNavigate()
  const { displayError, displaySuccess } = useMessageContext()

  const tableRefDossiers = useRef(typeof useRowSelect)
  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])
  const [dossiers, setDossiers] = useState([])
  const [loading, setLoading] = useState(false)
  const [columns, setColumns] = useState([])

  const [openModal, setOpenModal] = useState(false)

  const [dossierIDDelete, setDossierIDDelete] = useState('')

  const columns2 = [
    {
      Header: 'Nom',
      accessor: 'nom',
    },
    {
      Header: 'prenom',
      accessor: 'prenom',
    },
    {
      Header: 'adresse',
      accessor: 'adresse',
    },
    {
      Header: 'email',
      accessor: 'email',
    },
    {
      Header: 'telephone',
      accessor: 'telephone',
    },
    {
      Header: 'societe',
      accessor: 'societe',
    },
    {
      Header: 'ville',
      accessor: 'ville',
    },
    {
      Header: 'pays',
      accessor: 'pays',
    },
    {
      Header: 'juridiction',
      accessor: 'juridiction',
    },
    {
      Header: 'montant',
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
        setDossiers(dossiersData)
        setColumns(columns2)
        dispatch({ type: 'GET_DATA_DOSSIERS', payload: dossiersData })
      } else {
        displayError(
          'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
        )
      }
    } catch (error) {
      displayError(error.message)
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

  return (
    <div>
      <Styles>
        <CRow>
          <CCol xs={12}>
            {!loading ? (
              <CCard className="mb-4">
                <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong className="align-self-start">Liste des dossiers</strong>
                  <div
                    className="align-self-end"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    {selection.length >= 2 && (
                      <CButton
                        className="mr-2"
                        color="danger"
                        variant="outline"
                        shape="rounded-pill"
                        onClick={() => DeleteMultiDossiers()}
                      >
                        <CIcon icon={icon.cilLibraryAdd} size="sm" /> Supprimer
                      </CButton>
                    )}
                    <CButton
                      color="success"
                      variant="outline"
                      shape="rounded-pill"
                      onClick={() => navigate('/dossier-add')}
                    >
                      <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                    </CButton>
                  </div>
                </CCardHeader>

                {dossiers.length > 1 && Array.isArray(dossiers) && (
                  <CCardBody>
                    <Table
                      ref={tableRefDossiers}
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
