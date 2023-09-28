import { IconButton } from "@mui/material";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";

export const columns = (handlePreview) => [
  { id: "depositId", label: "Depósito" },
  {
    id: "publicationLink",
    label: "Ver depósito",
    format: (value, row) => (
      <div>
        <IconButton onClick={() => handlePreview(row)}>
          <PreviewRoundedIcon />
        </IconButton>
      </div>
    ),
  },
  { id: "dateFrom", label: "Desde" },
  {
    id: "dateTo",
    label: "Hasta",
  },
  {
    id: "totalM3",
    label: "m³",
  },
  {
    id: "createdAt",
    label: "Fecha de creación",
  },
  {
    id: "status",
    label: "Status",
  },
];
