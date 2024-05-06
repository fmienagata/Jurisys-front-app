import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  // const getRouteName = (pathname, routes) => {
  //   console.log('pathname, routes ->', pathname)

  //   const currentRoute = routes.find((route) => route.path === pathname)
  //   return currentRoute ? currentRoute.name : false
  // }

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => {
      // Séparer les parties statiques du chemin de la route
      const routePathSegments = route.path.split('/')
      // Séparer les parties statiques du chemin de l'URL
      const urlPathSegments = pathname.split('/')
      // Vérifier si les parties statiques correspondent
      if (routePathSegments.length !== urlPathSegments.length) return false
      for (let i = 0; i < routePathSegments.length; i++) {
        if (routePathSegments[i] !== urlPathSegments[i] && !routePathSegments[i].startsWith(':')) {
          return false
        }
      }
      return true
    })
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)

      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem>Accueil</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: false } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
