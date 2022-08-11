import styled from "styled-components";
import { Container } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const MyContainerSub = styled(Container)`
  && {
    display: flex;
    justify-content: space-between;
    max-width: none;
   align-self: center;
  }
`;

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:"#064F3C",
    color: theme.palette.common.white,
    fontSize: 24,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 24,
  },
}));



