import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LevelObject } from '../types';
import { IconButton, SxProps, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Theme } from "@mui/material";

interface Props {
  rows: LevelObject[];
  deleteRow?: (level: number) => void;
  sx?: SxProps<Theme>;
}

const LevelsTable: FC<Props> = ({ rows, deleteRow, sx }) => (<TableContainer sx={{ width: "50%", mb: 5, ...(sx ? sx : {}) }} component={Paper}>
  <Table aria-label="levleTable table">
    <TableHead>
      <TableRow>
        <TableCell align="right">سطح</TableCell>
        <TableCell align="right">درصد</TableCell>
        {deleteRow ? <TableCell align="right"></TableCell> : null}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.levelNumber}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" align="right">
            <Typography sx={{ fontSize: '18px' }}>
              {row.levelNumber}
            </Typography>
          </TableCell>
          <TableCell component="th" align="right">
            <Typography sx={{ fontSize: '18px' }}>
              % {row.percent}
            </Typography>
          </TableCell>
          {deleteRow ?
            <TableCell component="th" align="right">
              <IconButton onClick={() => deleteRow(row.levelNumber)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
            : null}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>)

export default LevelsTable;
