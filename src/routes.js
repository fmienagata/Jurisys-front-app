import React from 'react'
import Profile from './views/pages/users/Profile'

//
//users

const Accesses = {
  USER: 'ROLE_USER',
  ADMIN: 'ROLE_ADMIN',
  AVOCAT: 'ROLE_AVOCAT',
}

const users = React.lazy(() => import('./views/pages/users/users'))
const userEdit = React.lazy(() => import('./views/pages/users/userEdit'))
const addUser = React.lazy(() => import('./views/pages/users/addUser'))
const user = React.lazy(() => import('./views/pages/users/user'))
//dossiers
const dossiers = React.lazy(() => import('./views/pages/dossiers/Dossiers'))
const dossier = React.lazy(() => import('./views/pages/dossiers/Dossier'))
const AddDossier = React.lazy(() => import('./views/pages/dossiers/AddDossier'))
const dossierEdit = React.lazy(() => import('./views/pages/dossiers/EditDossiers'))
//recherche
const recherche = React.lazy(() => import('./views/pages/recherche/recherche'))
//messagesTypes
const messagesType = React.lazy(() => import('./views/pages/messagesType/MessagesType'))
const messageries = React.lazy(() => import('./views/pages/messagesType/Messageries'))
const newMessagesType = React.lazy(() => import('./views/pages/messagesType/addMessagesTypes'))
const editMessagesType = React.lazy(() => import('./views/pages/messagesType/editMessageType'))
const addMessageDossier = React.lazy(() => import('./views/pages/messagesType/addMessagesDossier'))
const MessageriesTransmis = React.lazy(
  () => import('./views/pages/messagesType/MessageriesTransmis'),
)

// Agenda
const diary = React.lazy(() => import('./views/pages/Agenda/MyCalendar'))
// dashboard
const dashboard = React.lazy(() => import('./views/pages/dashboard/dashboard'))

//Societes
const addSociete = React.lazy(() => import('./views/pages/societes/addSociete'))
const societes = React.lazy(() => import('./views/pages/societes/societes'))
const editSocietes = React.lazy(() => import('./views/pages/societes/editSocietes'))

//factures
const factures = React.lazy(() => import('./views/pages/factures/factures'))
const addfacture = React.lazy(() => import('./views/pages/factures/addFacture'))
const editfacture = React.lazy(() => import('./views/pages/factures/editFacture'))

//
const unauthorized = React.lazy(() => import('./views/pages/page404/Page404'))

const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/dossier/:dossierId', name: 'Dossier', element: dossier, exact: true },
  { path: '/dossier-edit/:dossierId', name: 'Dossier modifier', element: dossierEdit },
  { path: '/dossier-add', name: 'Ajouter un dossier', element: AddDossier, exact: true },
  { path: '/dossiers/actifs', name: 'Liste des dossiers actifs', element: dossiers, exact: true },
  { path: '/research', name: 'Recherche', element: recherche, exact: true },
  {
    path: '/dossiers/archives',
    name: 'Liste des dossiers archivés',
    element: dossiers,
    exact: true,
  },
  {
    path: '/users',
    name: 'Utilisateurs',
    allowedRoles: [Accesses.AVOCAT, Accesses.ADMIN],
    element: users,
    exact: true,
  },

  {
    path: '/user-edit/:userId',
    allowedRoles: [Accesses.ADMIN, Accesses.AVOCAT],
    name: 'Modifier un utilisateur',
    element: userEdit,
    exact: true,
  },
  {
    path: '/user-add',
    allowedRoles: [Accesses.ADMIN, Accesses.AVOCAT],
    name: 'Ajouter un utilisateur',
    element: addUser,
  },
  {
    path: '/user-display/:userId',
    allowedRoles: [Accesses.ADMIN, Accesses.AVOCAT],
    name: 'Utilisateur',
    element: user,
    exact: true,
  },
  {
    path: '/messages/prewritten',
    allowedRoles: [Accesses.AVOCAT],
    name: 'Messages pré-rédigés',
    element: messagesType,
    exact: true,
  },
  {
    path: '/messages/prewritten/new',
    allowedRoles: [Accesses.AVOCAT],
    name: 'Ajouter un messages pré-rédigés',
    element: newMessagesType,
    exact: true,
  },
  {
    path: '/messages/messaging',
    name: 'Messages reçus',
    allowedRoles: [Accesses.AVOCAT],
    element: messageries,
    exact: true,
  },
  {
    path: '/messages/send',
    name: 'Messages envoyés',
    allowedRoles: [Accesses.AVOCAT],
    element: MessageriesTransmis,
    exact: true,
  },
  {
    path: '/messages/prewritten-edit/:msgid',
    name: 'Modifier un message pré-rédigés',
    allowedRoles: [Accesses.AVOCAT],
    element: editMessagesType,
    exact: true,
  },
  {
    path: '/messages/new',
    name: 'Ajouter un message pour un dossier',
    element: addMessageDossier,
    exact: true,
  },
  {
    path: '/dashboard',
    name: 'Tableau de bord',
    element: dashboard,
    exact: true,
  },
  {
    path: '/diary',
    name: 'Mon agenda',
    element: diary,
    exact: true,
  },
  {
    path: '/diary',
    name: 'Mon agenda',
    element: diary,
    exact: true,
  },
  {
    path: '/new-societe',
    allowedRoles: [Accesses.AVOCAT],
    name: 'Ajouter un client',
    element: addSociete,
    exact: true,
  },
  {
    path: '/societes',
    name: 'Liste des clients',
    allowedRoles: [Accesses.AVOCAT],
    element: societes,
    exact: true,
  },
  {
    path: '/societe-edit/:id',
    name: 'Modifier un client',
    allowedRoles: [Accesses.AVOCAT],
    element: editSocietes,
    exact: true,
  },
  {
    path: '/factures',
    name: 'Liste des factures',
    allowedRoles: [Accesses.AVOCAT],
    element: factures,
    exact: true,
  },
  {
    path: '/add-facture',
    name: 'Ajouter une facture',
    allowedRoles: [Accesses.AVOCAT],
    element: addfacture,
    exact: true,
  },
  {
    path: '/facture-edit/:id',
    name: 'Modifier une facture',
    allowedRoles: [Accesses.AVOCAT],
    element: editfacture,
    exact: true,
  },
  {
    path: '/profile',
    name: 'Profil utilisateur',
    element: Profile,
    exact: true,
  },
  {
    path: '/unauthorized',
    name: 'Pas autorisé',
    element: unauthorized,
    exact: true,
  },
]

export default routes
