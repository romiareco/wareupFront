import Typography from "@mui/material/Typography";

export function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {". "}
    </Typography>
  );
}
