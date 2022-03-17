import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SxProps, Typography } from '@mui/material';
import { Theme } from "@mui/material";

interface Props {
  rows: { name: string, level: number, precent: number, sumPrices: number }[];
  sx?: SxProps<Theme>;
}

const UserIncludedTable: FC<Props> = ({ rows, sx }) => (<TableContainer sx={{ width: "50%", mb: 5, ...(sx ? sx : {}) }} component={Paper}>
  <Table aria-label="levleTable table">
    <TableHead>
      <TableRow>
        <TableCell align="right">نام</TableCell>
        <TableCell align="right">سطح</TableCell>
        <TableCell align="right">درصد</TableCell>
        <TableCell align="right">مجموع خریدها</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" align="right">
            <Typography sx={{ fontSize: '18px' }}>
              {row.level}
            </Typography>
          </TableCell>
          <TableCell component="th" align="right">
            <Typography sx={{ fontSize: '18px' }}>
              % {row.precent}
            </Typography>
          </TableCell>
          <TableCell component="th" align="right">
            <Typography sx={{ fontSize: '18px' }}>
              {row.sumPrices}
            </Typography>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>)

export default UserIncludedTable;
