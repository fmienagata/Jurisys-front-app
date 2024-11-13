import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilCreditCard, cilEnvelopeOpen, cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useAuth } from 'src/Context/AuthContext'
import { useQueryClient } from 'react-query'
import avatar from './../../assets/images/avatars/avatar2.jpg'
import labels from 'src/translations/labels.json'

const AppHeaderDropdown = () => {
  const { disconnect } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  // const token = localStorage.getItem('token')

  // const decoded = token ? jwtDecode(token) : null

  const handleLogout = () => {
    queryClient.clear()
    disconnect()
    navigate('/login')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold py-2">Compte</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>

        <CDropdownItem href="/#/messages/messaging">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          {/* <CBadge color="success" className="ms-2">
            42
          </CBadge> */}
        </CDropdownItem>
        <CDropdownItem href="/#/abonnement">
          <CIcon icon={cilCreditCard} className="me-2" />
          Abonnement
          {/* <CBadge color="secondary" className="ms-2">
            42
          </CBadge> */}
        </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilLockLocked} className="me-2" />
          {labels.header.logout}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
