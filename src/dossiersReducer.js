// dossiersReducer.js
const initialStateData = {
  data: [],
}

const dossiersReducer = (state = initialStateData, action) => {
  switch (action.type) {
    case 'GET_DATA_DOSSIERS':
      return { ...state, data: action.payload }
    default:
      return state
  }
}

export { dossiersReducer }
