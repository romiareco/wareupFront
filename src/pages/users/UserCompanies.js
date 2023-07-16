import { UserCompaniesTable } from "../../components";
import { RegisterCompany } from "../../components/Buttons";

export function UserCompanies() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ flex: 1 }}>
          Mis empresas
        </h2>
        <div>
          <RegisterCompany />
        </div>
      </div>
      <UserCompaniesTable />
    </div>
  );
}
