import * as XLSX from 'xlsx'
import { formatNumber, formatDateDMY } from '@/utils/helper'

// mapping jenis pembayaran → field
export const PAYMENT_MAP = {
  TUNAI: ['Tunai'],
  ETOLL: [
    'eBca',
    'eBni',
    'eBri',
    'eMandiri',
    'eDKI',
    'eMega',
    'eNobu',
  ],
  FLO: ['eFlo'],
  KTP: ['DinasOpr', 'DinasMitra', 'DinasKary'],
  ALL: [
    'Tunai',
    'eBca',
    'eBni',
    'eBri',
    'eMandiri',
    'eDKI',
    'eMega',
    'eNobu',
    'eFlo',
    'DinasOpr',
    'DinasMitra',
    'DinasKary',
  ],
  ETOLL_TUNAI_FLO: [
    'Tunai',
    'eBca',
    'eBni',
    'eBri',
    'eMandiri',
    'eDKI',
    'eMega',
    'eNobu',
    'eFlo',
  ],
}

// filter data berdasarkan jenis pembayaran
export const filterByPaymentType = (data, type) => {
  const fields = PAYMENT_MAP[type] || []
  
  return data.map((row) => {
    let total = 0
    fields.forEach((f) => {
      total += Number(row[f] || 0)
    })
    return {
      Tanggal: row.Tanggal,
      NamaGerbang: row.NamaGerbang,
      NamaCabang: row.NamaCabang,
      Total: formatNumber(total),
    }
  })
}

// export excel
export const exportDetailExcel = (rows, filename) => {
  const formatted = rows.map((r) => ({
    ...r,
    Tanggal: formatDateDMY(r.Tanggal),
  }))

  const worksheet = XLSX.utils.json_to_sheet(formatted)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Detail')
  XLSX.writeFile(workbook, `${filename} (${formatted[0].Tanggal}).xlsx`)
}
