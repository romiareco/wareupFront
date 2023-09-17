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
import { columns } from "./UserRequestRegisterDepositTableColumns";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import {
  mapDepositRequestInformation,
  mapDepositRequestStatus,
} from "../../../utils/mapFunctions";
import { CancelRequestDeposit } from "../../Dialogs";

const controller = new RequestDeposit();

export function UserRequestRegisterDepositTable() {
  const { accessToken, user } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [requestDeposits, setRequestDeposits] = useState(null);
  const [selectedRequestDeposit, setSelectedRequestDeposit] = useState(null);
  const [isChangeStatusDialogOpen, setIsChangeStatusDialogOpen] =
    useState(false);

  const handleChangeStatus = (row) => {
    setSelectedRequestDeposit(row);
    setIsChangeStatusDialogOpen(true);
  };

  const handleChangeStatusDialogOpenChange = (isOpen) => {
    setIsChangeStatusDialogOpen(isOpen);
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
        const response = await controller.getDepositsRequestsByUserId(
          accessToken,
          user.id
        );

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
                {columns(handleChangeStatus).map((column) => (
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
                        {columns(handleChangeStatus).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align="center" // Centra el contenido de las filas
                            >
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
            <CancelRequestDeposit
              selectedRequestDeposit={selectedRequestDeposit}
              openDialog={isChangeStatusDialogOpen}
              onDialogOpenChange={handleChangeStatusDialogOpenChange}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
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
