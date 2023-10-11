import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export const columns = (handleEdit, handleDelete) => [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Nombre" },
  { id: "lastName", label: "Apellido"},
  {
    id: "email",
    label: "Email",
    minWidth: 170,
  },
  {
    id: "role",
    label: "Rol",
    minWidth: 50,
  },
  { id: "industry", label: "Industrias familiarizado", minWidth: 150 },
  { id: "createdAt", label: "Fecha creación", minWidth: 150 },
  {
    id: "status",
    label: "Status",
    minWidth: 50,
  },
  {
    id: "actions",
    label: "Acciones",
    minWidth: 100,
    align: "center",
    format: (value, row) => (
      <div>
        <IconButton onClick={() => handleEdit(row)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(row)} color="secondary">
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];
