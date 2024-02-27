const initialStateMessages = {
  data: null,
}

const dataMessagesTypesReducer = (state = initialStateMessages, action) => {
  switch (action.type) {
    case 'GET_DATA_MESSAGES_TYPES':
      return { ...state, data: action.payload }
    default:
      return state
  }
}

export { dataMessagesTypesReducer }
