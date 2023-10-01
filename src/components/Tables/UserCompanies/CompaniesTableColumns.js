import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export const columns = (handleEdit, handleDelete) => [
  {id: "id", label: "ID"},
  { id: "businessName", label: "Razón social", minWidth: 200},
  { id: "RUT", label: "RUT" },
  {
    id: "contactName",
    label: "Nombre completo",
    minWidth: 200,
  },
  {
    id: "position",
    label: "Cargo",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "address",
    label: "Dirección de facturación",
    minWidth: 250,
  },
  {
    id: "phone",
    label: "Celular/Teléfono",
  },
  {
    id: "createdAt",
    label: "Fecha creación",
    minWidth: 150
  },
  {
    id: "status",
    label: "Status"
  },
  {
    id: "actions",
    label: "Acciones",
    align: "center",
    minWidth: 150,

    format: (value, row) => (
      <div>
        <IconButton onClick={() => handleEdit(row)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];
