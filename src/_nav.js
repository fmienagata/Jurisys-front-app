import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalculator,
  cilCalendar,
  cilEuro,
  cilFolder,
  cilGroup,
  cilIndustry,
  cilSearch,
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
    name: 'Utilisateurs',
    to: '/users',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Entreprises',
    to: '/businesses',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Recherche',
    to: '/recherche',
    icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Dossiers',
    to: '/dossiers',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Actifs',
        to: '/dossiers/actifs',
      },
      {
        component: CNavItem,
        name: 'Archivés',
        to: '/dossiers/archives',
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
        name: 'Messages pré-rédigés',
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
    name: 'Comptabilités',
    to: '/accounting',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Gestion des droits',
    to: '/right',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Agenda',
    to: '/agenda',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Abonnements',
    to: '/subscriptions',
    icon: <CIcon icon={cilEuro} customClassName="nav-icon" />,
  },
]

export default _nav
