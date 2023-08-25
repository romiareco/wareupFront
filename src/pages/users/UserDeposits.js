import { UserDepositsTable } from "../../components/Tables/DepositUsers";

export function UserDeposits() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ flex: 1 }}>
          Mis depositos
        </h2> 
      </div>
      <UserDepositsTable />
  </div>
  );
}
