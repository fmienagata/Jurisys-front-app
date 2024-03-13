import React, { useEffect, useState } from 'react'
import { CCol, CWidgetStatsF, CSpinner } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchDataCountUsers,
  fetchDataCountDossiers,
  fetchDataCountAudiences,
  fetchDataCountBusiness,
} from 'src/dashboardActions'
import { useMessageContext } from 'src/Context/MessageContext'

const useDashboardData = (property, fetchDataAction) => {
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
          displayError('erreur lors de chargements des données')
          // setLoading(false)
        })
    } else {
      setCount(dashboardDataStore[property])
    }
  }, [dashboardDataStore, dispatch, fetchDataAction])

  return { count, loading }
}

const InfosDashboard = () => {
  const {
    count: countUsers,
    loading: loadingUsers,
    error: errorUsers,
  } = useDashboardData('countUsers', fetchDataCountUsers)
  const {
    count: countDossiers,
    loading: loadingDossiers,
    error: errorDossiers,
  } = useDashboardData('countDossiers', fetchDataCountDossiers)
  const {
    count: countAudiences,
    loading: loadingAudiences,
    error: errorAudiences,
  } = useDashboardData('countAudiences', fetchDataCountAudiences)
  const {
    count: countBusiness,
    loading: loadingBusiness,
    error: errorBusiness,
  } = useDashboardData('countBusiness', fetchDataCountBusiness)

  return (
    <>
      <CCol xs={3} style={{ padding: 0 }}>
        {
          <CWidgetStatsF
            className="mb-3"
            color="teal"
            icon={
              !loadingDossiers ? (
                <CIcon icon={icon.cilFolderOpen} height={24} />
              ) : (
                <CSpinner color="info" />
              )
            }
            padding={false}
            title="Dossiers actifs"
            value={countDossiers}
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
          value={countUsers}
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
          value={countAudiences}
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
          value={countBusiness}
        />
      </CCol>
    </>
  )
}

export default InfosDashboard
