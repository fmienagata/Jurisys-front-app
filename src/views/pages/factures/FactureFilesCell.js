/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { CButton } from '@coreui/react'
import * as icon from '@coreui/icons-react' // selon vos imports, ce n'est pas obligatoire ici

const FactureFilesCell = ({ value, row, handleOpenFiles }) => {
  if (value && Array.isArray(value) && value.length > 0) {
    return (
      <CButton
        color="primary"
        variant="outline"
        size="sm"
        onClick={() => handleOpenFiles(row.original)}
      >
        Voir
      </CButton>
    )
  } else {
    return 'Aucun fichier'
  }
}

FactureFilesCell.propTypes = {
  value: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
  handleOpenFiles: PropTypes.func.isRequired,
}

export default FactureFilesCell