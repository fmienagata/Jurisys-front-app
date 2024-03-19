/* eslint-disable react/prop-types */
import React from 'react'
import { CSidebarNav, CSidebar, CNavLink, CNavTitle } from '@coreui/react'

const SidebarBox = ({
  dataDossiers,
  setMessagesSelected,
  setActiveNavLink,
  setActiveInboxIndex,
  activeNavLink,
}) => {
  return (
    <>
      <CSidebar className="border-end" style={{ width: '100%' }}>
        <CSidebarNav>
          <CNavTitle className="active">Liste des dossiers</CNavTitle>

          {dataDossiers &&
            dataDossiers.map((item, key) => (
              <CNavLink
                key={key}
                as="button"
                onClick={() => {
                  setActiveNavLink(key)
                  setMessagesSelected(item.messages)
                }}
                active={activeNavLink === key}
              >
                {item.reference}
              </CNavLink>
            ))}
        </CSidebarNav>
      </CSidebar>
    </>
  )
}
export default SidebarBox
