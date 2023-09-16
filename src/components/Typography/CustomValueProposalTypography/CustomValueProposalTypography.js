import Typography from "@mui/material/Typography";

import theme from "../../../theme/theme";

export function CustomValueProposalTypography({ variant, text }) {
  return (
    <Typography variant={variant} sx={{...theme.typography.montserratFont, color: "white" }}>
      {text}
    </Typography>
  );
}
