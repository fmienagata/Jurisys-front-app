import Axios from 'src/services/axiosConfig'
import axios from 'axios'
//import baseUrlMock from './mock-users.json' // `api/users`

const baseUrlMock = './data/mock-users.json'

const axiosMockInstance = axios.create({
  baseURL: '', // You can specify an empty string if you don't want to prepend any base URL
})

axios.defaults.baseURL = ''

const addDossier = async (dossier) => {
  try {
    const response = await Axios.post('http://www.cabinet-bogl.com/api/dossiers', dossier)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  }
}

function createDossier(dossier) {
  return axios.post('http://www.cabinet-bogl.com/api/dossiers', dossier).then(async (response) => {
    return response.data
  })
}

function updateDossier(id, dossier) {
  return Axios.put(`/api/users/${id}`, dossier, {
    headers: { 'Content-type': 'multipart/form-data' },
  }).then(async (response) => {
    return response.data
  })
}

function getDossiers() {
  return Axios.get('api/dossiers').then(async (response) => {
    return response.data
  })
}

function getDossierID() {
  return Axios.get('http://www.cabinet-bogl.com/api/dossiers/65abe5bbdaa161c7c10f32d4').then(
    async (response) => {
      return response.data
    },
  )
}

function deleteDossier(id) {
  return Axios.get(`/api/users/${id}`).then(async (response) => {
    return response.data
  })
}

export { addDossier, createDossier, getDossiers, updateDossier, getDossierID }
