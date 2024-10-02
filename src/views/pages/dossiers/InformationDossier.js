import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CCol,
  CRow,
  CButton,
  CCardTitle,
  CBadge,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { capitalizeFirstLetter, formatFrenchDate, formatNumberWithPoints } from 'src/utils/utils'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

import InformationCard from './InformationCard'

const InformationDossier = ({ dataDossier, setListPJ, setOpenModalPJ, setTitleModal }) => {
  const dataAdverse = Object.fromEntries(
    Object.entries(dataDossier).filter(([key]) => key.includes('artieAdverse')),
  )

  const dataForDossier = Object.fromEntries(
    Object.entries(dataDossier).filter(([key]) => !key.includes('artieAdverse')),
  )

  return (
    <>
      <InformationCard
        isPartieAdverse={true}
        dataDossier={dataForDossier}
        setListPJ={setListPJ}
        setTitleModal={setTitleModal}
        setOpenModalPJ={setOpenModalPJ}
      />

      <InformationCard
        isPartieAdverse={false}
        dataDossier={dataAdverse}
        setListPJ={setListPJ}
        setTitleModal={setTitleModal}
        setOpenModalPJ={setOpenModalPJ}
      />
    </>
  )
}

InformationDossier.propTypes = {
  setListPJ: PropTypes.string,
  setOpenModalPJ: PropTypes.string,
  setTitleModal: PropTypes.string,
  dataDossier: PropTypes.shape({
    id: PropTypes.string,
    dossierFiles: PropTypes.array,
    messages: PropTypes.object,
  }).isRequired,
}

export default InformationDossier
