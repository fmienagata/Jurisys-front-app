import React, { useState, useEffect, useRef } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CSpinner } from '@coreui/react'

import FormRecherche from './formRecherche'
import { useMessageContext } from 'src/Context/MessageContext'
import ModalAction from 'src/components/ModalAction'
import { changeStatutDossier } from '../../../services/dossiersService'
import { filtredValues, dossierStatusChange } from 'src/utils/utils'

import Styles from './../../../table/TableStyles'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useQueryClient } from 'react-query'

const Recherche = () => {
  const queryClient = useQueryClient()

  const tableRefDossiersRecherche = useRef(typeof useRowSelect)
  const { displayError, displaySuccess } = useMessageContext()
  const [dossiers, setDossiers] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])
  const [loading, setLoading] = useState(false)
  // const [columns, setColumns] = useState([])

  const [openModal, setOpenModal] = useState(false)

  const [dossierIDDelete, setDossierIDDelete] = useState('')
  const [dataValue, setDataValue] = useState({})

  const [isActif, setIsActif] = useState(false)

  const columnsDossiers = [
    {
      Header: 'Référence',
      accessor: 'reference',
    },
    {
      Header: 'Nom',
      accessor: 'nom',
    },
    {
      Header: 'Prénom',
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
      Header: 'Téléphone',
      accessor: 'telephone',
    },
    {
      Header: 'Société',
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
      Header: 'Montant en FCFA',
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
    setOpenModal(true)
  }

  return (
    <div>
      <FormRecherche setDossiers={setDossiers} setIsActif={setIsActif} />
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

                  {dossiers && dossiers.length > 0 && (
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
                        isActif={isActif}
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
    </div>
  )
}

export default Recherche
