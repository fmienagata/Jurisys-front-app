import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { AxiosInterceptor } from 'src/services/axiosConfig'

const DefaultLayout = () => {
  return (
    <div>
      <AxiosInterceptor>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </AxiosInterceptor>
    </div>
  )
}

export default DefaultLayout
