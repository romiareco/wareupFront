import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { DepositRequest } from "../../../api";
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

const controller = new DepositRequest();

export function UserRequestRegisterDepositTable() {
  const { accessToken, user } = useAuth();
  const [orderBy, setOrderBy] = useState(""); // Columna seleccionada para ordenamiento
  const [order, setOrder] = useState("asc"); // Dirección de ordenamiento (asc o desc)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [requestDeposits, setRequestDeposits] = useState(null);
  const [selectedRequestDeposit, setSelectedRequestDeposit] = useState(null);
  const [isChangeStatusDialogOpen, setIsChangeStatusDialogOpen] =
    useState(false);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

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

  // Dentro de la función handleRequestSort
  const sortedData = requestDeposits
    ? [...requestDeposits].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (typeof aValue === "number" && typeof bValue === "number") {
          // Si ambos valores son números, realiza una comparación numérica
          return order === "asc" ? aValue - bValue : bValue - aValue;
        } else {
          // Si al menos uno de los valores no es un número, realiza una comparación de cadenas
          const stringA = String(aValue || ""); // Convierte a cadena de texto y maneja valores nulos o indefinidos
          const stringB = String(bValue || ""); // Convierte a cadena de texto y maneja valores nulos o indefinidos
          return order === "asc"
            ? stringA.localeCompare(stringB)
            : stringB.localeCompare(stringA);
        }
      })
    : [];

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
                    align="center"
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      fontFamily: "Montserrat, sans-serif",
                      backgroundColor: "lightgray",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                    {orderBy === column.id && (
                      <span>{order === "asc" ? "▲" : "▼"}</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
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
                      {columns(handleChangeStatus).map((column) => {
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
                })}
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
          count={requestDeposits ? requestDeposits.length : 0}
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
