import React, { useState, useEffect } from 'react'
import { CChartBar } from '@coreui/react-chartjs'
import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react'
import { useMessageContext } from 'src/Context/MessageContext'
import { useDashboardGraphes } from 'src/services/dashboardService'

const GraphDashBoard = () => {
  const { data, isLoading } = useDashboardGraphes({
    onError: (error) => {
      displayError('Erreur lors de la requête dans le composant !')
    },
  })

  const { displayError } = useMessageContext()
  const [labels, setLabels] = useState([])
  const [values, setValues] = useState([])

  useEffect(() => {
    if (data) {
      setLabels(data.map((item) => item._id))
      setValues(data.map((item) => item.total))
    }
  }, [data])

  return (
    <>
      <CCard className="mb-2" style={{ margin: 0, padding: 0 }}>
        <CCardHeader>Répartition de dossiers</CCardHeader>
        <CCardBody>
          {!isLoading ? (
            <CChartBar
              data={{
                labels: labels,
                datasets: [
                  {
                    backgroundColor: '#f87979',
                    data: values,
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
          ) : (
            <CSpinner color="info" />
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default GraphDashBoard
