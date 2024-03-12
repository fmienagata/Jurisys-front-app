import React from 'react'
import PropTypes from 'prop-types'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLang from '@fullcalendar/core/locales/fr'

const MyCalendar = ({ isDashboard }) => {
  const handleDateClick2 = (info) => {
    const eventsOnDate = events.filter((event) => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getFullYear() === info.date.getFullYear() &&
        eventDate.getMonth() === info.date.getMonth() &&
        eventDate.getDate() === info.date.getDate()
      )
    })
    console.log('Événements de la journée 2:', eventsOnDate)
  }

  const handleEventClick = (info) => {
    alert(`Clic sur l'événement : ${info.event.title} `)
    console.log(`Clic  :`, info.event.title)
  }

  // const handleDayClick = (info) => {
  //   console.log('tooltipRef.current -->', info)
  // }

  const events = [
    {
      title: 'Réunion importante',
      date: '2024-03-05T10:00:00',
      end: '2024-03-05T12:00:00',
    },
    { title: 'Déjeuner', date: '2024-03-07T12:30:00' },
    { title: 'Déjeuner', date: '2024-03-09T12:30:00' },
  ]

  return (
    <div style={!isDashboard ? { height: '50vh', width: '50vw' } : {}}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={frLang}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick2}
        // eventMouseEnter={handleDayClick}
        // eventMouseLeave={handleEventMouseLeave}
      />
    </div>
  )
}

MyCalendar.propTypes = {
  isDashboard: PropTypes.bool,
}

export default MyCalendar
