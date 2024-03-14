import React, { useState, useRef, useEffect } from 'react'
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
import { useMessageContext } from 'src/Context/MessageContext'
import Styles from './../../../table/TableStyles'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { filtredValues } from 'src/utils/utils'
import { useGetAllMessagesTypes } from 'src/services/messagesTypesService'
import { useQueryClient } from 'react-query'

const MessagesType = () => {
  const tableRefMsgsTypes = useRef(typeof useRowSelect)
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])

  const { displayError } = useMessageContext()
  const messagesDataStore = useSelector((state) => state.dataMessagesTypes.data)
  const [initialMessages, setInitialMessages] = useState([])
  const [dataSave, setDataSave] = useState([])

  const [loading, setLoading] = useState(false)

  const columnsMessages = [
    {
      Header: 'Titre',
      accessor: 'type',
    },
    {
      Header: 'Message',
      accessor: 'text',
    },
    // {
    //   Header: 'Date',
    //   accessor: 'createdAt',
    // },
    {
      Header: 'Actions',
      accessor: 'actions',
    },
  ]

  const { dataMessagesTypes, isLoading, refetch } = useGetAllMessagesTypes({
    onSuccess: (dataMessagesTypes) => {
      setInitialMessages(dataMessagesTypes.data)
      setDataSave(dataMessagesTypes.data)
    },
    onError: (error) => {
      displayError('Erreur lors de la requête dans le composant !')
    },
  })

  function handleChange(event) {
    const filter = event.target.value.trim().toLowerCase()
    const result = initialMessages && filtredValues(dataSave, filter)
    setInitialMessages(filter === '' ? dataSave : result)
  }

  useEffect(() => {
    if (!isLoading && dataMessagesTypes) {
      setInitialMessages(dataMessagesTypes.data)
      setDataSave(dataMessagesTypes.data)
    } else {
      queryClient.invalidateQueries(['getAllMsgs'])
    }
  }, [isLoading, dataMessagesTypes])

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
                      <strong className="text-primary">Liste des messages pré-rédigés</strong>
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
                          className="align-middle mx-3"
                          color="danger"
                          variant="outline"
                          shape="rounded-pill"
                        >
                          <CIcon icon={icon.cilLibraryAdd} size="sm" /> Supprimer
                        </CButton>
                      )}
                      <CButton
                        color="success"
                        variant="outline"
                        shape="rounded-pill"
                        onClick={() => navigate('/messages/prewritten/new')}
                      >
                        <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>

                <CCardBody className="custom-card-body">
                  {!isLoading && initialMessages && (
                    <Table
                      ref={tableRefMsgsTypes}
                      columns={columnsMessages}
                      data={initialMessages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      onSelectedRowChange={setSelection}
                      ischeckbox={true}
                      fromPage={'msgtype'}
                    />
                  )}
                  {isLoading && <CSpinner color="primary" variant="grow" />}
                </CCardBody>
              </CCard>
            ) : (
              loading && <CSpinner color="primary" variant="grow" />
            )}
          </CCol>
        </CRow>
      </Styles>
    </div>
  )
}

export default MessagesType
