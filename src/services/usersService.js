import Axios from 'src/services/axiosConfig'
import axios from 'axios'
//import baseUrlMock from './mock-users.json' // `api/users`

const baseUrlMock = './data/mock-users.json'

const axiosMockInstance = axios.create({
  baseURL: '', // You can specify an empty string if you don't want to prepend any base URL
})

axios.defaults.baseURL = ''

const getUsers = async () => {
  try {
    const response = await Axios.get('/api/users')
    const data = response.data
    console.log('Data:', data)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  }
}

const getUsers2 = async () => {
  const response = await fetch('mock-users.json')
  const data = await response.json()
  console.log('response=> ', data)
  return data

  //   return fetch(baseUrlMock)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       // You can handle errors here or propagate them to the calling component
  //       console.error('Error fetching users:', error)
  //       throw error
  //     })
}

export { getUsers }
