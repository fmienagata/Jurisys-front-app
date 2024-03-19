const removeEmptyAttributes = (metadata) => {
  for (const key in metadata) {
    if (metadata[key] === '' || metadata[key] === null || metadata[key] === undefined) {
      delete metadata[key]
    }
  }
  return metadata
}

function generateQueryString(data) {
  const queryString = Object.keys(data)
    .map((key) => `${key}:${encodeURIComponent(data[key])}`)
    .join(',')
  return queryString
}

function capitalizeFirstLetter(str) {
  if (typeof str === 'string') return str.charAt(0).toUpperCase() + str.slice(1)
  return str
}

function filtredValues(data, filter) {
  return data.filter((item) =>
    Object.values(item)
      .filter((value) => typeof value === 'string') // Filter only string properties
      .some((prop) => prop.toLowerCase().includes(filter)),
  )
}

function formatFrenchDate(dateString) {
  const dateObj = new Date(dateString)
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  const formattedDate = dateObj.toLocaleDateString('fr-FR', options)
  return formattedDate.replace(',', ' à')
}

export {
  formatFrenchDate,
  removeEmptyAttributes,
  generateQueryString,
  capitalizeFirstLetter,
  filtredValues,
}
