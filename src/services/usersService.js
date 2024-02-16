import Axios from 'src/services/axiosConfig'

const getUsers = async () => {
  const response = await Axios.get('/api/users')
  return response.data
}

const getUser = async (idUser) => {
  const response = await Axios.get(`/api/users/${idUser}`)
  return response.data
}

const addUser = async (data) => {
  const response = await Axios.post('/api/users', data)
  return response.data
}

const editUser = async (idUser, data) => {
  const response = await Axios.put(`/api/users/${idUser}`, data)
  return response.data
}

const deleteUser = async (idUser) => {
  const response = await Axios.delete(`/api/users/${idUser}`)
  return response.data
}

export { getUsers, addUser, editUser, deleteUser, getUser }
