import Typography from "@mui/material/Typography";

export function CustomValueProposalTypography({ variant, text }) {
  return (
    <Typography variant={variant} sx={{ color: "white" }}>
      {text}
    </Typography>
  );
}
