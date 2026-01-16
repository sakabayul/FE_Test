export const calculateSummary = (data = []) => {
  const summary = {
    tunai: 0,
    etoll: 0,
    flo: 0,
    ktp: 0,
    total: 0,
    etollTunaiFlo: 0,
  }

  if (!Array.isArray(data)) return summary

  data.forEach((item) => {
    const tunai = Number(item.Tunai || 0)
    const flo = Number(item.eFlo || 0)
    const etoll =
      Number(item.eMandiri || 0) +
      Number(item.eBri || 0) +
      Number(item.eBni || 0) +
      Number(item.eBca || 0) +
      Number(item.eDKI || 0) +
      Number(item.eMega || 0) +
      Number(item.eNobu || 0)

    const ktp =
      Number(item.DinasOpr || 0) +
      Number(item.DinasMitra || 0) +
      Number(item.DinasKary || 0)

    summary.tunai += tunai
    summary.flo += flo
    summary.etoll += etoll
    summary.ktp += ktp

    summary.etollTunaiFlo += tunai + flo + etoll
    summary.total += tunai + flo + etoll + ktp
  })

  return summary
}
