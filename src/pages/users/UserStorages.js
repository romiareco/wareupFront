import { UserStorageTable } from "../../components/Storages/UserStorageTable";

export function UserStorages() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ flex: 1 }}>
          Mis depositos
        </h2> 
      </div>
      <UserStorageTable />
  </div>
  );
}
