import { getAllMessagesTypes } from 'src/services/messagesTypesService'

export const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await getAllMessagesTypes()
      dispatch({ type: 'GET_DATA_MESSAGES_TYPES', payload: response })
    } catch (error) {}
  }
}
