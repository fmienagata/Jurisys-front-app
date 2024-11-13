import React from 'react'
import {
  CButton,
  CForm,
  CRow,
  CHeaderText,
  CModal,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import { Controller, useForm } from 'react-hook-form'

const ModalAgendaMessage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { showModal, setShowModal, dataMessage } = props
  const { control, handleSubmit, reset } = useForm()

  const handleCloseModal = () => {
    setShowModal(false)
    reset()
  }

  const handleUpdateMessage = async (data) => {
    console.log('data for API ->', data)
  }

  return (
    <>
      <CModal
        visible={showModal}
        onClose={() => handleCloseModal}
        aria-labelledby="VerticallyCenteredExample"
        alignment="center"
        size="md"
      >
        <CModalBody>
          <CForm onSubmit={handleSubmit(handleUpdateMessage)}>
            <CRow className="justify-content-center  m-3">
              <CHeaderText> Titre </CHeaderText>
              <Controller
                name="titre"
                // eslint-disable-next-line react/prop-types
                defaultValue={dataMessage.title}
                rules={{ required: 'Ce champs est requis' }}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CFormInput
                    {...field}
                    id="titre"
                    placeholder="Titre du message"
                    invalid={Boolean(error)}
                    feedbackInvalid={error?.message}
                  />
                )}
              />
            </CRow>
            <CRow className="justify-content-center m-3">
              <CHeaderText> Message </CHeaderText>
              <Controller
                name="text"
                control={control}
                // eslint-disable-next-line react/prop-types
                defaultValue={dataMessage.text}
                render={({ field }) => (
                  <CFormTextarea
                    {...field}
                    id="text"
                    defaultValue={''}
                    placeholder="Contenu du message à renseigner"
                    autoComplete="text"
                    rows={8}
                  ></CFormTextarea>
                )}
              />
            </CRow>
            <CRow className="justify-content-center m-3">
              <CButton type="submit" color="success">
                Modifier
              </CButton>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => handleCloseModal()}>
            Fermer
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalAgendaMessage
