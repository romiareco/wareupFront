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
import { User } from "../../api";
import { useAuth } from "../../hooks";
import { useState, useEffect } from "react";

function createData(
  businessName,
  RUT,
  contactName,
  position,
  email,
  address,
  phoneNumber
) {
  return {
    businessName,
    RUT,
    contactName,
    position,
    email,
    address,
    phoneNumber,
  };
}

const userController = new User();

export function UserCompaniesTable() {
  const { accessToken, user } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [companies, setCompanies] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("User en companies table: " + JSON.stringify(user));

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

  //TODO: cambiar el userId que le pasamos una vez confirmemos los props

  console.log("company rows: " + JSON.stringify(companies));

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
            {companies && companies.length > 0 ? (
              companies
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
                            {column.format && typeof value === "number"
                              ? column.format(value)
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
                    : "No se han registrado empresas para este usuario."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={companies === null ? 0 : companies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
