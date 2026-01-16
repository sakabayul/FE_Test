const normalize = (str = '') =>
  str.toLowerCase().replace(/\s+/g, '').trim()

const findSmallestMissingId = (ids = []) => {
  const set = new Set(ids)

  let i = 1
  while (set.has(i)) {
    i++
  }
  return i
}

export const generateGerbangPayload = ({
  form,
  existingGerbangs = [],
}) => {
  const normalizedNamaCabang = normalize(form.NamaCabang)

  const sameCabang = existingGerbangs.filter(
    (g) => normalize(g.NamaCabang) === normalizedNamaCabang
  )

  let IdCabang
  let newId

  if (sameCabang.length > 0) {
    IdCabang = sameCabang[0].IdCabang

    const ids = sameCabang
      .map((g) => Number(g.id))
      .filter((id) => !isNaN(id))

    // 🔥 AMBIL ID TERKECIL YANG KOSONG
    newId = findSmallestMissingId(ids)
  } else {
    const cabangIds = existingGerbangs
      .map((g) => Number(g.IdCabang))
      .filter((id) => !isNaN(id))

    IdCabang = cabangIds.length ? Math.max(...cabangIds) + 1 : 1
    newId = 1
  }

  return {
    id: newId,
    IdCabang,
    NamaGerbang: form.NamaGerbang.trim(),
    NamaCabang: form.NamaCabang.trim(),
  }
}
