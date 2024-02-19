import Axios from 'src/services/axiosConfig'
import axios from 'axios'

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
  return Axios.put(`api/dossiers/${id}`, dossier).then(async (response) => {
    return response.data
  })
}

function getDossiers() {
  return Axios.get('api/dossiers').then(async (response) => {
    return response.data
  })
}

function getDossierID(id) {
  return Axios.get(`api/dossiers/${id}`).then(async (response) => {
    return response.data
  })
}

function deleteDossier(id) {
  return Axios.delete(`/api/users/${id}`).then(async (response) => {
    return response.data
  })
}

function getMessagesDossier(id) {
  return Axios.get(`/api/messages?criteria=dossier:${id}`).then(async (response) => {
    return response.data
  })
}

function getRechercheDossiers(data) {
  const queryString = Object.keys(data)
    .map((key) => `${key}:${encodeURIComponent(data[key])}`)
    .join(',')

  return Axios.get(`http://www.cabinet-bogl.com/api/dossiers?criteria=${queryString}`).then(
    async (response) => {
      return response.data
    },
  )
}

export {
  addDossier,
  createDossier,
  deleteDossier,
  getDossiers,
  updateDossier,
  getDossierID,
  getMessagesDossier,
  getRechercheDossiers,
}
