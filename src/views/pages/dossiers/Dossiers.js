import React, { useState } from 'react'
import Register from '../register/Register'
import Modal from 'src/components/Modal'
import { useMessageContext } from 'src/Context/MessageContext'

const Dossiers = () => {
  const { displaySuccess } = useMessageContext()
  displaySuccess('test')
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      {/* <Modal titleMessage="tester title messages" bodyMessage="tester body messages" /> */}
    </div>
  )
}

export default Dossiers
