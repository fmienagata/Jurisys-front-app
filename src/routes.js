import React from 'react'

const listUser = React.lazy(() => import('./views/user/List'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/user', name: 'User', element: listUser },
]

export default routes
