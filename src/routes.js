import React from 'react'

const dossiers = React.lazy(() => import('./views/pages/dossiers/Dossiers'))
const users = React.lazy(() => import('./views/pages/users/users'))
const listUser = React.lazy(() => import('./views/user/List'))
const userEdit = React.lazy(() => import('./views/pages/users/userEdit'))
const addUser = React.lazy(() => import('./views/pages/users/addUser'))
const dossier = React.lazy(() => import('./views/pages/dossiers/Dossier'))
const AddDossier = React.lazy(() => import('./views/pages/dossiers/AddDossier'))
const dossierEdit = React.lazy(() => import('./views/pages/dossiers/EditDossiers'))

const routes = [
  { path: '/dossier-edit/:dossierId', name: 'Dossier modifier', element: dossierEdit, exact: true },
  { path: '/dossier/:dossierId', name: 'Dossier', element: dossier, exact: true },
  { path: '/dossier-add', name: 'Ajouter un dossier', element: AddDossier, exact: true },
  { path: '/dossiers', name: 'dossiers', element: dossiers, exact: true },
  { path: '/users', name: 'utilisateur', element: users, exact: true },
  { path: '/user', name: 'User', element: listUser, exact: true },
  { path: '/user-edit/:userId', name: 'Modifier un utilisateur', element: userEdit, exact: true },
  { path: '/user-add', name: 'Ajouter un utilisateur', element: addUser },
  { path: '/', exact: true, name: 'Home' },
]

export default routes
