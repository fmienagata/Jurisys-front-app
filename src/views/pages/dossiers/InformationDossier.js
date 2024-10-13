import React from 'react'
import PropTypes from 'prop-types'

import InformationCard from './InformationCard'

const InformationDossier = ({ dataDossier, setListPJ, setOpenModalPJ, setTitleModal }) => {
  const dataNoDossier = {}
  const dataInfosAdverse = {}
  const dataConseil = {}
  const dataForDossier = {}

  Object.entries(dataDossier).forEach(([key, value]) => {
    if (key.includes('artieAdverse')) {
      dataNoDossier[key] = value
      if (!key.includes('conseilParti')) {
        dataInfosAdverse[key] = value
      }
    } else {
      dataForDossier[key] = value
    }

    if (key.includes('conseilParti')) {
      dataConseil[key] = value
    }
  })

  return (
    <>
      <InformationCard
        title="Information dossier"
        isPartieAdverse={true}
        dataDossier={dataForDossier}
        setListPJ={setListPJ}
        setTitleModal={setTitleModal}
        setOpenModalPJ={setOpenModalPJ}
      />

      <InformationCard
        title="Information partie adverse"
        isPartieAdverse={false}
        dataDossier={dataInfosAdverse}
        setListPJ={setListPJ}
        setTitleModal={setTitleModal}
        setOpenModalPJ={setOpenModalPJ}
      />

      <InformationCard
        title="Information partie conseil"
        isPartieAdverse={false}
        dataDossier={dataConseil}
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
