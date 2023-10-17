import * as React from "react";
import Box from "@mui/material/Box";
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
import { columns } from "./UserDepositsTableColumns";
import {
  EditDepositBasicDataDialog,
  RemoveUserDepositDialog,
  AddDepositImageDialog,
  EditDepositServicesDialog,
  AddDepositAvailabilityDialog,
  ViewDepositCalendarAvailabilityDialog,
} from "../../Dialogs";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import {
  mapDepositInformation,
  mapDepositStatus,
} from "../../../utils/mapFunctions";
import { CircularProgress, Paper, Typography } from "@mui/material";
import { SortColumnData } from "../Utils";

const depositController = new Deposit();

export function UserDepositsTable() {
  const { accessToken, user } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [deposits, setDeposits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEditBasicDataDeposit, setSelectedEditBasicDataDeposit] =
    useState(null);
  const [selectedEditServicesDeposit, setSelectedEditServicesDeposit] =
    useState(null);

  const [selectedDeleteDeposit, setSelectedDeleteDeposit] = useState(null);
  const [selectedAddImageDeposit, setSelectedAddImageDeposit] = useState(null);

  const [selectedAddAvailabilityDeposit, setSelectedAddAvailabilityDeposit] =
    useState(null);
  const [selectedViewAvailability, setSelectedViewAvailability] =
    useState(null);

  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isEditBasicDataDialogOpen, setIsEditBasicDataDialogOpen] =
    useState(false);
  const [isEditServicesDialogOpen, setIsEditServicesDialogOpen] =
    useState(false);
  const [isAddImageDialogOpen, setIsAddImageDialogOpen] = useState(false);

  const [isAddAvailabilityDialogOpen, setIsAddAvailabilityDialogOpen] =
    useState(false);
  const [isViewAvailabilityDialogOpen, setIsViewAvailabilityDialogOpen] =
    useState(false);

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handlePreview = (row) => {
    setSelectedEditBasicDataDeposit(null);
    setSelectedEditServicesDeposit(null);
    setSelectedAddAvailabilityDeposit(null);
    setSelectedViewAvailability(null);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(null);

    setIsEditBasicDataDialogOpen(false);
    setIsEditServicesDialogOpen(false);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(false);
    setIsAddAvailabilityDialogOpen(false);
    setIsViewAvailabilityDialogOpen(false);

    const queryParams = {
      id: row.id,
    };

    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
      .join("&");

    const url = `publication-view?${queryString}`;

    window.open(url, "_blank");
  };

  const handleImage = (row) => {
    setSelectedEditBasicDataDeposit(null);
    setSelectedEditServicesDeposit(null);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(row);
    setSelectedAddAvailabilityDeposit(null);
    setSelectedViewAvailability(null);

    setIsEditBasicDataDialogOpen(false);
    setIsEditServicesDialogOpen(false);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(true);
    setIsAddAvailabilityDialogOpen(false);
    setIsViewAvailabilityDialogOpen(false);
  };

  const handleEditBasicData = (row) => {
    setSelectedEditBasicDataDeposit(row);
    setSelectedEditServicesDeposit(null);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(null);
    setSelectedAddAvailabilityDeposit(null);
    setSelectedViewAvailability(null);

    setIsEditBasicDataDialogOpen(true);
    setIsEditServicesDialogOpen(false);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(false);
    setIsAddAvailabilityDialogOpen(false);
    setIsViewAvailabilityDialogOpen(false);
  };

  const handleEditServices = (row) => {
    setSelectedEditBasicDataDeposit(null);
    setSelectedEditServicesDeposit(row);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(null);
    setSelectedAddAvailabilityDeposit(null);
    setSelectedViewAvailability(null);

    setIsEditBasicDataDialogOpen(false);
    setIsEditServicesDialogOpen(true);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(false);
    setIsAddAvailabilityDialogOpen(false);
    setIsViewAvailabilityDialogOpen(false);
  };

  const handleAddAvailability = (row) => {
    setSelectedEditBasicDataDeposit(null);
    setSelectedEditServicesDeposit(null);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(null);
    setSelectedAddAvailabilityDeposit(row);
    setSelectedViewAvailability(null);

    setIsEditBasicDataDialogOpen(false);
    setIsEditServicesDialogOpen(false);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(false);
    setIsAddAvailabilityDialogOpen(true);
    setIsViewAvailabilityDialogOpen(false);
  };

  const handleViewAvailability = (row) => {
    setSelectedEditBasicDataDeposit(null);
    setSelectedEditServicesDeposit(null);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(null);
    setSelectedAddAvailabilityDeposit(null);
    setSelectedViewAvailability(row);

    setIsEditBasicDataDialogOpen(false);
    setIsEditServicesDialogOpen(false);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(false);
    setIsAddAvailabilityDialogOpen(false);
    setIsViewAvailabilityDialogOpen(true);
  };

  const handleDelete = (row) => {
    setSelectedEditBasicDataDeposit(null);
    setSelectedEditServicesDeposit(null);
    setSelectedDeleteDeposit(row);
    setSelectedAddImageDeposit(null);
    setSelectedAddAvailabilityDeposit(null);
    setSelectedViewAvailability(null);

    setIsEditBasicDataDialogOpen(false);
    setIsEditServicesDialogOpen(false);
    setIsRemoveDialogOpen(true);
    setIsAddImageDialogOpen(false);
    setIsAddAvailabilityDialogOpen(false);
    setIsViewAvailabilityDialogOpen(false);
  };

  const handleEditBasicDataDialogOpenChange = (isOpen) => {
    setIsEditBasicDataDialogOpen(isOpen);
  };

  const handleEditServicesDialogOpenChange = (isOpen) => {
    setIsEditServicesDialogOpen(isOpen);
  };

  const handleAddAvailabilityDialogOpenChange = (isOpen) => {
    setIsAddAvailabilityDialogOpen(isOpen);
  };

  const handleViewAvailabilityDialogOpenChange = (isOpen) => {
    setIsViewAvailabilityDialogOpen(isOpen);
  };

  const handleRemoveDialogOpenChange = (isOpen) => {
    setIsRemoveDialogOpen(isOpen);
  };

  const handleAddImageDialogOpenChange = (isOpen) => {
    setIsAddImageDialogOpen(isOpen);
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
        const response = await depositController.getDepositsByUserId(
          accessToken,
          user.id
        );

        if (response.deposits) {
          const filteredInformation = mapDepositInformation(response.deposits);

          setDeposits(filteredInformation);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [accessToken, user.id]);

  const sortedData = deposits ? SortColumnData(deposits, orderBy, order) : [];

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
        ) : deposits.length === 0 ? (
          <Typography variant="body1">
            No se han registrado depósitos para este usuario.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table stickyHeader style={{ backgroundColor: "transparent" }}>
              <TableHead>
                <TableRow>
                  {columns(
                    handleEditBasicData,
                    handleEditServices,
                    handleAddAvailability,
                    handleViewAvailability,
                    handleDelete,
                    handleImage,
                    handlePreview
                  ).map((column) => (
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
                      <TableRow hover tabIndex={-1} key={row.id}>
                        {columns(
                          handleEditBasicData,
                          handleEditServices,
                          handleAddAvailability,
                          handleViewAvailability,
                          handleDelete,
                          handleImage,
                          handlePreview
                        ).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align="center">
                              {column.format
                                ? column.format(value, row)
                                : column.id === "status"
                                ? mapDepositStatus(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
              <EditDepositBasicDataDialog
                selectedDeposit={selectedEditBasicDataDeposit}
                openDialog={isEditBasicDataDialogOpen}
                onDialogOpenChange={handleEditBasicDataDialogOpenChange}
              />
              <RemoveUserDepositDialog
                selectedDeposit={selectedDeleteDeposit}
                openDialog={isRemoveDialogOpen}
                onDialogOpenChange={handleRemoveDialogOpenChange}
              />
              <AddDepositImageDialog
                selectedDeposit={selectedAddImageDeposit}
                openDialog={isAddImageDialogOpen}
                onDialogOpenChange={handleAddImageDialogOpenChange}
              />
              <EditDepositServicesDialog
                selectedDeposit={selectedEditServicesDeposit}
                openDialog={isEditServicesDialogOpen}
                onDialogOpenChange={handleEditServicesDialogOpenChange}
              />
              <AddDepositAvailabilityDialog
                selectedDeposit={selectedAddAvailabilityDeposit}
                openDialog={isAddAvailabilityDialogOpen}
                onDialogOpenChange={handleAddAvailabilityDialogOpenChange}
              />
              <ViewDepositCalendarAvailabilityDialog
                selectedDeposit={selectedViewAvailability}
                openDialog={isViewAvailabilityDialogOpen}
                onDialogOpenChange={handleViewAvailabilityDialogOpenChange}
              />
            </Table>
          </TableContainer>
        )}
        {deposits && deposits.length > 0 && (
          <TablePagination
            component={"div"}
            rowsPerPageOptions={[5, 10, 15]}
            count={deposits === null ? 0 : deposits.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Depósitos por página:"
          />
        )}
      </Paper>
    </ThemeProvider>
  );
}
