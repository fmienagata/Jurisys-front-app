import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">&copy; jurisys-soft 2024 .</span>
      </div>
      <div>
        <span className="ml-6">V1.1.0</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Cabinet Brudey Ondziel Gnelenga Locko</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
