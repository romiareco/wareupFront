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
import { columns } from "./RegisteredUsersTableColumns";
import { RemoveUserDialog, EditUserInformationDialog } from "../../Dialogs";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import {
  mapUserInformation,
  mapUserRole,
  mapUserStatus,
} from "../../../utils/mapFunctions";
import { Box, CircularProgress, Typography } from "@mui/material";
import { SortColumnData } from "../Utils";

const userController = new User();

export function RegisteredUsersTable() {
  const { accessToken } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState(null);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleEdit = (row) => {
    setSelectedEditUser(row);
    setSelectedDeleteUser(null);
    setIsEditDialogOpen(true);
    setIsRemoveDialogOpen(false);
  };

  const handleDelete = (row) => {
    setSelectedDeleteUser(row);
    setSelectedEditUser(null);
    setIsRemoveDialogOpen(true);
    setIsEditDialogOpen(false);
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
        setLoading(true);
        const response = await userController.getAllUsers(accessToken);

        if (response.users) {
          setUsers(mapUserInformation(response.users));
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [accessToken]);

  const sortedData = users ? SortColumnData(users, orderBy, order) : [];

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: "90%",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : users.length === 0 ? (
          <Typography variant="body1">
            No se han registrado usuarios.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table stickyHeader>
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
                        backgroundColor: "lightgray", // Gris con 50% de opacidad
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
                      <TableRow hover tabIndex={-1} key={row.id}>
                        {columns(handleEdit, handleDelete).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format
                                ? column.format(value, row)
                                : column.id === "status"
                                ? mapUserStatus(value)
                                : column.id === "role"
                                ? mapUserRole(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
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
        )}
        {users && users.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Usuarios por página:"
          />
        )}
      </Paper>
    </ThemeProvider>
  );
}
