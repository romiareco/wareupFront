import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Deposit } from "../../../api";
import { useAuth } from "../../../hooks";
import { useState, useEffect } from "react";
import { columns } from "./UserRequestRegisterDepositTableColumns";
import { RemoveUserDialog, EditUserInformationDialog } from "../../Dialogs";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import { mapDepositRequestInformation, mapDepositRequestStatus } from "../../../utils/mapFunctions";

const depositController = new Deposit();

export function UserRequestRegisterDepositTable() {
  const { accessToken, user } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [requestDeposits, setRequestDeposits] = useState(null);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [selectedAcceptRequest, setSelectedAcceptRequest] = useState(null);
  const [selectedRejectRequest, setSelectedRejectRequest] = useState(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const handleReject = (row) => {
    setSelectedRejectRequest(row);
    setSelectedAcceptRequest(null); // Cerrar el diálogo de edición si está abierto
    setIsRejectDialogOpen(true);
    setIsAcceptDialogOpen(false); // Ce
  };
  const handleEditDialogOpenChange = (isOpen) => {
    setIsAcceptDialogOpen(isOpen);
  };

  const handleRemoveDialogOpenChange = (isOpen) => {
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
        const response = await depositController.getDepositsRequestsByUserId(
          accessToken,
          user.id
        );

        if(response.depositRequests) {
          const filteredInformation = mapDepositRequestInformation(response.depositRequests);
          setRequestDeposits(filteredInformation);
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
        <TableContainer>
          <Table stickyHeader style={{ backgroundColor: "transparent" }}>
            <TableHead>
              <TableRow>
                {columns(handleReject).map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
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
                        {columns(handleReject).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
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
                      : "No se han registrado solicitudes de depósitos."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <EditUserInformationDialog
              selectedUser={selectedAcceptRequest}
              openDialog={isAcceptDialogOpen}
              onDialogOpenChange={handleEditDialogOpenChange} // Pasa la función de devolución de llamada
            />
            <RemoveUserDialog
              selectedUser={selectedRejectRequest}
              openDialog={isRejectDialogOpen}
              onDialogOpenChange={handleRemoveDialogOpenChange} // Pasa la función de devolución de llamada
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={requestDeposits === null ? 0 : requestDeposits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ThemeProvider>
  );
}
