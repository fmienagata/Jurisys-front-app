import React from 'react'
import PropTypes from 'prop-types'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLang from '@fullcalendar/core/locales/fr'

const MyCalendar = ({ isDashboard }) => {
  const handleDateClick = (arg) => {
    console.log('Date clicked: ' + arg.dateStr)
  }

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
        events={[
          { title: 'Réunion importante', date: '2024-03-05T10:00:00', end: '2024-03-05T12:00:00' },
          { title: 'Déjeuner', date: '2024-03-07T12:30:00' },
          { title: 'Déjeuner', date: '2024-03-09T12:30:00' },
          // Ajoutez d'autres événements ici...
        ]}
        dateClick={handleDateClick}
      />
    </div>
  )
}

MyCalendar.propTypes = {
  isDashboard: PropTypes.bool,
}

export default MyCalendar
