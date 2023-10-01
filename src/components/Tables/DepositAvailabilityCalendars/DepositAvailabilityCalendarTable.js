import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import { Deposit } from "../../../api";
import { useAuth } from "../../../hooks";
import { columns } from "./DepositAvailabilityCalendarTableColumns";
import theme from "../../../theme/theme";
import { mapDepositCalendar } from "../../../utils/mapFunctions";

const depositController = new Deposit();

export function DepositAvailabilityCalendarTable({ deposit }) {
  const { accessToken } = useAuth();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [depositCalendars, setDepositCalendars] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response =
          await depositController.getDepositAvailabilityByDepositId(
            accessToken,
            deposit.id
          );

        if (response.depositCalendars) {
          const customDepositCalendars = mapDepositCalendar(
            response.depositCalendars
          );
          setDepositCalendars(customDepositCalendars);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [accessToken, deposit.id]);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : depositCalendars.length === 0 ? (
          <Typography sx={theme.typography.montserratFont} variant="body1">
            No se registró disponibilidad para este depósito.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns().map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif",
                        backgroundColor: "lightgray",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {depositCalendars
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{
                          "&:hover": {
                            backgroundColor: "lightgray",
                          },
                          backgroundColor:
                            index % 2 === 0 ? "lightgray" : "white",
                        }}
                      >
                        {columns().map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format
                                ? column.format(value, row)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {depositCalendars.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={depositCalendars.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Calendarios de disponibilidad por página:"
          />
        )}
      </Paper>
    </ThemeProvider>
  );
}
