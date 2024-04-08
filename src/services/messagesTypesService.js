import Axios from 'src/services/axiosConfig'
import { useQuery } from 'react-query'

const getAllMessagesTypes = async () => {
  const response = await Axios.get('/api/messages_type')
  return response.data
}

const addMessageType = async (data) => {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  const response = await Axios.post('/api/messages_type', formData)
  return response.data
}

const updateMessageType = async (id, data) => {
  const response = await Axios.put(`/api/messages_type/${id}`, data)
  return response.data
}

const daleteMessageType = async (id) => {
  const response = await Axios.delete(`/api/messages_type/${id}`)
  return response.data
}

const useGetAllMessagesTypes = (config = {}) => {
  const {
    data: dataMessagesTypes,
    isLoading,
    refetch,
    ...rest
  } = useQuery(['getAllMsgsType'], () => Axios.get('/api/messages_type'), {
    ...config,
  })

  return {
    dataMessagesTypes: dataMessagesTypes,
    isLoading,
    refetch: refetch,
    ...rest,
  }
}

export {
  getAllMessagesTypes,
  daleteMessageType,
  addMessageType,
  updateMessageType,
  useGetAllMessagesTypes,
}
