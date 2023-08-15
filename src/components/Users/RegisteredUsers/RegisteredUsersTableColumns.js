import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export const columns = (handleEdit, handleDelete) => [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "name", label: "Nombre", minWidth: 170 },
    { id: "lastName", label: "Apellido", minWidth: 170 },
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