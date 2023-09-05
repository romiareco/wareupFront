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
import {
  RemoveUserDepositDialog,
  AddDepositImageDialog,
  EditDepositBasicDataDialog
} from "../../Dialogs";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme/theme";
import {
  mapDepositInformation,
  mapDepositStatus,
} from "../../../utils/mapFunctions";

const depositController = new Deposit();

export function RegisteredDepositsTable() {
  const { accessToken, user } = useAuth();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deposits, setDeposits] = useState(null);

  const [selectedEditDeposit, setSelectedEditDeposit] = useState(null);
  const [selectedDeleteDeposit, setSelectedDeleteDeposit] = useState(null);
  const [selectedAddImageDeposit, setSelectedAddImageDeposit] = useState(null);
  const [selectedDepositPreview, setSelectedDepositPreview] = useState(null);

  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddImageDialogOpen, setIsAddImageDialogOpen] = useState(false);
  const [isDepositPreviewDialogOpen, setIsDepositPreviewDialogOpen] =
    useState(false);

  const handlePreview = (row) => {
    setSelectedEditDeposit(null);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(null);
    setSelectedDepositPreview(row);

    setIsEditDialogOpen(false);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(false);
    setIsDepositPreviewDialogOpen(true);

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
    setSelectedEditDeposit(null);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(row);
    setSelectedDepositPreview(null);

    setIsEditDialogOpen(false);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(true);
    setIsDepositPreviewDialogOpen(false);
  };

  const handleEdit = (row) => {
    setSelectedEditDeposit(row);
    setSelectedDeleteDeposit(null);
    setSelectedAddImageDeposit(null);
    setSelectedDepositPreview(null);

    setIsEditDialogOpen(true);
    setIsRemoveDialogOpen(false);
    setIsAddImageDialogOpen(false);
    setIsDepositPreviewDialogOpen(false);
  };

  const handleDelete = (row) => {
    setSelectedEditDeposit(null);
    setSelectedDeleteDeposit(row);
    setSelectedAddImageDeposit(null);
    setSelectedDepositPreview(null);

    setIsEditDialogOpen(false);
    setIsRemoveDialogOpen(true);
    setIsAddImageDialogOpen(false);
    setIsDepositPreviewDialogOpen(false);
  };

  const handleEditDialogOpenChange = (isOpen) => {
    setIsEditDialogOpen(isOpen);
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
        const response = await depositController.getAllDeposits(
          accessToken
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
                  handleEdit,
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
                          handleEdit,
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
              selectedDeposit={selectedEditDeposit}
              openDialog={isEditDialogOpen}
              onDialogOpenChange={handleEditDialogOpenChange}
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