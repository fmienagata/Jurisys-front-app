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
import { CNavGroup, CNavLink } from '@coreui/react'

const _nav = [
  {
    component: CNavLink,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavLink,
    name: 'Utilisateurs',
    to: '/users',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavLink,
    name: 'Entreprises',
    to: '/businesses',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
  },
  {
    component: CNavLink,
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
        component: CNavLink,
        name: 'Actifs',
        to: '/dossiers/actifs',
      },
      {
        component: CNavLink,
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
        component: CNavLink,
        name: 'Messages pré-rédigés',
        to: '/base/accordion',
      },
      {
        component: CNavLink,
        name: 'La messagerie',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: CNavLink,
    name: 'Comptabilités',
    to: '/accounting',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavLink,
    name: 'Gestion des droits',
    to: '/right',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavLink,
    name: 'Agenda',
    to: '/agenda',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavLink,
    name: 'Abonnements',
    to: '/subscriptions',
    icon: <CIcon icon={cilEuro} customClassName="nav-icon" />,
  },
]

export default _nav
