import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">&copy; jurisys-soft 2024 .</span> V1.04.29
      </div>

      <div className="ms-auto">
        <span className="me-1">Cabinet Brudey Ondziel Gnelenga Locko</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
