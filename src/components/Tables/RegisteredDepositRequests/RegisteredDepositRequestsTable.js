import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { RequestDeposit } from "../../../api";
import { useAuth } from "../../../hooks";
import { useState, useEffect } from "react";
import { columns } from "./RegisteredDepositRequestsTableColumns";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import {
  mapDepositRequestInformation,
  mapDepositRequestStatus,
} from "../../../utils/mapFunctions";
import { AcceptRequestDeposit, CancelRequestDeposit } from "../../Dialogs";

const controller = new RequestDeposit();

export function RegisteredDepositRequestsTable() {
  const { accessToken } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [requestDeposits, setRequestDeposits] = useState(null);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [selectedAcceptRequest, setSelectedAcceptRequest] = useState(null);
  const [selectedRejectRequest, setSelectedRejectRequest] = useState(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const handleAccept = (row) => {
    setSelectedAcceptRequest(row);
    setSelectedRejectRequest(null); // Cerrar el diálogo de eliminación si está abierto
    setIsAcceptDialogOpen(true);
    setIsRejectDialogOpen(false);
  };

  const handleReject = (row) => {
    setSelectedRejectRequest(row);
    setSelectedAcceptRequest(null); // Cerrar el diálogo de edición si está abierto
    setIsRejectDialogOpen(true);
    setIsAcceptDialogOpen(false); // Ce
  };
  const handleAcceptDialogOpenChange = (isOpen) => {
    setIsAcceptDialogOpen(isOpen);
  };

  const handleRejectDialogOpenChange = (isOpen) => {
    setIsRejectDialogOpen(isOpen);
  };

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
        const response = await controller.getAllRequestDeposits(accessToken);

        if (response.depositRequests) {
          const filteredInformation = mapDepositRequestInformation(
            response.depositRequests
          );
          setRequestDeposits(filteredInformation);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken]);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: "90%",
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table stickyHeader style={{ backgroundColor: "transparent" }}>
            <TableHead>
              <TableRow>
                {columns(handleAccept, handleReject).map((column) => (
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
              {requestDeposits && requestDeposits.length > 0 ? (
                requestDeposits
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "lightgray" : "white",
                        }}
                      >
                        {columns(handleAccept, handleReject).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align="center">
                              {column.format
                                ? column.format(value, row)
                                : column.id === "status"
                                ? mapDepositRequestStatus(value)
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
                    {requestDeposits === null
                      ? "Cargando datos..."
                      : "No se han registrado depósitos."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <AcceptRequestDeposit
              selectedRequestDeposit={selectedAcceptRequest}
              openDialog={isAcceptDialogOpen}
              onDialogOpenChange={handleAcceptDialogOpenChange}
            />
            <CancelRequestDeposit
              selectedRequestDeposit={selectedRejectRequest}
              openDialog={isRejectDialogOpen}
              onDialogOpenChange={handleRejectDialogOpenChange}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={requestDeposits === null ? 0 : requestDeposits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Solicitudes de depósito por página:"
        />
      </Paper>
    </ThemeProvider>
  );
}
