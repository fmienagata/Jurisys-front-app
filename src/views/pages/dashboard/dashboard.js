import React, { useEffect, useState } from 'react'
import { CCol, CCardHeader, CRow, CCard, CCardBody, CSpinner } from '@coreui/react'
import MyCalendar from 'src/views/pages/Agenda/MyCalendar'
import MessagesView from 'src/views/pages/dossiers/MessagesView'
import { getAllMessages } from 'src/services/messagesService'
import { useMessageContext } from 'src/Context/MessageContext'
import { handleErrorResponse } from '../../../utils/handleErrorResponse'
import InfosDashboard from './infosDashboard'
import GraphDashBoard from './graphDashboard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataMessages } from 'src/dashboardActions'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { displayError } = useMessageContext()
  const messagesStore = useSelector((state) => state.dashboard.messages)
  console.log('messagesStore-->', messagesStore)
  const [loading, setLoading] = useState(false)

  const [messages, setMessages] = useState([])

  const fetchData = async () => {
    try {
      const messagesData = await getAllMessages()
      console.log('messagesData -->', messagesData.slice(0, 5))
      if (Array.isArray(messagesData)) {
        setMessages(messagesData.slice(0, 5))
        // setColumns(columnsMessages)
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
  }

  useEffect(() => {
    if (messagesStore === null) {
      setLoading(true)
      dispatch(fetchDataMessages())
        .then(() => {
          setLoading(false)
        })
        .catch((error) => {
          displayError('yes error Message')

          setLoading(false)
        })
    } else {
      setMessages(messagesStore)
    }
    // }
  }, [dispatch, displayError, messages, messagesStore])

  useEffect(() => {
    dispatch(fetchDataMessages())
  }, [dispatch])

  return (
    <div>
      <CRow>
        <InfosDashboard />
      </CRow>
      <CRow>
        <CCol xs={6}>
          <CRow>
            <GraphDashBoard />
          </CRow>
          <CRow>
            <CCard style={{ margin: 0, padding: 0 }}>
              <CCardHeader>Audiences du mois</CCardHeader>
              <CCardBody>
                <MyCalendar isDashboard={true} />
              </CCardBody>
            </CCard>
          </CRow>
        </CCol>
        <CCol xs={6}>
          {!loading ? (
            <MessagesView isDashboard={true} messages={messages} />
          ) : (
            <CSpinner color="info" />
          )}
        </CCol>
      </CRow>
    </div>
  )
}

export default Dashboard
