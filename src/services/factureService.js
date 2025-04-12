import Axios from 'src/services/axiosConfig'
import { useQuery } from 'react-query'

const getAllFactures = async () => {
  const response = await Axios.get('/api/factures')
  return response.data
}

const addFacture = async (data) => {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  const response = await Axios.post('/api/factures', formData)
  return response.data
}
export const addFactureFiles = async (formData, factureId) => {
  try {
    const response = await Axios.post(`/api/factures/${factureId}/facture_files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const updateFacture = async (id, data) => {
  const response = await Axios.put(`/api/factures/${id}`, data)
  return response.data
}

const deleteFacture = async (id) => {
  const response = await Axios.delete(`/api/factures/${id}`)
  return response.data
}

const useGetAllFactures = (config = {}) => {
  const {
    data: dataFactures,
    isLoading,
    refetch,
    ...rest
  } = useQuery(['getAllFactures'], () => Axios.get('/api/factures'), {
    ...config,
  })

  return {
    dataFactures,
    isLoading,
    refetch: refetch,
    ...rest,
  }
}

export { getAllFactures, addFacture, updateFacture, deleteFacture, useGetAllFactures }
