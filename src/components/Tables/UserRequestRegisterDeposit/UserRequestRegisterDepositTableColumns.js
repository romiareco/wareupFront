import IconButton from "@mui/material/IconButton";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
export const columns = (handleReject) => [
  { id: "id", label: "ID", minWidth: 25 },
  { id: "title", label: "Título", minWidth: 100 },
  { id: "description", label: "Descripción", minWidth: 170 },
  {
    id: "email",
    label: "Email",
    minWidth: 75,
  },
  {
    id: "phone",
    label: "Teléfono",
    minWidth: 40,
  },
  {
    id: "businessName",
    label: "Empresa",
    minWidth: 50,
  },
  {
    id: "cityId",
    label: "Barrio/Ciudad",
    minWidth: 100,
  },
  {
    id: "address",
    label: "Dirección",
    minWidth: 100,
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
      <IconButton
        onClick={() => handleReject(row)}
      >
        <CancelRoundedIcon />
      </IconButton>
    </div>
    ),
  },
];

//TODO: mover estos botones a otro componente asi le ponemos el Popover