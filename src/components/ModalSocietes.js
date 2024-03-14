import React from 'react'
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CListGroupItem,
  CListGroup,
  CBadge,
  CRow,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { capitalizeFirstLetter } from 'src/utils/utils'

const ModalSociete = (props) => {
  // eslint-disable-next-line react/prop-types
  const { openSociete, setOpenSociete, action, dataSocietes } = props
  const { id, ...newData } = dataSocietes

  function getKeyName(key) {
    let result = ''
    switch (key) {
      case 'createdAt':
        result = 'Créé le'
        break
      case 'updatedAt':
        result = 'Mis à jour'
        break
      default:
        result = key
    }
    return capitalizeFirstLetter(result)
  }
  return (
    <>
      <CModal
        visible={openSociete}
        onClose={() => setOpenSociete(false)}
        aria-labelledby="VerticallyCenteredExample"
        alignment="center"
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>{capitalizeFirstLetter(dataSocietes.label)} </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CListGroup flush>
            {dataSocietes &&
              Object.entries(newData).map(([key, value]) => (
                <CListGroupItem key={key}>
                  <CRow className="align-items-center">
                    <CCol className="text-start" xs={6}>
                      {getKeyName(key)}
                    </CCol>
                    <CCol className="text-start" xs={6}>
                      {getKeyName(key) === 'Statut' ? (
                        <CBadge color={value === 'Payer' ? 'dark' : 'danger'}>{value}</CBadge>
                      ) : (
                        <b>{value === null ? '---' : value}</b>
                      )}
                    </CCol>
                  </CRow>
                </CListGroupItem>
              ))}
          </CListGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setOpenSociete(false)}>
            Fermer
          </CButton>
          {action}
        </CModalFooter>
      </CModal>
    </>
  )
}

ModalSociete.propTypes = {
  dataSocietes: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    code: PropTypes.string,
    updatedAt: PropTypes.string,
    createdAt: PropTypes.string,
  }),
}

export default ModalSociete
