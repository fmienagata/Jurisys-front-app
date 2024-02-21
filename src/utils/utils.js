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

export { removeEmptyAttributes, generateQueryString }
