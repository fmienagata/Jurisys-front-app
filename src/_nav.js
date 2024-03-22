import React from 'react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

import {
  cilCalculator,
  cilCalendar,
  cilEuro,
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
    to: '/societes',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Recherche',
    to: '/research',
    icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Dossiers',
    to: '/dossiers',
    icon: <CIcon icon={icon.cilFolderOpen} customClassName="nav-icon" />,
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
    name: 'La messagerie',
    to: '/messages',
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Messages reçus',
        to: '/messages/messaging',
      },
      {
        component: CNavItem,
        name: 'Messages envoyés',
        to: '/messages/send',
      },
      {
        component: CNavItem,
        name: 'Nouveau message',
        to: '/messages/new',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Messages pré-rédigés',
    to: '/messages/prewritten',
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Factures',
    to: '/factures',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Gestion des droits',
  //   to: '/right',
  //   icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Agenda',
    to: '/diary',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Abonnement',
    to: '/abonnement',
    icon: <CIcon icon={cilEuro} customClassName="nav-icon" />,
  },
]

export default _nav
