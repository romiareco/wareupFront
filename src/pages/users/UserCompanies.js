import { UserCompaniesTable } from "../../components";
import { Button } from "@mui/material";

export function UserCompanies() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ flex: 1 }}>
          Estoy en la página de gestionar mis propias empresas
        </h2>
        <div>
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
        </div>
      </div>
      <UserCompaniesTable />
    </div>
  );
}
