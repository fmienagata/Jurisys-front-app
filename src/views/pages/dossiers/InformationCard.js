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
import { capitalizeFirstLetter, formatFrenchDate } from 'src/utils/utils'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const InformationCard = ({ dataDossier, setListPJ, setOpenModalPJ, setTitleModal }) => {
  const { id, dossierFiles, messages, ...dataInfos } = dataDossier
  const [lengthLimit, setLengthLimit] = useState(8)

  const dataEntries = Object.entries(dataInfos)
  const slicedData = Object.fromEntries(dataEntries.slice(0, lengthLimit))

  function getKeyName(key) {
    let result = ''
    switch (key) {
      case 'createdAt':
        result = 'Créé le'
        break
      case 'updatedAt':
        result = 'Mis à jour'
        break
      case 'typeProcedure':
        result = 'Type de procédure'
        break
      case 'montantPrejudice':
        result = 'Montant de prejudice'
        break
      default:
        result = key
    }
    return capitalizeFirstLetter(result)
  }

  function getKeyValue(key, value) {
    let result = ''
    if (key === 'updatedAt' || key === 'createdAt') result = formatFrenchDate(value)
    else result = value

    return capitalizeFirstLetter(result)
  }

  const generateMetadatas = (metadataSpliced) => {
    return (
      <div>
        {Object.entries(metadataSpliced).map(([key, value]) => (
          <CListGroupItem key={key}>
            <CRow className="align-items-center">
              <CCol className="text-start" xs={6}>
                {getKeyName(key)}
              </CCol>
              <CCol className="text-start" xs={6}>
                {key === 'statut' ? (
                  <CBadge color={value === true ? 'dark' : 'danger'}>
                    {value === true ? 'Actif' : 'Archivé'}
                  </CBadge>
                ) : (
                  <b className="fw-semibold">{value === null ? '---' : getKeyValue(key, value)}</b>
                )}
                {key === 'montantPrejudice' && <b> € </b>}
              </CCol>
            </CRow>
          </CListGroupItem>
        ))}
      </div>
    )
  }

  return (
    <CCard>
      <CCardHeader className="text-center">
        <CRow>
          <CCol className="text-start" xs={6}>
            <CCardTitle>
              <small>Information</small>
            </CCardTitle>
          </CCol>
          {/* <CCol className="text-center" xs={3}></CCol> */}
          <CCol className="text-end" xs={6}>
            <CButton
              color="success"
              variant="ghost"
              size="sm"
              title="Consulter les piéces jointes du dossier"
              onClick={() => {
                setTitleModal('Listes des piéces jointes du dossier' + slicedData['reference'])
                setListPJ(dossierFiles)
                setOpenModalPJ(true)
              }}
            >
              <CIcon icon={icon.cilFolderOpen} size="sm" />
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
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
  setListPJ: PropTypes.string,
  setOpenModalPJ: PropTypes.string,
  setTitleModal: PropTypes.string,
  dataDossier: PropTypes.shape({
    id: PropTypes.string,
    dossierFiles: PropTypes.array,
    messages: PropTypes.object,
  }).isRequired,
}

export default InformationCard
