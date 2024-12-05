import Axios from 'src/services/axiosConfig'
import { useQuery } from 'react-query'
import { removeEmptyAttributes } from 'src/utils/utils'

const getAllSocietes = async () => {
  const response = await Axios.get('/api/societes')
  return response.data
}

const addSociete = async (data) => {
  const formData = new FormData()
  for (const key in removeEmptyAttributes(data)) {
    formData.append(key, data[key])
  }
  const response = await Axios.post('/api/societes', formData)
  return response.data
}

const updateSociete = async (id, data) => {
  const response = await Axios.put(`/api/societes/${id}`, data)
  return response.data
}

const daleteSociete = async (id) => {
  const response = await Axios.delete(`/api/societes/${id}`)
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

export { getAllSocietes, addSociete, daleteSociete, updateSociete, useGetAllSocietes }
