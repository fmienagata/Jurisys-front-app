import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CCol, CContainer, CRow, CSpinner } from '@coreui/react'
import InformationDossier from './InformationDossier'
import MessagesView from './MessagesView'
import { useMessageContext } from 'src/Context/MessageContext'
import { useGetOneDossier } from '../../../services/dossiersService'
import ModalPiecesJointes from 'src/views/pages/dossiers/ModalPiecesJointes'
import ModalNewMessageDossier from 'src/components/ModalNewMessageDossier'

const Dossier = () => {
  const { dossierId } = useParams()

  const [listPJ, setListPJ] = useState([])
  const [titleModal, setTitleModal] = useState('')
  const [openModalPJ, setOpenModalPJ] = useState(false)
  const [openModalNewMSG, setOpenModalNewMSG] = useState(false)

  const { displayError } = useMessageContext()

  const { dossiers, isLoading, refetch } = useGetOneDossier(dossierId, {
    onError: (error) => {
      displayError(
        'Erreur : Impossible de récupérer les données ou données malformé . Veuillez réessayer plus tard.',
      )
    },
  })

  return (
    <CContainer>
      <CRow xs={{ gutterX: 4 }}>
        <CCol xs={5} direction="column">
          {dossiers && (
            <InformationDossier
              dataDossier={dossiers}
              setListPJ={setListPJ}
              setTitleModal={setTitleModal}
              setOpenModalPJ={setOpenModalPJ}
            />
          )}
        </CCol>
        <CCol xs={7}>
          {isLoading ? (
            <CSpinner color="info" />
          ) : (
            dossiers && (
              <MessagesView
                dataDossier={dossiers}
                messages={dossiers?.messages || []}
                setListPJ={setListPJ}
                setTitleModal={setTitleModal}
                setOpenModalPJ={setOpenModalPJ}
                setOpenModalNewMSG={setOpenModalNewMSG}
              />
            )
          )}
        </CCol>
        <ModalPiecesJointes
          openModal={openModalPJ}
          setOpenModalPJ={setOpenModalPJ}
          listPJ={listPJ}
          titleModal={titleModal}
        />
      </CRow>
      {dossiers && (
        <ModalNewMessageDossier
          openModal={openModalNewMSG}
          setOpenModal={setOpenModalNewMSG}
          dataDossier={dossiers}
          refresh={refetch}
        />
      )}
    </CContainer>
  )
}

export default Dossier
