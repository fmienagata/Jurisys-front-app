import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CCloseButton, CSidebar, CSidebarBrand, CSidebarHeader, CSidebarNav } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { useAuth } from 'src/Context/AuthContext'

const AppSidebar = () => {
  const [navigationfiltred, setNavigationFiltred] = useState([])

  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.changeState.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)

  const { user } = useAuth()

  const allowedRoles = {
    ROLE_USER: ['Tableau de bord', 'Dossiers', 'Recherche', 'Agenda'],
    ROLE_ADMIN: ['Tableau de bord', 'Dossiers', 'Recherche', 'Agenda', 'Utilisateurs'],
  }

  useEffect(() => {
    const filteredData = allowedRoles[user.roles]
      ? navigation.filter((obj) => allowedRoles[user.roles].includes(obj.name))
      : navigation

    setNavigationFiltred(filteredData)
  }, [user])

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <img
            className="mr-2"
            src={`${process.env.PUBLIC_URL}/images/logo_2.png`}
            alt="Logo"
            height={80}
          />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          // dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigationfiltred} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
