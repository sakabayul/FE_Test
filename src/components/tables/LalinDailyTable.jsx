import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material'

const LalinDailyTable = ({ data, onDetail }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Jenis Pembayaran</TableCell>
          <TableCell>Total</TableCell>
          <TableCell align="center">Aksi</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((row) => (
          <TableRow key={row.key}>
            <TableCell>{row.label}</TableCell>
            <TableCell>{row.total}</TableCell>
            <TableCell align="center">
              <Button
                size="small"
                variant="outlined"
                onClick={() => onDetail(row.key, row.label)}
              >
                Detail
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default LalinDailyTable
