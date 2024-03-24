import Axios from 'src/services/axiosConfig'
import { useQuery } from 'react-query'
import { removeEmptyAttributes } from 'src/utils/utils'

const getAllSocietes = async () => {
  const response = await Axios.get('/api/societes')
  return response.data
}

const addSociete = async (data) => {
  const response = await Axios.post('/api/societes', removeEmptyAttributes(data))
  return response.data
}

const updateSociete = async (id, data) => {
  const response = await Axios.put(`/api/societes/${id}`, removeEmptyAttributes(data))
  return response.data
}

const useGetAllSocietes = (config = {}) => {
  const {
    data: dataSocietesAPI,
    isLoading,
    refetch,
    ...rest
  } = useQuery(['getAllSocietes'], () => Axios.get('/api/societes'), {
    ...config,
  })

  return {
    dataSocietesAPI,
    isLoading,
    refetch: refetch,
    ...rest,
  }
}

export { getAllSocietes, addSociete, updateSociete, useGetAllSocietes }
