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

const InformationCard = ({
  title,
  dataDossier,
  setListPJ,
  setOpenModalPJ,
  setTitleModal,
  isPartieAdverse,
}) => {
  const { id, dossierFiles, messages, ...dataInfos } = dataDossier
  const lengthLimitInitial = isPartieAdverse ? 6 : 3
  const [lengthLimit, setLengthLimit] = useState(lengthLimitInitial)

  const titleInformation = title

  const classNameMap = {
    'Information dossier': 'text-center',
    'Information partie adverse': 'text-center grey-info-Card-adverse',
    'Information partie conseil': 'text-center blue-info-Card-conseil',
  }

  const classNameCard = classNameMap[title]

  const dataEntries = Object.entries(dataInfos)
  const slicedData = Object.fromEntries(dataEntries.slice(0, lengthLimit))

  function getKeyName(key) {
    let result = ''
    switch (key) {
      case 'reference':
        result = 'Référence'
        break
      case 'createdAt':
        result = 'Créé le'
        break
      case 'updatedAt':
        result = 'Mis à jour'
        break
      case 'typeProcedure':
        result = 'Type de procédure'
        break
      case 'telephone':
        result = 'Téléphone'
        break
      case 'montantPrejudice':
        result = 'Montant de prejudice'
        break
      case 'partieAdverseNom':
        result = 'Nom'
        break
      case 'partieAdverse':
        result = 'Partie adverse'
        break
      case 'partieAdversePrenom':
        result = 'prenom'
        break
      case 'partieAdverseEmail':
        result = 'Email'
        break
      case 'partieAdverseAdresse':
        result = 'adresse'
        break
      case 'partieAdverseVille':
        result = 'ville'
        break
      case 'partieAdversePays':
        result = 'pays'
        break
      case 'partieAdverseTelephone':
        result = 'Téléphone'
        break
      case 'prenom':
        result = 'Prénom'
        break
      case 'conseilPartieAdverseNom':
        result = 'Nom'
        break
      case 'conseilPartieAdversePrenom':
        result = 'Prénom'
        break
      case 'conseilPartieAdverseTelephone':
        result = 'Téléphone'
        break
      case 'conseilPartieAdverseEmail':
        result = 'E-Mail'
        break
      case 'conseilPartieAdverseAdresse':
        result = 'Adresse'
        break
      case 'conseilPartieAdverseVille':
        result = 'Ville'
        break
      case 'conseilPartieAdversePays':
        result = 'Pays'
        break
      default:
        result = key
    }
    return capitalizeFirstLetter(result)
  }

  function getKeyValue(key, value) {
    let result = ''
    if (key === 'montantPrejudice') return formatNumberWithPoints(value)
    else {
      if (key === 'updatedAt' || key === 'createdAt') result = formatFrenchDate(value)
      else result = value
      return capitalizeFirstLetter(result)
    }
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
                {key === 'montantPrejudice' && <b className="fw-semibold"> FCFA </b>}
              </CCol>
            </CRow>
          </CListGroupItem>
        ))}
      </div>
    )
  }

  return (
    <CCard className="mb-4">
      <CCardHeader className={classNameCard}>
        <CRow>
          <CCol className="text-start" xs={6}>
            <CCardTitle>
              <small>{titleInformation}</small>
            </CCardTitle>
          </CCol>
          {/* <CCol className="text-center" xs={3}></CCol> */}
          <CCol className="text-end" xs={6}>
            {dossierFiles && dossierFiles.length > 0 && (
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
            )}
          </CCol>
        </CRow>
      </CCardHeader>
      <CListGroup flush>{generateMetadatas(slicedData)}</CListGroup>
      {lengthLimit === lengthLimitInitial ? (
        <CButton
          color="warning"
          variant="ghost"
          onClick={() => setLengthLimit(dataInfos.lengthLimit)}
        >
          {'charger plus...'}
        </CButton>
      ) : (
        <CButton color="warning" variant="ghost" onClick={() => setLengthLimit(lengthLimitInitial)}>
          {'charger moins...'}
        </CButton>
      )}
    </CCard>
  )
}

InformationCard.propTypes = {
  title: PropTypes.string,
  setListPJ: PropTypes.string,
  setOpenModalPJ: PropTypes.string,
  setTitleModal: PropTypes.string,
  isPartieAdverse: PropTypes.bool,
  dataDossier: PropTypes.shape({
    id: PropTypes.string,
    dossierFiles: PropTypes.array,
    messages: PropTypes.object,
  }).isRequired,
}

export default InformationCard
