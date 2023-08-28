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

  export function mapDepositRequestInformation(depositRequests) {
    const filteredInformation = depositRequests.map((deposit) => {
      return {
        id: deposit.id,
        title: deposit.title,
        description: deposit.description,
        email: deposit.email,
        phone: deposit.phone,
        cityId: deposit.cityId,
        address: deposit.address,
        status: deposit.status,
        businessName: deposit.company ? deposit.company.businessName : null,
      };
    });
  
    return filteredInformation;
  }

  export function mapDepositInformation(deposits) {
    const filteredInformation = deposits.map((deposit) => {
      return {
        id: deposit.id,
        title: deposit.title,
        description: deposit.description,
        totalM3: deposit.totalM3,
        currency: deposit.currency,
        expectedPrice: deposit.expectedPrice,
        street: deposit.street,
        cityId: deposit.cityId,
        status: deposit.status,
        businessName: deposit.company ? deposit.company.businessName : null,
      };
    });
  
    return filteredInformation;
  }