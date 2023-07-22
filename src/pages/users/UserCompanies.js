import { UserCompaniesTable } from "../../components";
import { RegisterCompanyBttn } from "../../components/Buttons";

export function UserCompanies() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ flex: 1 }}>
          Mis empresas
        </h2>
        <div>
          <RegisterCompanyBttn />
        </div>
      </div>
      <UserCompaniesTable />
    </div>
  );
}
