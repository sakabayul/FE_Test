import dayjs from 'dayjs'

const ETOLL_KEYS = [
  'eBca',
  'eBni',
  'eBri',
  'eMandiri',
  'eDKI',
  'eMega',
  'eNobu',
]

export const transformLalinRow = (row) => {
  const etoll = ETOLL_KEYS.reduce(
    (sum, key) => sum + Number(row[key] || 0),
    0
  )

  const ktp =
    Number(row.DinasOpr || 0) +
    Number(row.DinasMitra || 0) +
    Number(row.DinasKary || 0)

  const tunai = Number(row.Tunai || 0)
  const flo = Number(row.eFlo || 0)

  const total = tunai + etoll + flo + ktp
  const etollTunaiFlo = tunai + etoll + flo

  return {
    IdCabang: row.IdCabang,
    tanggal: dayjs(row.Tanggal).format('DD-MM-YYYY'),
    tunai,
    etoll,
    flo,
    ktp,
    total,
    etollTunaiFlo,
  }
}
