import {
  getCountUsersActifs,
  getCountDossiersActifs,
  getCountAudiences,
  getCountBusiness,
  getDashboardMessages,
  getDashboardGraphes,
} from 'src/services/dashboard'

export const fetchDataCountUsers = () => {
  return async (dispatch) => {
    try {
      const response = await getCountUsersActifs()
      dispatch({ type: 'GET_COUNT_USERS_ACTIFS', payload: response.count })
    } catch (error) {
      dispatch(fetchCountUsersError(error.message))
    }
  }
}

export const fetchDataCountDossiers = () => {
  return async (dispatch) => {
    try {
      const response = await getCountDossiersActifs()
      dispatch({ type: 'GET_COUNT_DOSSIERS_ACTIFS', payload: response.count })
    } catch (error) {
      dispatch(fetchCountUsersError(error.message))
    }
  }
}

export const fetchDataCountAudiences = () => {
  return async (dispatch) => {
    //try {
    const response = await getCountAudiences()
    dispatch({ type: 'GET_COUNT_AUDIENCES', payload: response.count })
    // } catch (error) {
    //   dispatch(fetchCountUsersError(error.message))
    // }
  }
}

export const fetchDataCountBusiness = () => {
  return async (dispatch) => {
    try {
      const response = await getCountBusiness()
      dispatch({ type: 'GET_COUNT_BUSINESS', payload: response.count })
    } catch (error) {
      dispatch(fetchCountUsersError(error.message))
    }
  }
}

export const fetchDataMessages = () => {
  return async (dispatch) => {
    try {
      const response = await getDashboardMessages()
      console.log('response-->', response)
      dispatch({ type: 'GET_MESSAGES', payload: response })
    } catch (error) {
      // dispatch(fetchCountUsersError(error.message))
    }
  }
}

export const fetchDataGraphs = () => {
  return async (dispatch) => {
    try {
      const response = await getDashboardGraphes()
      console.log('response fetchDataGraphs-->', response)
      dispatch({ type: 'GET_DATA_GRAPH', payload: response })
    } catch (error) {
      // dispatch(fetchCountUsersError(error.message))
    }
  }
}

const fetchCountUsersError = (errorMessage) => ({
  type: 'FETCH_ERROR',
  payload: errorMessage,
})
