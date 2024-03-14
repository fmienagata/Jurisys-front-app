import Axios from 'src/services/axiosConfig'
import { useQuery } from 'react-query'

const getCountUsersActifs = async () => {
  const response = await Axios.get('/api/users?count=true')
  return response.data
}

const getCountDossiersActifs = async () => {
  const response = await Axios.get('/api/dossiers?criteria=statut:actif&count=true')
  return response.data
}

const getCountAudiences = async () => {
  const response = await Axios.get(`/api/messages?criteria=dateAudienceStart:2024-03-06&count=true`)
  return response.data
}

const getCountBusiness = async () => {
  const response = await Axios.get(`/api/societes?count=true`)
  return response.data
}

const getDashboardMessages = async () => {
  const response = await Axios.get(`/api/messages?limit=5&sorts=createdAt:desc`)
  return response.data
}

const getDashboardGraphes = async () => {
  const response = await Axios.get(`/api/dossiers?group=typeProcedure`)
  return response.data
}

const useGetAllAgenda = (config = {}) => {
  const {
    data: dataMessagesTypes,
    isLoading,
    refetch,
    ...rest
  } = useQuery(
    ['getAgenda'],
    () =>
      Axios.get('/api/messages?criteria=dateAudienceStart:2024-03-01,dateAudienceEnd:2024-03-31'),
    {
      ...config,
      staleTime: Infinity,
    },
  )

  return {
    dataMessagesTypes: dataMessagesTypes,
    isLoading,
    refetch: refetch,
    ...rest,
  }
}

export {
  getCountUsersActifs,
  getCountDossiersActifs,
  getCountAudiences,
  getCountBusiness,
  getDashboardMessages,
  getDashboardGraphes,
  useGetAllAgenda,
}
