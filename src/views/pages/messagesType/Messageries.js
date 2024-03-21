import React, { useState, useRef, useEffect } from 'react'
import {
  CBadge,
  CSidebarNav,
  CSidebarBrand,
  CCardHeader,
  CRow,
  CSidebar,
  CNavLink,
  CNavTitle,
  CNavItem,
  CCardTitle,
  CCol,
  CListGroupItem,
  CCardText,
  CListGroup,
  CButton,
  CCard,
  CContainer,
} from '@coreui/react'
import Table from 'src/table/table'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useMessageContext } from 'src/Context/MessageContext'
import Styles from './../../../table/TableStyles'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { filtredValues } from 'src/utils/utils'
import { useGetAllDossiers } from 'src/services/dossiersService'
import { useQueryClient } from 'react-query'
import Inbox from './components/Inbox'
import SidebarBox from './components/SidebarBox'
import './components/style.scss'
import { useAuth } from 'src/Context/AuthContext'
import { formatFrenchDate } from 'src/utils/utils'
import { handleErrorResponse } from '../../../utils/handleErrorResponse'

const Messageries = () => {
  const tableRefMsgsTypes = useRef(typeof useRowSelect)
  const queryClient = useQueryClient()
  const { displayError } = useMessageContext()
  const { disconnect } = useAuth()

  const navigate = useNavigate()

  const [dataDossiers, setDataDossiers] = useState([])

  const [messagesSelected, setMessagesSelected] = useState([])
  const [messagesDetails, setMessagesDetails] = useState([])
  const [activeInboxIndex, setActiveInboxIndex] = useState(0)
  const [activeNavLink, setActiveNavLink] = useState(0)

  const { dossiers, isLoading } = useGetAllDossiers({
    onSuccess: (data) => {
      setDataDossiers(data)
    },
    onError: (error) => {
      handleErrorResponse(error, disconnect, displayError, navigate)
    },
  })

  const handleSetActiveInboxIndex = (index) => {
    setActiveInboxIndex(index)
  }

  useEffect(() => {
    // Mettre à jour les messages sélectionnés lorsque activeNavLink change
    setMessagesSelected(dataDossiers[activeNavLink]?.messages || [])
    setMessagesDetails(dataDossiers[activeNavLink]?.messages[0])
    setActiveInboxIndex(0)

    // Définir le premier élément de la boîte de réception comme actif
  }, [activeNavLink, dataDossiers, messagesSelected])

  useEffect(() => {
    if (!isLoading && dossiers) {
      setDataDossiers(dossiers)
    } else {
      queryClient.invalidateQueries(['getAllDossiers'])
    }
  }, [isLoading, dossiers, queryClient])

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
              {!isLoading && (
                <SidebarBox
                  dataDossiers={dataDossiers}
                  setMessagesSelected={setMessagesSelected}
                  setActiveNavLink={setActiveNavLink}
                  setActiveInboxIndex={handleSetActiveInboxIndex}
                  activeNavLink={activeNavLink}
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
              <Inbox
                messagesSelected={messagesSelected}
                setMessagesDetails={setMessagesDetails}
                setActiveInboxIndex={setActiveInboxIndex}
                activeInboxIndex={activeInboxIndex} // Passer l'index actif
              />
            </CCol>
            <CCol xs={6}>
              {messagesDetails && (
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
                            <CButton color="success" variant="ghost" size="sm">
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
