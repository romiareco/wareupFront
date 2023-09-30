import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import AlarmAddRoundedIcon from "@mui/icons-material/AlarmAddRounded";

export function DepositActionsMenu({
  row,
  handleEditBasicData,
  handleEditServices,
  handleEditAvailability,
  handleViewAvailability,
  handleDelete,
  handleImage,
  handlePreview,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    (async () => {
      setSelectedRow(row);
    })();
  }, [row]);

  return (
    <div>
      <IconButton
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            handleEditBasicData(selectedRow);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Editar información básica
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleEditServices(selectedRow);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Editar servicios
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleViewAvailability(selectedRow);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <AccessAlarmRoundedIcon fontSize="small" />
          </ListItemIcon>
          Ver configuración de disponibilidad
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleEditAvailability(selectedRow);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <AlarmAddRoundedIcon fontSize="small" />
          </ListItemIcon>
          Agregar disponibilidad
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(selectedRow);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Eliminar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleImage(selectedRow);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <AddPhotoAlternateRoundedIcon fontSize="small" />
          </ListItemIcon>
          Agregar imagen
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePreview(selectedRow);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <PreviewRoundedIcon fontSize="small" />
          </ListItemIcon>
          Vista previa
        </MenuItem>
      </Menu>
    </div>
  );
}
