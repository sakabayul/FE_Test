export const transformMetodeChart = (data = []) => {
  const metode = {
    BCA: 0,
    BRI: 0,
    BNI: 0,
    DKI: 0,
    Mandiri: 0,
    FLO: 0,
    KTP: 0,
  }

  data.forEach((row) => {
    metode.BCA += row.eBca || 0
    metode.BRI += row.eBri || 0
    metode.BNI += row.eBni || 0
    metode.DKI += row.eDKI || 0
    metode.Mandiri += row.eMandiri || 0
    metode.FLO += row.eFlo || 0
    metode.KTP +=
      (row.DinasOpr || 0) +
      (row.DinasMitra || 0) +
      (row.DinasKary || 0)
  })

  const filtered = Object.entries(metode)
  .filter(([, value]) => value !== 0)

  return {
    categories: filtered.map(([key]) => key),
    series: filtered.map(([, value]) => value),
  }
}

export const transformGerbangChart = (
  lalinData = [],
  gerbangData = []
) => {
  if (!Array.isArray(lalinData) || !Array.isArray(gerbangData)) {
    return { categories: [], series: [] }
  }
  const cabangMap = new Map()
  gerbangData.forEach((g) => {
    if (!cabangMap.has(g.id)) {
      cabangMap.set(g.id, g.NamaGerbang)
    }
  })

  const result = {}

  lalinData.forEach((item) => {
    const cabangId = item.IdGerbang
    const cabangName = cabangMap.get(cabangId) || `Cabang ${cabangId}`

    const total =
      (item.Tunai || 0) +
      (item.eBca || 0) +
      (item.eBni || 0) +
      (item.eBri || 0) +
      (item.eMandiri || 0) +
      (item.eDKI || 0) +
      (item.eMega || 0) +
      (item.eNobu || 0) +
      (item.eFlo || 0) +
      (item.DinasOpr || 0) +
      (item.DinasMitra || 0) +
      (item.DinasKary || 0)

    result[cabangName] = (result[cabangName] || 0) + total
  })

  return {
    categories: Object.keys(result),
    series: Object.values(result),
  }
}

export const transformShiftPie = (data = []) => {
  const shift = { 1: 0, 2: 0, 3: 0 }

  data.forEach((row) => {
    const vShift = row.Shift

    const vTotalLalin =
      (row.Tunai || 0) +
      (row.DinasOpr || 0) +
      (row.DinasMitra || 0) +
      (row.DinasKary || 0) +
      (row.eMandiri || 0) +
      (row.eBri || 0) +
      (row.eBni || 0) +
      (row.eBca || 0) +
      (row.eNobu || 0) +
      (row.eDKI || 0) +
      (row.eMega || 0) +
      (row.eFlo || 0)

    shift[vShift] = (shift[vShift] || 0) + vTotalLalin
  })

  return Object.entries(shift)
  .filter(([, value]) => value !== 0)
  .map(([key, value]) => ({
    name: `Shift ${key}`,
    y: value,
  }))
}

export const transformCabangPie = (
  lalinData = [],
  gerbangData = []
) => {
  if (!Array.isArray(lalinData) || !Array.isArray(gerbangData)) {
    return []
  }

  if (lalinData.length === 0 || gerbangData.length === 0) {
    return []
  }

  // Map IdCabang → NamaCabang (unique)
  const cabangMap = new Map()
  gerbangData.forEach((g) => {
    if (!cabangMap.has(g.IdCabang)) {
      cabangMap.set(g.IdCabang, g.NamaCabang)
    }
  })

  const result = {}

  lalinData.forEach((item) => {
    const cabangId = item.IdCabang
    const cabangName =
      cabangMap.get(cabangId) || `Cabang ${cabangId}`

    // SETIAP ROW = 1 KALI LEWAT
    result[cabangName] = (result[cabangName] || 0) + 1
  })

  return Object.entries(result).map(([name, value]) => ({
    name,
    y: value,
  }))
}


