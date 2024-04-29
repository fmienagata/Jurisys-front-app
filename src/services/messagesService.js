import Axios from 'src/services/axiosConfig'

const getAllMessages = async () => {
  const response = await Axios.get('/api/messages')
  return response.data
}

const deleteMessage = async (id) => {
  const response = await Axios.delete('/api/messages/' + id)
  return response.data
}

const addMessage = async (message) => {
  const formData = new FormData()
  for (const key in message) {
    formData.append(key, message[key])
  }
  const response = await Axios.post('/api/messages', formData)
  return response.data
}

const addMessageFiles = async (file, id) => {
  const response = await Axios.post(`/api/messages/${id}/message_files`, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export { getAllMessages, deleteMessage, addMessage, addMessageFiles }
