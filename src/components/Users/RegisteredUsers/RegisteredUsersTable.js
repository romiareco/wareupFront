import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { useState, useEffect } from "react";
import { EditUserInformationDialog } from "../EditUserInformationDialog";
import { columns } from "./RegisteredUsersTableColumns";
import { RemoveUserDialog } from "../RemoveUserDialog";

const userController = new User();

export function RegisteredUsersTable() {
  const { accessToken } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState(null);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const handleEdit = (row) => {
    setSelectedEditUser(row);
    setSelectedDeleteUser(null); // Cerrar el diálogo de eliminación si está abierto
    setIsEditDialogOpen(true);
    setIsRemoveDialogOpen(false);
  };

  const handleDelete = (row) => {
    setSelectedDeleteUser(row);
    setSelectedEditUser(null); // Cerrar el diálogo de edición si está abierto
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
        const response = await userController.getAllUsers(accessToken);
        setUsers(response.users);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns(handleEdit, handleDelete).map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? (
              users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns(handleEdit, handleDelete).map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value, row) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  {users === null
                    ? "Cargando datos..."
                    : "No se han registrado usuarios."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <EditUserInformationDialog
            selectedUser={selectedEditUser}
            openDialog={isEditDialogOpen}
            onDialogOpenChange={handleEditDialogOpenChange} // Pasa la función de devolución de llamada
          />
          <RemoveUserDialog
            selectedUser={selectedDeleteUser}
            openDialog={isRemoveDialogOpen}
            onDialogOpenChange={handleRemoveDialogOpenChange} // Pasa la función de devolución de llamada
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users === null ? 0 : users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
