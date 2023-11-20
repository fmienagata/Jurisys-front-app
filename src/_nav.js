import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalculator,
  cilEuro,
  cilFolder,
  cilGroup,
  cilHttps,
  cilIndustry,
  cilSettings,
  cilSpeech,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Clients',
    to: '/theme/colors',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Entreprises',
    to: '/theme/typography',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Comptabilités',
    to: '/theme/typography',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Dossiers',
    to: '/base',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'En cours',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Archivés',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Messageries',
    to: '/base',
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Les messages prédéfinis',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'La messagerie',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Gestion des droits',
    to: '/theme/typography',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Les habilitations',
    to: '/theme/typography',
    icon: <CIcon icon={cilHttps} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Abonnements',
    to: '/theme/typography',
    icon: <CIcon icon={cilEuro} customClassName="nav-icon" />,
  },
]

export default _nav
