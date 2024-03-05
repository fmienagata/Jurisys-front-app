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
import { useMessageContext } from 'src/Context/MessageContext'
import Styles from './../../../table/TableStyles'
import { getAllMessagesTypes } from 'src/services/messagesTypesService'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/MessagesTypesActions'
import { useNavigate } from 'react-router-dom'
import { filtredValues } from 'src/utils/utils'

const MessagesType = () => {
  const tableRefMsgsTypes = useRef(typeof useRowSelect)
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(0)
  const [selection, setSelection] = useState([])

  const dispatch = useDispatch()
  const { displayError } = useMessageContext()
  const messagesDataStore = useSelector((state) => state.dataMessagesTypes.data)
  const [initialMessages, setInitialMessages] = useState(messagesDataStore)

  const [loading, setLoading] = useState(false)
  const [setColumns] = useState([])

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

  const fetchAllMessages = async () => {
    setLoading(true)
    try {
      const messagesData = await getAllMessagesTypes()
      if (Array.isArray(messagesData)) {
        dispatch({ type: 'GET_DATA_MESSAGES_TYPES', payload: messagesData })
        setColumns(columnsMessages)
        //setInitialMessages(messagesData)
      } else {
        displayError(
          'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
        )
      }
    } catch (error) {
      displayError(error.messages)
    } finally {
    }
    setLoading(false)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    if (messagesDataStore !== null && messagesDataStore !== undefined) {
      setInitialMessages(messagesDataStore)
    } else {
      dispatch(fetchData())
    }

    //}
  }, [dispatch, messagesDataStore])

  function handleChange(event) {
    const filter = event.target.value.trim().toLowerCase()
    const result = initialMessages && filtredValues(messagesDataStore, filter)
    setInitialMessages(filter === '' ? messagesDataStore : result)
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
                  {initialMessages && (
                    <Table
                      ref={tableRefMsgsTypes}
                      columns={columnsMessages}
                      data={initialMessages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      ischeckbox={true}
                      fromPage={'msgtype'}
                    />
                  )}
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
