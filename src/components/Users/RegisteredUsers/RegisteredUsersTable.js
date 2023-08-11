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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { UserInformationProfile } from "../UserInformationProfile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const userController = new User();

export function RegisteredUsersTable() {
  const handleEdit = () => {
    setIsDialogOpen(true); // Abre el diálogo cuando se hace clic en "Editar"
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const columns = [
    { id: "name", label: "Nombre", minWidth: 170 },
    { id: "lastName", label: "Apellido", minWidth: 170 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "role",
      label: "Rol",
      minWidth: 170,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
    },
    {
      id: "actions",
      label: "Acciones",
      minWidth: 170,
      align: "center",
      format: (value, row) => (
        <div>
          <IconButton onClick={() => handleEdit(row)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const { accessToken } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
              {columns.map((column) => (
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
                      {columns.map((column) => {
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
        </Table>
      </TableContainer>
      {/* Diálogo para mostrar UserInformationProfile */}
      <Dialog open={isDialogOpen} onClose={handleCancel}>
        <DialogContent>
         
        <IconButton onClick={() => handleCancel()} >
            <CloseIcon />
          </IconButton>
          <UserInformationProfile />
          
        </DialogContent>
      </Dialog>
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
