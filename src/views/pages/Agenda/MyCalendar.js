import React, { Suspense, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLang from '@fullcalendar/core/locales/fr'
import { useGetAllAgenda } from 'src/services/dashboardService'
import { useMessageContext } from 'src/Context/MessageContext'
import { CSpinner, CCard, CCardBody } from '@coreui/react'
import { useQueryClient } from 'react-query'
import { handleErrorResponse } from 'src/utils/handleErrorResponse'
import { useAuth } from 'src/Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ModalAgendaMessage from 'src/components/ModalAgenda'

const MyCalendar = ({ isDashboard }) => {
  const { displayError } = useMessageContext()
  const { disconnect } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [dataEvents, setDataEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState({ dossier: '', text: '' })

  const { dataAgenda, isLoading } = useGetAllAgenda({
    onSuccess: (data) => {
      const transformedData = data.data.map((item) => ({
        id: item.id,
        type: item.type,
        title: item.titre,
        date: item.dateAudience,
        dossier: item.dossier, // ajout de la référence du dossier
        text: item.text,
      }))
      setDataEvents(transformedData)
    },
    onError: (error) => {
      handleErrorResponse(error, disconnect, displayError, navigate)
    },
  })

  useEffect(() => {
    if (dataAgenda) {
      const transformedData = dataAgenda
        ? dataAgenda.data.map((item) => ({
            id: item.id,
            type: item.type,
            title: item.titre,
            date: item.dateAudience,
            dossier: item.dossier, // ajout de la référence du dossier
            text: item.text,
          }))
        : []
      setDataEvents(transformedData)
    } else {
      queryClient.invalidateQueries(['getDataAgenda'])
    }
  }, [dataAgenda, queryClient])

  const handleDateClick2 = (info) => {
    const eventsOnDate = dataEvents.filter((event) => {
      return event.date.includes(info.dateStr)
    })
    console.log('Événements de la journée : ', info.dateStr, ' --> ', eventsOnDate)
  }

  const handleEventClick = (info) => {
    setModalData({
      ...info.event.extendedProps, // Pass all extendedProps
      title: info.event.title,
      id: info.event.id,
    })
    setShowModal(true)
  }

  const handleCloseModal = () => setShowModal(false)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <style>
        {`
          .fc-day {
            border: none !important;
          }
        `}
      </style>
      <CCard>
        <CCardBody>
          <div style={{}}>
            {!isLoading && dataEvents ? (
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={frLang}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={dataEvents}
                eventClick={handleEventClick}
                dateClick={handleDateClick2}
              />
            ) : (
              <CSpinner color="primary" variant="grow" />
            )}
          </div>
        </CCardBody>
      </CCard>

      <ModalAgendaMessage
        showModal={showModal}
        setShowModal={setShowModal}
        dataMessage={modalData}
      />
    </Suspense>
  )
}

MyCalendar.propTypes = {
  isDashboard: PropTypes.bool,
}

export default MyCalendar
