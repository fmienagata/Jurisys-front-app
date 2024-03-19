import React, { useEffect, useState } from 'react'
import { CCol, CContainer, CRow, CSpinner } from '@coreui/react'
import InformationCard from './InformationCard'
import { useLocation } from 'react-router-dom'
import MessagesView from './MessagesView'
import { useMessageContext } from 'src/Context/MessageContext'
import { getMessagesDossier } from '../../../services/dossiersService'
import ModalPiecesJointes from 'src/views/pages/dossiers/ModalPiecesJointes'

const Dossier = () => {
  const location = useLocation()
  const { state } = location
  const [messages, setMessages] = useState([])
  const [listPJ, setListPJ] = useState([])
  const [titleModal, setTitleModal] = useState('')
  const [openModalPJ, setOpenModalPJ] = useState(false)
  const [loading, setLoading] = useState(false)
  const { displayError } = useMessageContext()

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const messagesData = await getMessagesDossier(state.data.id)
      setMessages(messagesData)
      setLoading(false)
    } catch (error) {
      displayError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CContainer>
      <CRow xs={{ gutterX: 4 }}>
        <CCol xs={4} direction="column">
          <InformationCard
            dataDossier={state.data}
            setListPJ={setListPJ}
            setTitleModal={setTitleModal}
            setOpenModalPJ={setOpenModalPJ}
          />
        </CCol>
        <CCol xs={8}>
          {!loading ? (
            <MessagesView
              dataDossier={state.data}
              messages={messages}
              setListPJ={setListPJ}
              setTitleModal={setTitleModal}
              setOpenModalPJ={setOpenModalPJ}
            />
          ) : (
            <CSpinner color="info" />
          )}
        </CCol>
        <ModalPiecesJointes
          openModal={openModalPJ}
          setOpenModalPJ={setOpenModalPJ}
          listPJ={listPJ}
          titleModal={titleModal}
        />
      </CRow>
    </CContainer>
  )
}

export default Dossier
