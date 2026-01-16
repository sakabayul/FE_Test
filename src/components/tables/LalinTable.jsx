import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
  Typography
} from "@mui/material";

const LalinTable = ({ data }) => (
  <>
    {data.length > 0 ? (
      <TableContainer component={Paper}
        sx={{
          overflowX: "auto",
        }}>
        <Table
          sx={{ minWidth: 700 }}
          >
          <TableHead>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell>Tunai</TableCell>
              <TableCell>E-TOLL</TableCell>
              <TableCell>FLO</TableCell>
              <TableCell>KTP</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell align="center">E-TOLL + TUNAI + FLO</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.tanggal}</TableCell>
                <TableCell>{row.tunai}</TableCell>
                <TableCell>{row.etoll}</TableCell>
                <TableCell>{row.flo}</TableCell>
                <TableCell>{row.ktp}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell  align="center">{row.etollTunaiFlo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={200}
      >
        <Typography variant="body2" color="text.secondary">
          Data tidak tersedia!
        </Typography>
      </Box>
    )}
  </>
);

export default LalinTable;
