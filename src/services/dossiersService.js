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

function updateDossier(dossier) {
  // return Axios.put('http://www.cabinet-bogl.com/api/dossiers/65abe5bbdaa161c7c10f32d4', dossier, {
  //   headers: { 'Content-type': 'multipart/form-data' },
  // }).then(async (response) => {
  //   return response.data
  // })
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append(
    'Authorization',
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDc5MjI2ODEsImV4cCI6MTcwNzkyNjI4MSwicm9sZXMiOltdLCJ1c2VybmFtZSI6ImFkbWluIn0.SJN8F8sQ63TWDeLXBMmcAUmHHrsejYcGhYCxnlOF6CoHHSf6uGSEX8HlLGUeXjQSP418a-i2KGHloOzbsIZKxqj9YpB3rmTZS5Uep0GMP6HK1um0JWotbDHwZLFbaMAEBWccH1bkIg9msomVVFTU2DDBhoZxwexI1kQ2HCA4Qy-tER_ndHES5sNyrrTQT4wx_5P058x7q64jFCCGobbkPEpNhHwyDePjkKYSw9aryCJ9l6bdKysZwPO2Tli1VwgqXEyvLXjMtcVB-t_3tNkRKXX1MfR47jL3VD1wF4gwuRKrChVikPisdaM3VHkKaMe6-GOVH646RP_zXRqtXW7F6A',
  )

  const raw = JSON.stringify({
    nom: 'test',
    prenom: 'test',
  })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  fetch('http://www.cabinet-bogl.com/api/dossiers/65abe5bbdaa161c7c10f32d4', requestOptions)
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
  return Axios.get('http://www.cabinet-bogl.com/api/dossiers/65abe5bbdaa161c7c10f32d4').then(
    async (response) => {
      return response.data
    },
  )
}

export { addDossier, createDossier, getDossiers, updateDossier, getDossierID }
