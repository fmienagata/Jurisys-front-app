import React from 'react'
//users
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
const newMessagesType = React.lazy(() => import('./views/pages/messagesType/addMessagesTypes'))
const editMessagesType = React.lazy(() => import('./views/pages/messagesType/editMessageType'))
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

const routes = [
  { path: '/dossier-edit/:dossierId', name: 'Dossier modifier', element: dossierEdit },
  { path: '/dossier/:dossierId', name: 'Dossier', element: dossier, exact: true },
  { path: '/dossier-add', name: 'Ajouter un dossier', element: AddDossier, exact: true },
  { path: '/dossiers/actifs', name: 'Liste des dossiers actifs', element: dossiers, exact: true },
  { path: '/research', name: 'Recherche', element: recherche, exact: true },
  {
    path: '/dossiers/archives',
    name: 'Liste des dossiers archivés',
    element: dossiers,
    exact: true,
  },
  { path: '/users', name: 'Utilisateurs', element: users, exact: true },
  { path: '/user-edit/:userId', name: 'Modifier un utilisateur', element: userEdit, exact: true },
  { path: '/user-add', name: 'Ajouter un utilisateur', element: addUser },
  { path: '/user-display/:userId', name: 'Utilisateur', element: user, exact: true },
  {
    path: '/messages/prewritten',
    name: 'Messages pré-rédigés',
    element: messagesType,
    exact: true,
  },
  {
    path: '/messages/prewritten/new',
    name: 'Ajouter un messages pré-rédigés',
    element: newMessagesType,
    exact: true,
  },
  {
    path: '/messages/prewritten-edit/:msgid',
    name: 'Modifier un message pré-rédigés',
    element: editMessagesType,
    exact: true,
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
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
    name: 'Ajouter une entreprise',
    element: addSociete,
    exact: true,
  },
  {
    path: '/societes',
    name: 'Liste des entreprises',
    element: societes,
    exact: true,
  },
  {
    path: '/societe-edit/:id',
    name: 'Modifier une societe',
    element: editSocietes,
    exact: true,
  },
  {
    path: '/factures',
    name: 'Liste des factures',
    element: factures,
    exact: true,
  },
  {
    path: '/add-facture',
    name: 'Ajouter une facture',
    element: addfacture,
    exact: true,
  },
  {
    path: '/facture-edit/:id',
    name: 'Modifier une facture',
    element: editfacture,
    exact: true,
  },
  { path: '/', exact: true, name: 'Home' },
]

export default routes
