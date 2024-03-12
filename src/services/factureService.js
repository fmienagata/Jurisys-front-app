import Axios from 'src/services/axiosConfig'
import { useQuery } from 'react-query'

const getAllFactures = async () => {
  const response = await Axios.get('/api/factures')
  return response.data
}

const addFacture = async (data) => {
  const response = await Axios.post('/api/factures', data)
  return response.data
}

const updateFacture = async (id, data) => {
  const response = await Axios.put(`/api/factures/${id}`, data)
  return response.data
}

const useGetAllFactures = (config = {}) => {
  const { data, isLoading, refetch, ...rest } = useQuery(
    ['getAllFactures'],
    () => Axios.get('/api/factures'),
    {
      ...config,
    },
  )

  return {
    data,
    isLoading,
    refetch: refetch,
    ...rest,
  }
}

export { getAllFactures, addFacture, updateFacture, useGetAllFactures }
