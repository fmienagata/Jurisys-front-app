import Axios from 'src/services/axiosConfig'
import { useQuery } from 'react-query'
import { handleErrorResponse } from 'src/utils/handleErrorResponse'
import { useAuth } from 'src/Context/AuthContext'
import { useMessageContext } from 'src/Context/MessageContext'

const getCountUsersActifs = async () => {
  const response = await Axios.get('/api/users?count=true')
  return response.data
}

const getCountDossiersActifs = async () => {
  const response = await Axios.get('/api/dossiers?criteria=statut:actif&count=true')
  return response.data
}

const getCountAudiences = async () => {
  const response = await Axios.get(`/api/messages?criteria=dateAudienceStart:2024-04-01&count=true`)
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
  const { disconnect } = useAuth()
  const { displayError } = useMessageContext()

  const {
    data: dataAgenda,
    isLoading,
    refetch,
    ...rest
  } = useQuery(
    ['getDataAgenda'],
    () =>
      Axios.get('/api/messages?criteria=dateAudienceStart:2024-04-01,dateAudienceEnd:2024-04-30'),
    {
      ...config,
      staleTime: Infinity,
    },
  )

  return {
    dataAgenda: dataAgenda,
    isLoading,
    refetch: refetch,
    ...rest,
  }
}

const useCountUsers = (config = {}) => {
  const { data, isLoading, refetch, ...rest } = useQuery(
    ['getCountUsers'],
    () => getCountUsersActifs(),
    {
      ...config,
      staleTime: Infinity,
    },
  )

  return {
    data,
    isLoading,
    refetch: refetch,
    ...rest,
  }
}

const useCountDossiersActifs = (config = {}) => {
  const { data, isLoading, refetch, ...rest } = useQuery(
    ['getCountDossiersActifs'],
    () => getCountDossiersActifs(),
    {
      ...config,
      staleTime: Infinity,
    },
  )

  return {
    data,
    isLoading,
    refetch: refetch,
    ...rest,
  }
}

const useCountAudiences = (config = {}) => {
  const { data, isLoading, refetch, ...rest } = useQuery(
    ['getCountAudiences'],
    () => getCountAudiences(),
    {
      ...config,
      staleTime: Infinity,
    },
  )

  return {
    data,
    isLoading,
    refetch: refetch,
    ...rest,
  }
}

const useCountBusiness = (config = {}) => {
  const { data, isLoading, refetch, ...rest } = useQuery(
    ['getCountNBRBusiness'],
    () => getCountBusiness(),
    {
      ...config,
      staleTime: Infinity,
    },
  )

  return {
    data,
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
  useCountUsers,
  useCountDossiersActifs,
  useCountAudiences,
  useCountBusiness,
}
