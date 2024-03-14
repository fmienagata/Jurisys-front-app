import React, { useState, useEffect, useRef } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CSpinner } from '@coreui/react'

import FormRecherche from './formRecherche'
import { useMessageContext } from 'src/Context/MessageContext'
import ModalAction from 'src/components/ModalAction'
import { deleteDossier } from '../../../services/dossiersService'
import Styles from './../../../table/TableStyles'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const Recherche = () => {
  const tableRefDossiersRecherche = useRef(typeof useRowSelect)
  const { displayError, displaySuccess } = useMessageContext()
  const [dossiers, setDossiers] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])
  const [loading, setLoading] = useState(false)
  // const [columns, setColumns] = useState([])

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

  useEffect(() => {
    setLoading(true)
    setLoading(false)
  }, [dossiers])

  const handleDelete = (dossierId) => {
    setOpenModal(true)
    setDossierIDDelete(dossierId)
  }

  async function deleteAction() {
    try {
      if (dossierIDDelete !== '') {
        await deleteDossier(dossierIDDelete)
      } else {
        //console.log('selection pour delete =>', selection)
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
      <FormRecherche setDossiers={setDossiers} />
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
                    </div>
                  </CCardHeader>

                  {dossiers && dossiers.length >= 1 && (
                    <CCardBody className="custom-card-body">
                      <Table
                        ref={tableRefDossiersRecherche}
                        columns={columnsDossiers}
                        data={dossiers}
                        fromPage={'dossiers'}
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
                    Désactiver
                  </CButton>
                }
              />
            </CCol>
          </CRow>
        </Styles>
      </div>
    </div>
  )
}

export default Recherche
