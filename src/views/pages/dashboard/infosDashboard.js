import React, { useEffect, useState } from 'react'
import { CCol, CWidgetStatsF, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchDataCountDossiers,
  fetchDataCountAudiences,
  fetchDataCountBusiness,
} from 'src/dashboardActions'

import { useMessageContext } from 'src/Context/MessageContext'
import { handleErrorResponse } from 'src/utils/handleErrorResponse'
import { useAuth } from 'src/Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  useCountUsers,
  useCountDossiersActifs,
  useCountAudiences,
  useCountBusiness,
} from 'src/services/dashboardService'

const useDashboardData = (property, fetchDataAction) => {
  const { disconnect } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { displayError } = useMessageContext()
  const dashboardDataStore = useSelector((state) => state.dashboard)
  const [count, setCount] = useState(dashboardDataStore[property])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (dashboardDataStore[property] === null) {
      setLoading(true)
      dispatch(fetchDataAction())
        .then(() => {
          setLoading(false)
        })
        .catch((error) => {
          handleErrorResponse(error, disconnect, displayError, navigate)

          setLoading(false)
        })
    } else {
      setCount(dashboardDataStore[property])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardDataStore[property]])

  return { count, loading }
}

const InfosDashboard = () => {
  const { displayError } = useMessageContext()

  const { data: dataUsers, isLoading: loadingUsers } = useCountUsers({
    onError: (error) => {
      displayError('Erreur lors de la requête dans le composant !')
    },
  })

  const { data: dataDossiersActifs, isLoading: loadingDossiersActifs } = useCountDossiersActifs({
    onError: (error) => {
      displayError('Erreur lors de la requête dans le composant !')
    },
  })

  const { data: dataCountAudiences, isLoading: loadingAudiences } = useCountAudiences({
    onError: (error) => {
      displayError('Erreur lors de la requête dans le composant !')
    },
  })

  const { data: dataCountBusiness, isLoading: loadingBusiness } = useCountBusiness({
    onError: (error) => {
      displayError('Erreur lors de la requête dans le composant !')
    },
  })

  return (
    <>
      <CCol xs={3} style={{ padding: 0 }}>
        {
          <CWidgetStatsF
            className="mb-3"
            color="teal"
            icon={
              !loadingDossiersActifs ? (
                <CIcon icon={icon.cilFolderOpen} height={24} />
              ) : (
                <CSpinner color="info" />
              )
            }
            padding={false}
            title="Dossiers actifs"
            value={dataDossiersActifs && dataDossiersActifs.count}
          />
        }
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsF
          className="mb-3"
          color="blue"
          icon={
            !loadingUsers ? <CIcon icon={icon.cilGroup} height={24} /> : <CSpinner color="info" />
          }
          padding={false}
          title="Utilisateurs actifs"
          value={dataUsers && dataUsers.count}
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsF
          className="mb-3"
          color="cyan"
          icon={
            !loadingAudiences ? (
              <CIcon icon={icon.cilCalendar} height={24} />
            ) : (
              <CSpinner color="info" />
            )
          }
          style={{ '--cui-card-cap-bg': '#3b5998' }}
          padding={false}
          title="Nombre d'audience"
          value={dataCountAudiences && dataCountAudiences.count}
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsF
          className="mb-3"
          color="purple"
          icon={
            !loadingBusiness ? (
              <CIcon icon={icon.cilIndustry} height={24} />
            ) : (
              <CSpinner color="info" />
            )
          }
          padding={false}
          title="Nombre d'entreprises"
          value={dataCountBusiness && dataCountBusiness.count}
        />
      </CCol>
    </>
  )
}

export default InfosDashboard
