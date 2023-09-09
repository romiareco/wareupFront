import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import { DepositActionsMenu } from "../../Menus";

export const columns = (handleEdit, handleDelete, handleImage, handlePreview) => [
  { id: "id", label: "ID", minWidth: 25 },
  { id: "title", label: "Título", minWidth: 100 },
  { id: "description", label: "Descripción", minWidth: 170 },
  {
    id: "totalM3",
    label: "Total m3",
    minWidth: 75,
  },
  {
    id: "currency",
    label: "Moneda",
    minWidth: 40,
  },
  {
    id: "expectedPrice",
    label: "Precio",
    minWidth: 50,
  },
  {
    id: "street",
    label: "Dirección",
    minWidth: 100,
  },
  {
    id: "postalCode",
    label: "Código postal",
    minWidth: 50,
  },
  {
    id: "businessName",
    label: "Empresa",
    minWidth: 50,
  },
  {
    id: "cityName",
    label: "Barrio/Ciudad",
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
    minWidth: 50,
    align: "center",
    format: (value, row) => (
     <DepositActionsMenu row={row} handleEdit={handleEdit} handleDelete={handleDelete} handleImage={handleImage} handlePreview={handlePreview}/>
    ),
  },
];
