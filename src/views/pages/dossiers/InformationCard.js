import React, { useState } from 'react'
import { CCard, CCardHeader, CListGroup, CListGroupItem, CCol, CRow, CButton } from '@coreui/react'
import PropTypes from 'prop-types'

const InformationCard = ({ dataDossier }) => {
  const { id, dossierFiles, messages, ...dataInfos } = dataDossier
  const [lengthLimit, setLengthLimit] = useState(8)

  const dataEntries = Object.entries(dataInfos)
  const slicedData = Object.fromEntries(dataEntries.slice(0, lengthLimit))

  const generateMetadatas = (metadataSpliced) => {
    return (
      <div>
        {Object.entries(metadataSpliced).map(([key, value]) => (
          <CListGroupItem key={key}>
            <CRow className="align-items-center">
              <CCol className="text-start" xs={6}>
                {key}
              </CCol>
              <CCol className="text-start" xs={6}>
                <b>{value === null ? '---' : value}</b>
              </CCol>
            </CRow>
          </CListGroupItem>
        ))}
      </div>
    )
  }

  return (
    <CCard>
      <CCardHeader className="text-center">Information</CCardHeader>
      <CListGroup flush>{generateMetadatas(slicedData)}</CListGroup>
      {lengthLimit === 8 ? (
        <CButton
          color="warning"
          variant="ghost"
          onClick={() => setLengthLimit(dataInfos.lengthLimit)}
        >
          {'charger plus...'}
        </CButton>
      ) : (
        <CButton color="warning" variant="ghost" onClick={() => setLengthLimit(8)}>
          {'charger moins...'}
        </CButton>
      )}
    </CCard>
  )
}

InformationCard.propTypes = {
  dataDossier: PropTypes.shape({
    id: PropTypes.string,
    dossierFiles: PropTypes.array,
    messages: PropTypes.array,
  }).isRequired,
}

export default InformationCard
