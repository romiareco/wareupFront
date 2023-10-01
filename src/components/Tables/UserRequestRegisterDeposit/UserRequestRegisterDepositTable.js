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
import { SortColumnData } from "../Utils";
import { Box, CircularProgress, Typography } from "@mui/material";

const controller = new DepositRequest();

export function UserRequestRegisterDepositTable() {
  const { accessToken, user } = useAuth();
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [requestDeposits, setRequestDeposits] = useState(null);
  const [selectedRequestDeposit, setSelectedRequestDeposit] = useState(null);
  const [isChangeStatusDialogOpen, setIsChangeStatusDialogOpen] =
    useState(false);
  const [loading, setLoading] = useState(true);

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
        setLoading(true);
        const response = await controller.getDepositsRequestsByUserId(
          accessToken,
          user.id
        );

        if (response.depositRequests) {
          const filteredInformation = mapDepositRequestInformation(
            response.depositRequests
          );
          setRequestDeposits(filteredInformation);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [accessToken, user.id]);

  const sortedData = requestDeposits
    ? SortColumnData(requestDeposits, orderBy, order)
    : [];

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
        ) : requestDeposits.length === 0 ? (
          <Typography sx={theme.typography.montserratFont} variant="body1">
            No se han registrado empresas.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
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
                        tabIndex={-1}
                        key={row.id}
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
        )}
      </Paper>
      {requestDeposits && requestDeposits.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={requestDeposits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Solicitudes de depósito por página:"
        />
      )}
    </ThemeProvider>
  );
}
