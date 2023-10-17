import * as React from "react";
import { columns } from "./CompaniesTableColumns";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { useState, useEffect } from "react";
import { RemoveCompanyDialog } from "../../Dialogs/RemoveCompanyDialog";
import {
  mapCompanyInformation,
  mapCompanyStatus,
} from "../../../utils/mapFunctions";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import { EditCompanyDialog } from "../../Dialogs";
import {
  Box,
  CircularProgress,
  Typography,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";
import { SortColumnData } from "../Utils";

const userController = new User();

export function UserCompaniesTable() {
  const { accessToken, user } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [companies, setCompanies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEditCompany, setSelectedEditCompany] = useState(null);
  const [selectedDeleteCompany, setSelectedDeleteCompany] = useState(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleEdit = (row) => {
    setSelectedEditCompany(row);
    setSelectedDeleteCompany(null);
    setIsEditDialogOpen(true);
    setIsRemoveDialogOpen(false);
  };

  const handleDelete = (row) => {
    setSelectedDeleteCompany(row);
    setSelectedEditCompany(null);
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
        const response = await userController.getUserCompanies(
          accessToken,
          user.id
        );

        if (response.companies) {
          setCompanies(mapCompanyInformation(response.companies));
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [accessToken, user.id]);

  const sortedData = companies ? SortColumnData(companies, orderBy, order) : [];

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: "90%",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop={3}
            marginBottom={3}
          >
            <CircularProgress />
          </Box>
        ) : companies.length === 0 ? (
          <Typography variant="body1">
            No se han registrado empresas.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table stickyHeader style={{ backgroundColor: "transparent" }}>
              <TableHead>
                <TableRow>
                  {columns(handleEdit, handleDelete).map((column) => (
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
                        tabIndex={-1}
                        key={row.id}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "lighred" : "white",
                        }}
                      >
                        {columns(handleEdit, handleDelete).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align="center">
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
                  })}
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
        )}

        {companies && companies.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={companies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Empresas por página:"
          />
        )}
      </Paper>
    </ThemeProvider>
  );
}
