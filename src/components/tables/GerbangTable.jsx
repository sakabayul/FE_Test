import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box
} from "@mui/material";

const GerbangTable = ({ data, onView, onEdit, onDelete }) => (
  <>
    {data.length > 0 ? (
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nama Cabang</TableCell>
            <TableCell>Nama Gerbang</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.NamaCabang}</TableCell>
              <TableCell>{row.NamaGerbang}</TableCell>
              <TableCell align="right">
                <Button onClick={() => onView(row)}>View</Button>
                <Button onClick={() => onEdit(row)}>Edit</Button>
                <Button color="error" onClick={() => onDelete(row)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

export default GerbangTable;
