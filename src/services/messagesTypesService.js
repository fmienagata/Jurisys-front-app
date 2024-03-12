import Axios from 'src/services/axiosConfig'
import { useQuery } from 'react-query'

const getAllMessagesTypes = async () => {
  const response = await Axios.get('/api/messages_type')
  return response.data
}

const addMessageType = async (data) => {
  const response = await Axios.post('/api/messages_type', data)
  return response.data
}

const updateMessageType = async (id, data) => {
  const response = await Axios.put(`/api/messages_type/${id}`, data)
  return response.data
}

const useGetAllMessagesTypes = (config = {}) => {
  const {
    data: dataMessagesTypes,
    isLoading,
    refetch,
    ...rest
  } = useQuery(['getAllMsgs'], () => Axios.get('/api/messages_type'), {
    ...config,
  })

  return {
    dataMessagesTypes: dataMessagesTypes,
    isLoading,
    refetch: refetch,
    ...rest,
  }
}

export { getAllMessagesTypes, addMessageType, updateMessageType, useGetAllMessagesTypes }
