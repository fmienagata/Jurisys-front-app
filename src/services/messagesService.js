import Axios from 'src/services/axiosConfig'

const getAllMessages = async () => {
  const response = await Axios.get('/api/messages')
  return response.data
}

const deleteMessage = async (id) => {
  try {
    const response = await Axios.delete(`/api/messages/${id}/message_files`)
    return response.data
  } catch (error) {
    const fallbackResponse = await Axios.delete('/api/messages/' + id)
    return fallbackResponse.data
  }
}

const addMessage = async (message) => {
  const formData = new FormData()
  for (const key in message) {
    formData.append(key, message[key])
  }
  const response = await Axios.post('/api/messages', formData)
  return response.data
}

const addMessageFiles = async (formData, id) => {
  try {
    const response = await Axios.post(`/api/messages/${id}/message_files`, formData)
    return response.data
  } catch (error) {
    const apiMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.response?.data?.detail ||
      error?.message
    throw new Error(apiMessage || "Echec lors de l'envoi des fichiers")
  }
}

export { getAllMessages, deleteMessage, addMessage, addMessageFiles }
