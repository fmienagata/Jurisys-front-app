import Axios from 'src/services/axiosConfig'

const getAllMessages = async () => {
  const response = await Axios.get('/api/messages')
  return response.data
}

const deleteMessage = async (id) => {
  const response = await Axios.delete('/api/messages/' + id)
  return response.data
}

export { getAllMessages, deleteMessage }
