/* eslint-disable react/prop-types */
import React from 'react'
import { CSidebarNav, CSidebar, CNavLink, CNavTitle } from '@coreui/react'

const SidebarBox = ({
  dataDossiers,
  setMessagesSelected,
  setActiveNavLink,
  setActiveInboxIndex,
  activeNavLink,
  setClickedDossier,
  fetchDossier,
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
                  fetchDossier(item.id)
                  setActiveNavLink(key)
                  // setMessagesSelected(item.messages)
                  setClickedDossier(item.id)
                  setActiveInboxIndex(0)
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
