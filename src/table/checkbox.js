/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef, useRef } from 'react'
import MuiCheckbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'

export const Checkbox = forwardRef((props, ref) => {
  const { inderterminate, id, isRadio, ...rest } = props
  const defaultRef = useRef(null)
  const resolvedRef = ref || defaultRef

  return isRadio ? (
    <Radio data-testid={id} ref={resolvedRef} />
  ) : (
    <MuiCheckbox data-testid={id} ref={resolvedRef} indeterminate={inderterminate} {...rest} />
  )
})
