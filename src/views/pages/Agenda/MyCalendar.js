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

const MyCalendar = ({ isDashboard }) => {
  const { displayError } = useMessageContext()
  const queryClient = useQueryClient()

  const [dataEvents, setDataEvents] = useState([])

  const { data, isLoading, refetch } = useGetAllAgenda({
    onSuccess: (dataAgenda) => {
      const transformedData = dataAgenda.data.map((item) => ({
        type: item.type,
        title: item.text,
        date: item.dateAudience,
      }))
      setDataEvents(transformedData)
    },
    onError: (error) => {
      //displayError('Erreur lors de la requête dans le composant !')
    },
  })

  useEffect(() => {
    if (!isLoading && data) {
      setDataEvents(data.data)
    } else {
      queryClient.invalidateQueries(['getAgenda'])
    }
  }, [isLoading, data])

  const handleDateClick2 = (info) => {
    console.log('Événements de la journée info:', info.dateStr)

    const eventsOnDate = dataEvents.filter((event) => {
      return event.date.includes(info.dateStr)
    })
    console.log('Événements de la journée : ', info.dateStr, ' --> ', eventsOnDate)
  }

  const handleEventClick = (info) => {
    console.log('info.event.extendedProps:', info.event)
    //alert(`Clic sur l'événement : ${info.event.title} `)
  }

  // const handleDayClick = (info) => {
  //   console.log('tooltipRef.current -->', info)
  // }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CCard>
        <CCardBody>
          <div>
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
                // eventMouseEnter={handleDayClick}
                // eventMouseLeave={handleEventMouseLeave}
              />
            ) : (
              <CSpinner color="primary" variant="grow" />
            )}
          </div>
        </CCardBody>
      </CCard>
      {/* <div style={!isDashboard ? { height: '50vh', width: '50vw' } : {}}>
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
            // eventMouseEnter={handleDayClick}
            // eventMouseLeave={handleEventMouseLeave}
          />
        ) : (
          <CSpinner color="primary" variant="grow" />
        )}
      </div> */}
    </Suspense>
  )
}

MyCalendar.propTypes = {
  isDashboard: PropTypes.bool,
}

export default MyCalendar
