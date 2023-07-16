import { Button } from "@mui/material";

export function RegisterCompany() {
    return (
        <Button
            href="/users/my-companies/register"
            variant="outlined"
            color="primary"
            sx={{
              color: "#ffffff",
              borderColor: "#ffffff",
              backgroundColor: "#007bff",
              ml: 1,
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Registrar nueva empresa
          </Button>
    )
}