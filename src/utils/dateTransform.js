function formatDateAgenda(date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getFirstDayOfMonth() {
  const date = new Date()
  const firstDayDate = new Date(date.getFullYear(), date.getMonth(), 1)
  return formatDateAgenda(firstDayDate)
}

function getLastDayOfMonth() {
  const date = new Date()
  const lastDayDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  console.log('lastDayDate->', lastDayDate)
  return formatDateAgenda(lastDayDate)
}

export { getFirstDayOfMonth, getLastDayOfMonth }
