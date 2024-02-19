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

const routes = [
  { path: '/dossier-edit/:dossierId', name: 'Dossier modifier', element: dossierEdit },
  { path: '/dossier/:dossierId', name: 'Dossier', element: dossier, exact: true },
  { path: '/dossier-add', name: 'Ajouter un dossier', element: AddDossier, exact: true },
  { path: '/dossiers/list', name: 'Liste des dossiers en cours', element: dossiers, exact: true },
  {
    path: '/dossiers/archive',
    name: 'Liste des dossiers archivés',
    element: dossiers,
    exact: true,
  },
  { path: '/users', name: 'utilisateurs', element: users, exact: true },
  { path: '/user-edit/:userId', name: 'Modifier un utilisateur', element: userEdit, exact: true },
  { path: '/user-add', name: 'Ajouter un utilisateur', element: addUser },
  { path: '/user-display/:userId', name: 'Utilisateur', element: user, exact: true },
  { path: '/', exact: true, name: 'Home' },
]

export default routes
