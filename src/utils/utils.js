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
  console.log('str --> ', typeof str)
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

export { removeEmptyAttributes, generateQueryString, capitalizeFirstLetter, filtredValues }
