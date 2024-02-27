const handleErrorResponse = (error) => {
  console.log('error ---> ', error)
  var message = ''
  if (error.response) {
    // La requête a été faite, mais le serveur a répondu avec un code d'erreur
    console.error('Error response status:', error.response.status)
    // Gérer l'erreur en fonction du statut de réponse
    if (error.response.status === 401) {
      // Gérer l'erreur 401
      console.log('Unauthorized - Redirect to login')
      message = 'Unauthorized - Redirect to login'
    } else {
      // Gérer d'autres erreurs
      console.log('Other error - Display an error message')
    }
  } else if (error.request) {
    // La requête a été faite, mais aucune réponse n'a été reçue
    console.error('No response received')
    message = 'No response received'
  } else {
    // Une erreur s'est produite lors de la configuration de la requête
    console.error('Error setting up the request:', error.message)
  }

  return message
}

export { handleErrorResponse }
