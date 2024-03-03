import React, { useEffect, useState, useRef } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CSpinner } from '@coreui/react'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useMessageContext } from 'src/Context/MessageContext'
import Styles from './../../../table/TableStyles'
import { getAllMessagesTypes } from 'src/services/messagesTypesService'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/MessagesTypesActions'
import { useNavigate } from 'react-router-dom'

const MessagesType = () => {
  const tableRefMsgsTypes = useRef(typeof useRowSelect)
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(0)

  const dispatch = useDispatch()
  const { displayError } = useMessageContext()
  const messagesDataStore = useSelector((state) => state.dataMessagesTypes.data)

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
    if (!messagesDataStore) dispatch(fetchData())

    //}
  }, [])

  return (
    <div>
      <Styles>
        <CRow>
          <CCol xs={12}>
            {!loading ? (
              <CCard className="mb-4">
                <CCardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong className="align-self-start">Liste des messages pré-rédigés</strong>
                  <div
                    className="align-self-end"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    {/* <CButton className="mr-2" color="danger" variant="outline" shape="rounded-pill">
                      <CIcon icon={icon.cilLibraryAdd} size="sm" /> Supprimer
                    </CButton> */}
                    <CButton
                      color="success"
                      variant="outline"
                      shape="rounded-pill"
                      onClick={() => navigate('/messages/prewritten/new')}
                    >
                      <CIcon icon={icon.cilLibraryAdd} size="sm" /> Ajouter
                    </CButton>
                  </div>
                </CCardHeader>

                <CCardBody className="custom-card-body">
                  {messagesDataStore && (
                    <Table
                      ref={tableRefMsgsTypes}
                      columns={columnsMessages}
                      data={messagesDataStore}
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
