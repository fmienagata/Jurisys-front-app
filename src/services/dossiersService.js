import Axios from 'src/services/axiosConfig'
import { useQuery } from 'react-query'
import { generateQueryString } from './../utils/utils'

const addDossier = async (dossier) => {
  try {
    const response = await Axios.post('api/dossiers', dossier)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  }
}

function createDossier(dossier) {
  return Axios.post('api/dossiers', dossier).then(async (response) => {
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
  const queryString = generateQueryString(data)

  return Axios.get(`api/dossiers?criteria=${queryString}`).then(async (response) => {
    return response.data
  })
}

const useGetAllDossiers = (config = {}) => {
  const {
    data: dossiers,
    isLoading,
    refetch,
    ...rest
  } = useQuery(['getAllDossiers'], () => getDossiers(), {
    ...config,
    staleTime: Infinity,
  })

  return {
    dossiers: dossiers,
    isLoading,
    refetch: refetch,
    ...rest,
  }
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
  useGetAllDossiers,
}
