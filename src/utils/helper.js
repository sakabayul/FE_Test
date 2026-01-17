export const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0'
  }

  return Number(value).toLocaleString('id-ID')
}

export const formatDateDMY = (dateString) => {
  if (!dateString) return '-'

  const date = new Date(dateString)

  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
