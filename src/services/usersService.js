import Axios from 'src/services/axiosConfig'
import { useQuery } from 'react-query'

const getUsers = async () => {
  const response = await Axios.get('/api/users')
  return response.data
}

const getUser = async (idUser) => {
  const response = await Axios.get(`/api/users/${idUser}`)
  return response.data
}

const addUser = async (data) => {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  const response = await Axios.post('/api/users', formData)
  return response.data
}

const editUser = async (idUser, data) => {
  try {
    const response = await Axios.put(`/api/users/${idUser}`, data)
    return response.data
  } catch (error) {}
}

const deleteUser = async (idUser) => {
  try {
    const response = await Axios.delete(`/api/users/${idUser}`)
    return response.data
  } catch (error) {}
}

const useGetAllUsers = (config = {}) => {
  const { data, isLoading, refetch, ...rest } = useQuery(
    ['getAllUsers'],
    () => Axios.get('/api/users'),
    {
      ...config,
    },
  )
  return {
    data,
    isLoading,
    ...rest,
  }
}

const useGetUsersTypes = (config = {}) => {
  const { data, isLoading, refetch, ...rest } = useQuery(
    ['getUsersTypes'],
    () => Axios.get('/api/user_types'),
    {
      ...config,
    },
  )

  return {
    data,
    isLoading,
    ...rest,
  }
}

export { getUsers, addUser, editUser, deleteUser, getUser, useGetAllUsers, useGetUsersTypes }
