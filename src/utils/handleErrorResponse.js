const handleErrorResponse = (error, disconnect, displayError, navigate) => {
  // console.log('error ---> ', error)
  var message = ''
  if (error.response) {
    // La requête a été faite, mais le serveur a répondu avec un code d'erreur
    console.log('Error response status:', error.response.status)
    // Gérer l'erreur en fonction du statut de réponse
    if (error.response.status === 401) {
      // Gérer l'erreur 401
      displayError('Votre session a expiré', 'Votre session a expiré. Veuillez vous reconnecter')
      disconnect()
      navigate('/login')
      message = 'Unauthorized - Redirect to login'
    } else {
      // Gérer d'autres erreurs
      console.log('Other error - Display an error message')
    }
  } else if (error.request) {
    // La requête a été faite, mais aucune réponse n'a été reçue
    console.error('No response received')
    displayError('Votre session a expiré', 'Votre session a expiré. Veuillez vous reconnecter')
    disconnect()
    navigate('/login')
  } else {
    // Une erreur s'est produite lors de la configuration de la requête
    //  console.error('Error setting up the request:', error.message)
    displayError(`Une erreur s'est produite lors de la configuration de la requête`)
  }

  return message
}

export { handleErrorResponse }
