import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export const columns = (handleEdit, handleDelete) => [
  { id: "businessName", label: "Razón social"},
  { id: "RUT", label: "RUT" },
  {
    id: "contactName",
    label: "Nombre completo",
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
  },
  {
    id: "phone",
    label: "Celular/Teléfono",
  },
  {
    id: "status",
    label: "Status"
  },
  {
    id: "actions",
    label: "Acciones",
    align: "center",
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
