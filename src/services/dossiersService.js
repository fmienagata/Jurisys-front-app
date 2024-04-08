import Axios from 'src/services/axiosConfig'
import { useQuery, useMutation } from 'react-query'
import { generateQueryString } from './../utils/utils'

const createDossier = async (dossier) => {
  try {
    const response = await Axios.post('api/dossiers', {
      typeProcedure: 'add postman',
      reference: 'add postman 0',
      nom: 'add postman',
      prenom: 'Test add postman',
      adresse: 'Test add postman',
      email: 'addpostman@test.com',
      telephone: '01 23 45 67 89',
    })
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  }
}

function addDossier(dossier) {
  const formData = new FormData()
  for (const key in dossier) {
    formData.append(key, dossier[key])
  }
  return Axios.post('api/dossiers', formData).then(async (response) => {
    return response.data
  })
}

const addDossierFiles = async (file) => {
  const formData = new FormData()

  formData.append('file', file)
  console.log('formData file --> ', file)
  const response = await Axios.post(
    '/api/dossiers/660f14802c879012b50d7233/dossier_files',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  console.log('File uploaded successfully:', response.data)
  // return Axios.post('/api/dossiers/660f14802c879012b50d7233/dossier_files', file).then(
  //   async (response) => {
  //     return response.data
  //   },
  // )
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

function getFileDossier(fileName) {
  return Axios.get(`/api/file/${fileName}`, { responseType: 'blob' }).then(
    (response) => new Blob([response.data]),
  )
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

const useGetOneDossier = (id, config = {}) => {
  const {
    data: dossiers,
    isLoading,
    refetch,
    ...rest
  } = useQuery(['getOneDossier', id], () => getDossierID(id), {
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

const useGetDossierMessages = (config = {}) => {
  const mutateDossier = useMutation((id) => getDossierID(id), {
    ...config,
    staleTime: Infinity,
  })

  const { data: dossiers, isLoading, refetch, ...rest } = mutateDossier

  return {
    dossiers,
    isLoading,
    refetch,
    ...rest,
  }
}

export {
  addDossier,
  addDossierFiles,
  createDossier,
  deleteDossier,
  getDossiers,
  updateDossier,
  getDossierID,
  getMessagesDossier,
  getRechercheDossiers,
  useGetAllDossiers,
  useGetOneDossier,
  getFileDossier,
  useGetDossierMessages,
}
