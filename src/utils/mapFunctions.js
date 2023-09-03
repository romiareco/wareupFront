import { depositRequestStatus, depositStatus, userStatus, role } from "./enums";

export function mapDepositRequestStatus(statusNumber) {
  const status = parseInt(statusNumber);
  switch (status) {
    case depositRequestStatus.PENDING:
      return "Pendiente";
    case depositRequestStatus.COMPLETED:
      return "Completado";
    case depositRequestStatus.CANCELED:
      return "Rechazado";
    default:
      return "Desconocido";
  }
}

export function mapDepositStatus(statusNumber) {
  const status = parseInt(statusNumber);
  switch (status) {
    case depositStatus.ACTIVE:
      return "Activo";
    case depositStatus.DELETED:
      return "Eliminado";
    case depositStatus.PAUSED:
      return "Pausado";
    case depositStatus.PENDING:
      return "Pendiente";
    default:
      return "Desconocido";
  }
}

export function mapUserStatus(statusNumber) {
  const status = parseInt(statusNumber);
  switch (status) {
    case userStatus.ACTIVE:
      return "Activo";
    case userStatus.BLOCKED:
      return "Bloqueado";
    case userStatus.DELETED:
      return "Eliminado";
    case userStatus.PENDING:
      return "Pendiente";
    default:
      return "Desconocido";
  }
}

export function mapUserRole(statusNumber) {
  const status = parseInt(statusNumber);
  switch (status) {
    case role.ADMIN:
      return "Admin";
    case role.CLIENT:
      return "Cliente";
    default:
      return "Desconocido";
  }
}

export function mapBase64ToImage(base64String) {
  return `data:image/png;base64,${base64String}`;
}
