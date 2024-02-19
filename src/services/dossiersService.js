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
  // return Axios.put(`/api/dossiers/${id}`, dossier, {
  //   headers: { 'Content-type': 'multipart/form-data' },
  // }).then(async (response) => {
  //   return response.data
  // })
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append(
    'Authorization',
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDgyNjU2MTAsImV4cCI6MTcwODI2OTIxMCwicm9sZXMiOltdLCJ1c2VybmFtZSI6ImFkbWluIn0.ck4QjFbvN2uH-lD9GCzyXFGTasdUiM6Du4uftkE6ppo_a9OBkCrq6vvm8spp-7VOUSAVYRmxU5n5Tpr82XIOBnS3HFuyPlzMybVBH9QNxQ0bhZuqdxgsOlc9ERf8EgLnfns7M8WpBhzXjq-qdB2Iq-_BnWkWm7JN93-T3K5Z9Hfb6tn6h3sCrMAZNU6rTmvX6BEfYEnfRQwIfucd9cj3r8X-Zx6FF0DBd8w1vtAtoH1hzeocReyNx_JMsqf43XjSj9qv4QVDgbxeUA9ELiZXqKub6E-bF11wEgBSH_t0HueIuAf-yuKlj0WpVNLBhhPZcq91w6j_h1YAv8GO9U93Jg',
  )

  const raw = JSON.stringify({
    nom: 'test-002',
    prenom: 'test-002',
    juridiction: 'dsds',
    societe: 'ghg',
  })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  fetch('http://www.cabinet-bogl.com/api/dossiers/65c29fc5a06121016708161d', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
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
  return Axios.delete(`/api/users/${id}`).then(async (response) => {
    return response.data
  })
}

export { addDossier, createDossier, deleteDossier, getDossiers, updateDossier, getDossierID }
