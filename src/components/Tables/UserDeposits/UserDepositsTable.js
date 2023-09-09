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
import { columns } from "./UserDepositsTableColumns";
import {
  EditDepositBasicDataDialog,
  RemoveUserDepositDialog,
  AddDepositImageDialog,
  EditDepositServicesDialog,
} from "../../Dialogs";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import {
  mapDepositInformation,
  mapDepositStatus,
} from "../../../utils/mapFunctions";
import {EditDepositAvailabilityDialog} from "../../Dialogs/EditDepositAvailabilityDialog/EditDepositAvailabilityDialog";

const depositController = new Deposit();

export function UserDepositsTable() {
  const { accessToken, user } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deposits, setDeposits] = useState(null);

  const [selectedEditBasicDataDeposit, setSelectedEditBasicDataDeposit] =
    useState(null);
  const [selectedEditServicesDeposit, setSelectedEditServicesDeposit] =
    useState(null);
  const [selectedEditAvailabilityDeposit, setSelectedEditAvailabilityDeposit] =
    useState(null);

  const [selectedDeleteDeposit, setSelectedDeleteDeposit] = useState(null);
  const [selectedAddImageDeposit, setSelectedAddImageDeposit] = useState(null);

  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isEditBasicDataDialogOpen, setIsEditBasicDataDialogOpen] =
    useState(false);
  const [isEditAvailabilityDialogOpen, setIsEditAvailabilityDialogOpen] =
    useState(false);
  const [isEditServicesDialogOpen, setIsEditServicesDialogOpen] =
    useState(false);
  const [isAddImageDialogOpen, setIsAddImageDialogOpen] = useState(false);

  const handlePreview = (row) => {
    setSelectedEditBasicDataDeposit(null);
    setSelectedEditServicesDeposit(null);
    setSelectedEditAvailabilityDeposit(null);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(null);

    setIsEditBasicDataDialogOpen(false);
    setIsEditServicesDialogOpen(false);
    setIsEditAvailabilityDialogOpen(false);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(false);

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
    setSelectedEditAvailabilityDeposit(null);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(row);

    setIsEditBasicDataDialogOpen(false);
    setIsEditServicesDialogOpen(false);
    setIsEditAvailabilityDialogOpen(false);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(true);
  };

  const handleEditBasicData = (row) => {
    setSelectedEditBasicDataDeposit(row);
    setSelectedEditServicesDeposit(null);
    setSelectedEditAvailabilityDeposit(null);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(null);

    setIsEditBasicDataDialogOpen(true);
    setIsEditServicesDialogOpen(false);
    setIsEditAvailabilityDialogOpen(false);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(false);
  };

  const handleEditServices = (row) => {
    setSelectedEditBasicDataDeposit(null);
    setSelectedEditServicesDeposit(row);
    setSelectedEditAvailabilityDeposit(null);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(null);

    setIsEditBasicDataDialogOpen(false);
    setIsEditServicesDialogOpen(true);
    setIsEditAvailabilityDialogOpen(false);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(false);
  };

  const handleEditAvailability = (row) => {
    setSelectedEditBasicDataDeposit(null);
    setSelectedEditServicesDeposit(null);
    setSelectedEditAvailabilityDeposit(row);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(null);

    setIsEditBasicDataDialogOpen(false);
    setIsEditServicesDialogOpen(false);
    setIsEditAvailabilityDialogOpen(true);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(false);
  };

  const handleDelete = (row) => {
    setSelectedEditBasicDataDeposit(null);
    setSelectedEditServicesDeposit(null);
    setSelectedEditAvailabilityDeposit(null);
    setSelectedDeleteDeposit(row);
    setSelectedAddImageDeposit(null);

    setIsEditBasicDataDialogOpen(false);
    setIsEditServicesDialogOpen(false);
    setIsEditAvailabilityDialogOpen(false);
    setIsRemoveDialogOpen(true);
    setIsAddImageDialogOpen(false);
  };

  const handleEditBasicDataDialogOpenChange = (isOpen) => {
    setIsEditBasicDataDialogOpen(isOpen);
  };

  const handleEditServicesDialogOpenChange = (isOpen) => {
    setIsEditServicesDialogOpen(isOpen);
  };

  const handleEditAvailabilityDialogOpenChange = (isOpen) => {
    setIsEditAvailabilityDialogOpen(isOpen);
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
        const response = await depositController.getDepositsByUserId(
          accessToken,
          user.id
        );

        if (response.deposits) {
          const filteredInformation = mapDepositInformation(response.deposits);

          setDeposits(filteredInformation);
        }
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
        <TableContainer>
          <Table stickyHeader style={{ backgroundColor: "transparent" }}>
            <TableHead>
              <TableRow>
                {columns(
                  handleEditBasicData,
                  handleEditServices,
                  handleEditAvailability,
                  handleDelete,
                  handleImage,
                  handlePreview
                ).map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
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
                          backgroundColor:
                            index % 2 === 0 ? "lightgray" : "white",
                        }}
                      >
                        {columns(
                          handleEditBasicData,
                          handleEditServices,
                          handleEditAvailability,
                          handleDelete,
                          handleImage,
                          handlePreview
                        ).map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
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
            <EditDepositAvailabilityDialog
              selectedDeposit={selectedEditAvailabilityDeposit}
              openDialog={isEditAvailabilityDialogOpen}
              onDialogOpenChange={handleEditAvailabilityDialogOpenChange}
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

//TODO: eliminar estados innecesarios para la preview de la publicacion
