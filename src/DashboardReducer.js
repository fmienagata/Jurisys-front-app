const initialStateDashboard = {
  countUsers: null,
  countDossiers: null,
  countAudiences: null,
  countBusiness: null,
  dataGraph: null,
  messages: null,
  error: null,
}

const dataDashboardReducer = (state = initialStateDashboard, action) => {
  switch (action.type) {
    case 'GET_COUNT_USERS_ACTIFS':
      return { ...state, countUsers: action.payload }
    case 'GET_COUNT_DOSSIERS_ACTIFS':
      return { ...state, countDossiers: action.payload }
    case 'GET_COUNT_AUDIENCES':
      return { ...state, countAudiences: action.payload }
    case 'GET_COUNT_BUSINESS':
      return { ...state, countBusiness: action.payload }
    case 'GET_MESSAGES':
      return { ...state, messages: action.payload }
    case 'GET_DATA_GRAPH':
      return { ...state, dataGraph: action.payload }
    case 'FETCH_ERROR':
      return { ...state, error: action.payload }

    default:
      return state
  }
}

export { dataDashboardReducer }
