/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  CCol,
  CCardText,
  CCardTitle,
  CRow,
  CCardBody,
  CCardHeader,
  CCard,
  CNavTitle,
  CSidebarNav,
  CListGroupItem,
  CListGroup,
  CBadge,
  CCardFooter,
  CCardSubtitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const InboxItem = ({ message, active, setActive, setMessagesDetails }) => {
  return (
    <>
      <CListGroup flush>
        <CListGroupItem
          active={active}
          as="button"
          onClick={() => {
            setMessagesDetails(message)
            setActive()
          }}
        >
          <CRow>
            <>
              <CCardTitle className="text-start">{message.type}</CCardTitle>
              <CCardSubtitle className="text-start">{message.text}</CCardSubtitle>
              <CCardText className="text-end">
                <small>{formattedDate(message.createdAt)}</small>
              </CCardText>
            </>
          </CRow>
        </CListGroupItem>
      </CListGroup>
    </>
  )
}

function formattedDate(date) {
  const dateObj = new Date(date)

  const options = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }
  const formattedDate = dateObj.toLocaleDateString('fr-FR', options)
  return formattedDate
}

const Inbox = ({ messagesSelected, setMessagesDetails, setActiveInboxIndex, activeInboxIndex }) => {
  // const [activeIndex, setActiveIndex] = useState(activeInboxIndex)

  return (
    <CCard>
      {messagesSelected.length > 1 &&
        messagesSelected.map((item, key) => (
          <InboxItem
            key={key}
            message={item}
            active={key === activeInboxIndex}
            setActive={() => setActiveInboxIndex(key)}
            setMessagesDetails={setMessagesDetails}
            labelClass="item-blue"
          />
        ))}
    </CCard>
  )
}

export default Inbox
