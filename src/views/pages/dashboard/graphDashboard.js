import React, { useState, useEffect } from 'react'
import { CChartBar } from '@coreui/react-chartjs'
import { useDispatch, useSelector } from 'react-redux'
import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react'
import { useMessageContext } from 'src/Context/MessageContext'
import { fetchDataGraphs } from 'src/dashboardActions'

const GraphDashBoard = () => {
  const dispatch = useDispatch()
  const { displayError } = useMessageContext()
  const graphDataStore = useSelector((state) => state.dashboard.dataGraph)
  const [loading, setLoading] = useState(false)
  const [labels, setLabels] = useState([])
  const [values, setValues] = useState([])

  useEffect(() => {
    if (graphDataStore === null) {
      setLoading(true)
      dispatch(fetchDataGraphs())
        .then(() => {
          setLoading(false)
        })
        .catch((error) => {
          displayError('yes error' + error)

          setLoading(false)
        })
    } else {
      setLabels(graphDataStore.map((item) => item._id))
      setValues(graphDataStore.map((item) => item.total))
    }
  }, [dispatch, displayError, graphDataStore])

  return (
    <>
      <CCard className="mb-2" style={{ margin: 0, padding: 0 }}>
        <CCardHeader>Répartition de dossiers</CCardHeader>
        <CCardBody>
          {!loading ? (
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
