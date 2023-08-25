

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
import { columns } from "./RegisteredDepositsTableColumns";
import { RemoveUserDialog, EditUserInformationDialog } from "../../Dialogs";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";

const depositController = new Deposit();

export function RegisteredDepositsTable() {
  const { accessToken } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deposits, setDeposits] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEditDeposit, setSelectedEditDeposit] = useState(null);
  const [selectedDeleteDeposit, setSelectedDeleteDeposit] = useState(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const handleEdit = (row) => {
    setSelectedEditDeposit(row);
    setSelectedDeleteDeposit(null); // Cerrar el diálogo de eliminación si está abierto
    setIsEditDialogOpen(true);
    setIsRemoveDialogOpen(false);
  };

  const handleDelete = (row) => {
    setSelectedDeleteDeposit(row);
    setSelectedEditDeposit(null); // Cerrar el diálogo de edición si está abierto
    setIsRemoveDialogOpen(true);
    setIsEditDialogOpen(false); // Ce
  };
  const handleEditDialogOpenChange = (isOpen) => {
    setIsEditDialogOpen(isOpen);
  };

  const handleRemoveDialogOpenChange = (isOpen) => {
    setIsRemoveDialogOpen(isOpen);
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
        const response = await depositController.getAllDeposits(accessToken);
        setDeposits(response.users);
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
          backgroundColor: "transparent",
        }}
      >
        <TableContainer>
          <Table stickyHeader style={{ backgroundColor: "transparent" }}>
            <TableHead>
              <TableRow>
                {columns(handleEdit, handleDelete).map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      fontFamily: "Montserrat, sans-serif", // Cambia la fuente aqu
                      backgroundColor: "rgba(128, 128, 128, 0.5)", // Gris con 50% de opacidad
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {deposits && deposits.length > 0 ? (
                deposits
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        sx={{
                          "&:hover": {
                            backgroundColor: "lightgray", // Color al pasar el mouse sobre la fila
                          },
                          backgroundColor: index % 2 === 0 ? "lightgray" : "white",
                          
                        }}
                      >
                        {columns(handleEdit, handleDelete).map((column) => {
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
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    {deposits === null
                      ? "Cargando datos..."
                      : "No se han registrado depósitos."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <EditUserInformationDialog
              selectedUser={selectedEditDeposit}
              openDialog={isEditDialogOpen}
              onDialogOpenChange={handleEditDialogOpenChange} // Pasa la función de devolución de llamada
            />
            <RemoveUserDialog
              selectedUser={selectedDeleteDeposit}
              openDialog={isRemoveDialogOpen}
              onDialogOpenChange={handleRemoveDialogOpenChange} // Pasa la función de devolución de llamada
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={deposits === null ? 0 : deposits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ThemeProvider>
  );
}
