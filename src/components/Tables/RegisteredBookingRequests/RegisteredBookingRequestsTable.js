import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { columns } from "./RegisteredBookingRequestsTableColumns";
import { BookingRequest } from "../../../api";
import { useAuth } from "../../../hooks";
import { useState, useEffect } from "react";
import {
  mapBookingRequestInformation,
  mapCompanyStatus,
} from "../../../utils/mapFunctions";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";

const bookingRequestsController = new BookingRequest();

export function RegisteredBookingRequestsTable() {
  const { accessToken, user } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [bookingRequests, setBookingRequests] = useState([]);

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
        const response = await bookingRequestsController.getBookingRequests(
          accessToken
        );

        if (response && response.bookingRequests) {
          const filteredInformation = mapBookingRequestInformation(
            response.bookingRequests
          );
          setBookingRequests(filteredInformation);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken, user.id]);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: "90%",
          overflow: "hidden",
        }}
      >
        <TableContainer style={{ overflowX: "auto" }}>
          <Table stickyHeader style={{ backgroundColor: "transparent" }}>
            <TableHead>
              <TableRow>
                {columns().map((column) => (
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
              {bookingRequests && bookingRequests.length > 0 ? (
                bookingRequests
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
                        {columns().map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align="center" // Centra el contenido de las filas
                            >
                              {column.format
                                ? column.format(value, row)
                                : column.id === "status"
                                ? mapCompanyStatus(value) //Cambiar esto! deberia ser para bookingRequest
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    {bookingRequests === null
                      ? "Cargando datos..."
                      : "No se han registrado solicitudes de arrendamiento."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
      </Paper>
    </ThemeProvider>
  );
}
