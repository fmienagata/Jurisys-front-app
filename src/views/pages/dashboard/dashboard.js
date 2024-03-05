import React from 'react'
import { CCol, CWidgetStatsF, CCardHeader, CRow, CCard, CCardBody } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { CChartBar } from '@coreui/react-chartjs'
import MyCalendar from 'src/views/pages/Agenda/MyCalendar'
import MessagesView from 'src/views/pages/dossiers/MessagesView'

const Dashboard = () => {
  return (
    <div>
      <CRow>
        <CCol xs={3} style={{ padding: 0 }}>
          <CWidgetStatsF
            className="mb-3"
            color="teal"
            icon={<CIcon icon={icon.cilFolderOpen} height={24} />}
            padding={false}
            title="Dossiers actifs"
            value="1250"
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="blue"
            icon={<CIcon icon={icon.cilGroup} height={24} />}
            padding={false}
            title="Clients actifs"
            value="120"
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="cyan"
            icon={<CIcon icon={icon.cilCalendar} height={24} />}
            style={{ '--cui-card-cap-bg': '#3b5998' }}
            padding={false}
            title="Nombre d'audience"
            value="72"
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="purple"
            icon={<CIcon icon={icon.cilIndustry} height={24} />}
            padding={false}
            title="Nombre d'agences"
            value="82"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={6}>
          <CRow>
            <CCard className="mb-2" style={{ margin: 0, padding: 0 }}>
              <CCardHeader>Répartition de dossiers</CCardHeader>
              <CCardBody>
                <CChartBar
                  data={{
                    labels: ['DRC', 'LIB', 'ANG', 'DMC', 'RCR', 'RFE', 'DSI', 'DHY'],
                    datasets: [
                      {
                        backgroundColor: '#f87979',
                        data: [2987, 4205, 1420, 1022, 1905, 2820, 3640, 1680],
                      },
                    ],
                  }}
                  labels="types"
                  options={{
                    plugins: {
                      label: {
                        display: false,
                      },
                      legend: {
                        display: false,
                      },
                      title: {
                        display: false,
                      },
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CRow>
          <CRow>
            <CCard style={{ margin: 0, padding: 0 }}>
              <CCardHeader>Audiences du mois</CCardHeader>
              <CCardBody>
                <MyCalendar isDashboard={true} />
              </CCardBody>
            </CCard>
          </CRow>
        </CCol>
        <CCol xs={6}>
          <MessagesView isDashboard={true} />
        </CCol>
      </CRow>
    </div>
  )
}

export default Dashboard
