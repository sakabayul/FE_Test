import { formatNumber } from '@/utils/helper'

export const mapLalinWithGerbang = (
  lalinData = [],
  gerbangData = []
) => {
  if (!lalinData.length) return []

  // 🔑 Map berdasarkan IdCabang + id(gerbang)
  const gerbangMap = new Map()

  gerbangData.forEach((g) => {
    const key = `${g.IdCabang}-${g.id}`
    gerbangMap.set(key, {
      NamaCabang: g.NamaCabang,
      NamaGerbang: g.NamaGerbang,
    })
  })

  return lalinData.map((row) => {
    const key = `${row.IdCabang}-${row.IdGerbang}`
    const gerbang = gerbangMap.get(key)

    return {
      ...row,
      NamaCabang: gerbang?.NamaCabang || '-',
      NamaGerbang: gerbang?.NamaGerbang || '-',
    }
  })
}

export const buildDailyPaymentSummary = (data = []) => {
  const summary = {
    tunai: 0,
    etoll: 0,
    flo: 0,
    ktp: 0,
  }

  data.forEach((row) => {
    summary.tunai += row.Tunai || 0

    summary.etoll +=
      (row.eBca || 0) +
      (row.eBni || 0) +
      (row.eBri || 0) +
      (row.eMandiri || 0) +
      (row.eDKI || 0) +
      (row.eMega || 0) +
      (row.eNobu || 0)

    summary.flo += row.eFlo || 0

    summary.ktp +=
      (row.DinasOpr || 0) +
      (row.DinasMitra || 0) +
      (row.DinasKary || 0)
  })

  return [
    {
      key: 'TUNAI',
      label: 'Tunai',
      total: formatNumber(summary.tunai),
    },
    {
      key: 'ETOLL',
      label: 'E-Toll',
      total: formatNumber(summary.etoll),
    },
    {
      key: 'FLO',
      label: 'FLO',
      total: formatNumber(summary.flo),
    },
    {
      key: 'KTP',
      label: 'KTP',
      total: formatNumber(summary.ktp),
    },
    {
      key: 'ALL',
      label: 'Keseluruhan',
      total: formatNumber(
        summary.tunai +
        summary.etoll +
        summary.flo +
        summary.ktp
      ),
    },
    {
      key: 'ETOLL_TUNAI_FLO',
      label: 'E-Toll + Tunai + FLO',
      total: formatNumber(
        summary.tunai +
        summary.etoll +
        summary.flo
      ),
    },
  ]
}
