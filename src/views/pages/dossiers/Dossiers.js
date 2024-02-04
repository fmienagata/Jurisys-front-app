import React, { useState } from 'react'
import Register from '../register/Register'
import Modal from 'src/components/Modal'
import Display from 'src/table_2/display'

const Dossiers = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      {/* <Modal titleMessage="tester title messages" bodyMessage="tester body messages" /> */}
      <Display></Display>
    </div>
  )
}

export default Dossiers
