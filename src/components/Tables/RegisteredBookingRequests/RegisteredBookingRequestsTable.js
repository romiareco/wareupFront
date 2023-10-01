import * as React from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { columns } from "./RegisteredBookingRequestsTableColumns";
import { BookingRequest } from "../../../api";
import { useAuth } from "../../../hooks";
import { useState, useEffect } from "react";
import {
  mapBookingRequestInformation,
  mapDepositRequestStatus,
} from "../../../utils/mapFunctions";
import theme from "../../../theme/theme";

const bookingRequestsController = new BookingRequest();

export function RegisteredBookingRequestsTable() {
  const { accessToken, user } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlePreview = (row) => {
    const queryParams = {
      id: row.depositId,
    };

    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
      .join("&");

    const url = `publication-view?${queryString}`;

    window.open(url, "_blank");
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await bookingRequestsController.getBookingRequests(
          accessToken
        );

        if (response && response.bookingRequests) {
          const filteredInformation = mapBookingRequestInformation(
            response.bookingRequests
          );
          setBookingRequests(filteredInformation);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [accessToken, user.id]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : bookingRequests.length === 0 ? (
          <Typography variant="body1">
            No se han registrado solicitudes de arrendamiento.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table stickyHeader style={{ backgroundColor: "transparent" }}>
              <TableHead>
                <TableRow>
                  {columns(handlePreview).map((column) => (
                    <TableCell
                      key={column.id}
                      align="center" // Centra el título
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif", // Cambia la fuente aqu
                        backgroundColor: "lightgray", // Gris con 50% de opacidad
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingRequests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "lightgray" : "white",
                        }}
                      >
                        {columns(handlePreview).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align="center" // Centra el contenido de las filas
                            >
                              {column.format
                                ? column.format(value, row)
                                : column.id === "status"
                                ? mapDepositRequestStatus(value) //Cambiar esto! deberia ser para bookingRequest
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={bookingRequests === null ? 0 : bookingRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Solicitudes por página:"
        />
      </Box>
    </ThemeProvider>
  );
}
