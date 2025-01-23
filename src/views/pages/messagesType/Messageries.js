import React, { useState, useEffect } from 'react'
import {
  CCardHeader,
  CRow,
  CSpinner,
  CCardTitle,
  CCol,
  CListGroupItem,
  CListGroup,
  CButton,
  CCard,
  CContainer,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useMessageContext } from 'src/Context/MessageContext'
import { useNavigate } from 'react-router-dom'
import { useGetAllDossiers, useGetDossierMessages } from 'src/services/dossiersService'
import { useQueryClient } from 'react-query'
import Inbox from './components/Inbox'
import SidebarBox from './components/SidebarBox'
import './components/style.scss'
import { useAuth } from 'src/Context/AuthContext'
import { formatFrenchDate, filterMessages } from 'src/utils/utils'
import { handleErrorResponse } from '../../../utils/handleErrorResponse'

const Messageries = () => {
  const queryClient = useQueryClient()
  const { displayError } = useMessageContext()
  const { disconnect } = useAuth()

  const navigate = useNavigate()

  const [dataDossiers, setDataDossiers] = useState([])

  const [messagesSelected, setMessagesSelected] = useState([])
  const [messagesDetails, setMessagesDetails] = useState([])
  const [activeInboxIndex, setActiveInboxIndex] = useState(0)
  const [activeNavLink, setActiveNavLink] = useState(0)

  const [clickedDossier, setClickedDossier] = useState(null)

  const { dossiers, isLoading } = useGetAllDossiers({
    onError: (error) => {
      handleErrorResponse(error, disconnect, displayError, navigate)
    },
  })

  const {
    mutate: fetchDossier,
    dossiers: messagesDossier,
    isLoading: loadingMessags,
  } = useGetDossierMessages(clickedDossier, 'avocat', {
    // onSuccess: (dataDossier) => {
    //   // setMessagesSelected(messagesDossier.messages)
    //   // setMessagesDetails(messagesDossier.messages[0])
    //   console.log('dataDossier - fetch', dataDossier)
    //   setMessagesSelected(dataDossier)
    //   setMessagesSelected(messagesDossier.messages.length > 0 ? messagesDossier[0].messages : [])
    //   setMessagesDetails(
    //     messagesDossier[0].messages.length > 0 ? messagesDossier[0].messages[0] : {},
    //   )
    //   setActiveInboxIndex(0)
    // },
    // onError: (error) => {
    //   console.log('dataDossier - fetch')
    //   handleErrorResponse(error, disconnect, displayError, navigate)
    // },
  })

  const handleSetActiveInboxIndex = (index) => {
    setActiveInboxIndex(0)
  }

  useEffect(() => {
    if (dossiers) {
      //setDataDossiers(dossiers)
      // setClickedDossier(dossiers[0].id)
      // setMessagesSelected(dossiers[0].messages.length > 0 ? dossiers[0].messages : [])
      // setMessagesDetails(dossiers[0].messages.length > 0 ? dossiers[0].messages[0] : [])
    }
  }, [dossiers])

  useEffect(() => {
    if (messagesDossier) {
      //const messagesFiltered = messagesDossier && filterMessages(messagesDossier, 'all')
      setMessagesSelected(messagesDossier)
    }
  }, [clickedDossier, messagesDossier])

  return (
    <>
      <CContainer
        className="my-container row justify-content-md-center"
        style={{
          height: '84vh',
          overflow: 'auto',
          width: '100%',
          display: 'flex',
        }}
      >
        <CCard>
          <CRow>
            <CCol
              xs={3}
              style={{
                height: '83vh',
                overflow: 'auto',
                border: '1px solid #a5a5a6',
                paddingBottom: 0,
              }}
            >
              {!isLoading && dossiers && (
                <SidebarBox
                  dataDossiers={dossiers}
                  // setMessagesSelected={setMessagesSelected}
                  setActiveNavLink={setActiveNavLink}
                  setActiveInboxIndex={handleSetActiveInboxIndex}
                  activeNavLink={activeNavLink}
                  setClickedDossier={setClickedDossier}
                  fetchDossier={fetchDossier}
                  typeMessage={'avocat'}
                />
              )}
            </CCol>
            <CCol
              xs={3}
              style={{
                height: '83vh',
                overflow: 'auto',
                width: '25%',
                border: '1px solid #a5a5a6',
              }}
            >
              {!loadingMessags ? (
                messagesSelected.length > 0 && (
                  <Inbox
                    messagesSelected={messagesSelected}
                    setMessagesDetails={setMessagesDetails}
                    setActiveInboxIndex={setActiveInboxIndex}
                    activeInboxIndex={activeInboxIndex} // Passer l'index actif
                  />
                )
              ) : (
                <CSpinner color="primary" />
              )}
            </CCol>
            <CCol xs={6}>
              {messagesSelected.length !== 0 && messagesDetails && (
                <CListGroup>
                  <>
                    <CCardHeader className="text-center">
                      <CRow className="align-items-center">
                        <CCol className="text-start" xs={4}>
                          <CRow>
                            <small className="text-medium-emphasis">
                              {formatFrenchDate(messagesDetails.createdAt)}
                            </small>
                          </CRow>
                        </CCol>
                        <CCol className="text-start" xs={4}>
                          <CCardTitle>
                            <small>{messagesDetails.type}</small>
                          </CCardTitle>
                        </CCol>
                        {true && (
                          <CCol className="text-end" xs={4}>
                            <CButton color="success" variant="ghost" size="sm">
                              <CIcon icon={icon.cilFolderOpen} size="sm" />
                            </CButton>
                            <CButton
                              color="success"
                              variant="ghost"
                              size="sm"
                              onClick={() => console.log('delete -> ', messagesDetails.id)}
                            >
                              <CIcon icon={icon.cilTrash} size="sm" />
                            </CButton>
                          </CCol>
                        )}
                      </CRow>
                    </CCardHeader>
                    <CListGroup flush>
                      <CListGroupItem>
                        <CRow className="align-items-center">
                          <CCol className="text-start" xs={12}>
                            <>{messagesDetails.text}</>
                          </CCol>
                        </CRow>
                      </CListGroupItem>
                    </CListGroup>
                  </>
                </CListGroup>
              )}
            </CCol>
          </CRow>
        </CCard>
      </CContainer>
    </>
  )
}

export default Messageries
