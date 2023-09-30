import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { columns } from "./CompaniesTableColumns";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { useState, useEffect } from "react";
import { RemoveCompanyDialog } from "../../Dialogs/RemoveCompanyDialog";
import { mapCompanyStatus } from "../../../utils/mapFunctions";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import { EditCompanyDialog } from "../../Dialogs";

const userController = new User();

export function UserCompaniesTable() {
  const { accessToken, user } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [companies, setCompanies] = useState(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEditCompany, setSelectedEditCompany] = useState(null);
  const [selectedDeleteCompany, setSelectedDeleteCompany] = useState(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const handleEdit = (row) => {
    setSelectedEditCompany(row);
    setSelectedDeleteCompany(null); // Cerrar el diálogo de eliminación si está abierto
    setIsEditDialogOpen(true);
    setIsRemoveDialogOpen(false);
  };

  const handleDelete = (row) => {
    setSelectedDeleteCompany(row);
    setSelectedEditCompany(null); // Cerrar el diálogo de edición si está abierto
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
        const response = await userController.getUserCompanies(
          accessToken,
          user.id
        );
        setCompanies(response.companies);
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
                {columns(handleEdit, handleDelete).map((column) => (
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
              {companies && companies.length > 0 ? (
                companies
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
                        {columns(handleEdit, handleDelete).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align="center" // Centra el contenido de las filas
                            >
                              {column.format
                                ? column.format(value, row)
                                : column.id === "status"
                                ? mapCompanyStatus(value)
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
                    {companies === null
                      ? "Cargando datos..."
                      : "No se han registrado empresas."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <EditCompanyDialog
              selectedCompany={selectedEditCompany}
              openDialog={isEditDialogOpen}
              onDialogOpenChange={handleEditDialogOpenChange}
            />
            <RemoveCompanyDialog
              selectedCompany={selectedDeleteCompany}
              openDialog={isRemoveDialogOpen}
              onDialogOpenChange={handleRemoveDialogOpenChange}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={companies === null ? 0 : companies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Empresas por página:"
        />
      </Paper>
    </ThemeProvider>
  );
}
